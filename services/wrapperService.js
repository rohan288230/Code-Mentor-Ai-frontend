/**
 * wrapperService.js
 * Automatically wraps user functions in executable main() methods for strongly typed languages.
 * This relies on a Regex Heuristic since problem-specific signatures aren't stored in DB.
 */

function extractSignature(code) {
  // Matches typical Java/C++ method signatures: [modifiers] ReturnType funcName(Args)
  const regex = /(?:public\s+|private\s+|protected\s+|static\s+)*([\w<>[\]]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/i;
  const match = code.match(regex);
  if (!match) return null;
  if (match[2] === 'main') return null; // Already has main

  const args = match[3].split(',').map(s => {
    const parts = s.trim().split(/\s+/);
    return {
      type: parts.slice(0, -1).join(' '),
      name: parts[parts.length - 1]
    };
  }).filter(a => a.name);

  return {
    returnType: match[1],
    funcName: match[2],
    args
  };
}

function wrapJava(code) {
  if (code.includes('public static void main') || code.includes('class Main')) return code;
  
  const imports = [];
  const codeLines = [];
  code.split('\n').forEach(line => {
    if (line.trim().startsWith('import ')) {
      imports.push(line);
    } else {
      codeLines.push(line);
    }
  });
  const cleanCode = codeLines.join('\n');

  const sig = extractSignature(cleanCode);
  if (!sig) return code; // fallback

  let mainBody = `
public class Main {
    public static int[] parseIntArray(String s) {
        if(s == null || s.trim().isEmpty() || s.equals("[]")) return new int[0];
        s = s.replaceAll("\\\\[|\\\\]", "").trim();
        if(s.isEmpty()) return new int[0];
        String[] parts = s.split(",");
        int[] res = new int[parts.length];
        for(int i=0; i<parts.length; i++) res[i] = Integer.parseInt(parts[i].trim());
        return res;
    }
    public static void main(String[] args) throws Exception {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        Solution obj = new Solution();
`;

  const argNames = [];
  sig.args.forEach((arg, i) => {
    if (arg.type === 'int' || arg.type === 'Integer') {
      mainBody += `        int arg${i} = sc.hasNextInt() ? sc.nextInt() : 0;\n`;
    } else if (arg.type === 'int[]' || arg.type === 'Integer[]') {
      mainBody += `        int[] arg${i} = parseIntArray(sc.hasNext() ? sc.next() : "");\n`;
    } else if (arg.type === 'double' || arg.type === 'Double') {
      mainBody += `        double arg${i} = sc.hasNextDouble() ? sc.nextDouble() : 0.0;\n`;
    } else if (arg.type === 'String') {
      mainBody += `        String arg${i} = sc.hasNext() ? sc.next() : "";\n`;
    } else if (arg.type === 'boolean' || arg.type === 'Boolean') {
      mainBody += `        boolean arg${i} = sc.hasNextBoolean() ? sc.nextBoolean() : false;\n`;
    } else {
      mainBody += `        ${arg.type} arg${i} = null; // unsupported\n`;
    }
    argNames.push(`arg${i}`);
  });

  mainBody += `        Object res = obj.${sig.funcName}(${argNames.join(', ')});\n`;
  mainBody += `        if (res instanceof int[]) {\n`;
  mainBody += `            System.out.println(java.util.Arrays.toString((int[])res).replaceAll(" ", ""));\n`;
  mainBody += `        } else {\n`;
  mainBody += `            System.out.println(res);\n`;
  mainBody += `        }\n`;
  mainBody += `    }\n}\n`;

  return imports.join('\n') + '\n' + mainBody + '\n' + cleanCode;
}

function wrapCpp(code) {
  if (code.includes('int main') || code.includes('void main')) return code;

  let finalCode = code;
  if (!finalCode.includes('<iostream>')) finalCode = '#include <iostream>\n' + finalCode;
  if (!finalCode.includes('<vector>')) finalCode = '#include <vector>\n' + finalCode;
  if (!finalCode.includes('<string>')) finalCode = '#include <string>\n' + finalCode;

  const sig = extractSignature(finalCode);
  if (!sig) return code;

  let mainBody = `
#include <sstream>

std::vector<int> parseVectorInt() {
    std::vector<int> res;
    char c;
    while(std::cin >> c && c != '[') {
        if(std::cin.eof()) return res;
    }
    while(std::cin >> c && c != ']') {
        if (c == ',') continue;
        std::cin.putback(c);
        int val; std::cin >> val; res.push_back(val);
    }
    return res;
}

void printVectorInt(const std::vector<int>& v) {
    std::cout << "[";
    for(size_t i=0; i<v.size(); ++i) {
        std::cout << v[i] << (i < v.size()-1 ? "," : "");
    }
    std::cout << "]";
}

int main() {
    Solution obj;
`;
  
  const argNames = [];
  sig.args.forEach((arg, i) => {
    let safeType = arg.type.replace(/&/g, '').trim();
    if (!safeType) safeType = 'int';

    mainBody += `    ${safeType} arg${i};\n`;
    if (safeType.includes('vector<int>')) {
        mainBody += `    arg${i} = parseVectorInt();\n`;
    } else {
        mainBody += `    if (std::cin >> arg${i}) {}\n`;
    }
    argNames.push(`arg${i}`);
  });

  mainBody += `    auto res = obj.${sig.funcName}(${argNames.join(', ')});\n`;
  // Simple check for return type formatting
  if (sig.returnType.includes('vector<int>')) {
      mainBody += `    printVectorInt(res);\n`;
  } else {
      mainBody += `    std::cout << res;\n`;
  }
  mainBody += `    std::cout << std::endl;\n`;
  mainBody += `    return 0;\n}\n`;

  return finalCode + '\n' + mainBody;
}

function wrapC(code) {
  if (code.includes('int main') || code.includes('void main')) return code;
  
  const sig = extractSignature(code);
  if (!sig) return code;

  let mainBody = `
#include <stdio.h>
#include <stdlib.h>

int main() {
`;
  
  const argNames = [];
  sig.args.forEach((arg, i) => {
    let fmt = '"%d"';
    let safeType = arg.type.trim();
    if (safeType === 'float') fmt = '"%f"';
    if (safeType === 'double') fmt = '"%lf"';
    if (safeType === 'char') fmt = '"%c"';

    mainBody += `    ${safeType} arg${i};\n`;
    mainBody += `    scanf(${fmt}, &arg${i});\n`;
    argNames.push(`arg${i}`);
  });

  if (sig.returnType === 'int') {
     mainBody += `    printf("%d\\n", ${sig.funcName}(${argNames.join(', ')}));\n`;
  } else if (sig.returnType === 'float' || sig.returnType === 'double') {
     mainBody += `    printf("%f\\n", ${sig.funcName}(${argNames.join(', ')}));\n`;
  } else {
     mainBody += `    ${sig.funcName}(${argNames.join(', ')});\n`;
  }
  
  mainBody += `    return 0;\n}\n`;
  
  let finalCode = code;
  if (!finalCode.includes('<stdio.h>')) finalCode = '#include <stdio.h>\n' + finalCode;
  return finalCode + '\n' + mainBody;
}

function wrapPython(code) {
  if (code.includes('__main__') || !code.includes('class Solution')) return code;

  const match = code.match(/def\s+(\w+)\s*\(([^)]*)\)\s*:/);
  if (!match) return code;
  const funcName = match[1];
  const argsList = match[2].split(',').map(s => s.trim()).filter(Boolean);

  let mainBody = `
if __name__ == "__main__":
    import sys
    obj = Solution()
    inputs = sys.stdin.read().split()
    args = []
`;
  
  argsList.forEach((arg, i) => {
    if (arg === 'self') return;
    mainBody += `    if len(inputs) > len(args): args.append(inputs[len(args)])\n`;
  });
  
  mainBody += `    try:
        args = [int(a) if a.lstrip('-').isdigit() else a for a in args]
        res = obj.${funcName}(*args)
        if res is not None: print(res)
    except Exception as e:
        print("Error:", e)
`;
  return code + '\n' + mainBody;
}

module.exports = {
  wrapJava,
  wrapCpp,
  wrapC,
  wrapPython
};
