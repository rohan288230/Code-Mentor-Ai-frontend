const axios = require('axios');
const wrapperService = require('./wrapperService');

const PISTON_EXECUTE_URL = process.env.PISTON_URL || 'http://127.0.0.1:2000/api/v2/execute';

/** Frontend / API canonical keys → Piston `language` field (see /runtimes on emkc.org). */
const PISTON_LANGUAGE_MAP = {
  python: { language: 'python', version: '3.10.0' },
  java: { language: 'java', version: '15.0.2' },
  cpp: { language: 'c++', version: '10.2.0' },
  c: { language: 'c', version: '10.2.0' },
  javascript: { language: 'node', version: '18.15.0' }
};

class PistonService {
  /**
   * @param {string} langKey - one of python | java | cpp | c
   */
  static mapRuntime(langKey) {
    const key = String(langKey || '').toLowerCase();
    const mapped = PISTON_LANGUAGE_MAP[key];
    if (!mapped) {
      throw new Error(`Unsupported language: ${langKey}. Use python, java, cpp, or c.`);
    }
    return mapped;
  }

  /**
   * Execute on Piston public API.
   * @returns {{ success: boolean, output: string, error: string, executionTime: string, status: string, compileOutput?: string }}
   */
  static async execute(langKey, code, stdin = '') {
    const start = Date.now();
    const { language, version } = this.mapRuntime(langKey);

    if (!code || !String(code).trim()) {
      return {
        success: false,
        output: '',
        error: 'Empty code submission.',
        executionTime: '0ms',
        status: 'Invalid',
      };
    }

    let finalCode = code;
    try {
      if (langKey === 'java') finalCode = wrapperService.wrapJava(code);
      else if (langKey === 'cpp' || langKey === 'c++') finalCode = wrapperService.wrapCpp(code);
      else if (langKey === 'c') finalCode = wrapperService.wrapC(code);
      else if (langKey === 'python') finalCode = wrapperService.wrapPython(code);
    } catch (e) {
      console.error('Wrapper generation failed', e);
    }

    let retries = 3;
    while (retries > 0) {
      try {
        const { data } = await axios.post(
          PISTON_EXECUTE_URL,
          {
            language,
            version,
            files: [{ name: this._defaultFileName(language), content: finalCode }],
            stdin: stdin == null ? '' : String(stdin),
          },
          { timeout: parseInt(process.env.PISTON_TIMEOUT, 10) || 10000 }
        );

        const elapsed = `${Date.now() - start}ms`;

        if (data.compile && data.compile.code !== 0) {
          const compileMsg = [data.compile.stderr, data.compile.output]
            .filter(Boolean)
            .join('\n')
            .trim();
          return {
            success: false,
            output: '',
            error: compileMsg || 'Compilation failed.',
            executionTime: elapsed,
            status: 'Compile Error',
            compileOutput: compileMsg,
          };
        }

        if (data.run && data.run.signal === 'SIGKILL') {
          return {
            success: false,
            output: '',
            error: 'Time Limit Exceeded or Memory Limit Exceeded',
            executionTime: elapsed,
            status: 'Time Limit Exceeded',
          };
        }

        if (data.run && data.run.code !== 0) {
          const errText = [data.run.stderr, data.run.output]
            .filter(Boolean)
            .join('\n')
            .trim();
          return {
            success: false,
            output: (data.run.stdout || '').trim(),
            error: errText || 'Runtime error.',
            executionTime: elapsed,
            status: 'Runtime Error',
          };
        }

        const stdout = (data.run && data.run.stdout != null ? data.run.stdout : '').replace(/\r\n/g, '\n');
        return {
          success: true,
          output: stdout,
          error: '',
          executionTime: elapsed,
          status: 'Accepted',
        };
      } catch (error) {
        retries--;
        if (retries === 0 || error.code === 'ECONNABORTED' || (error.response && error.response.status !== 500 && error.response.status !== 503)) {
          if (error.code === 'ECONNABORTED') {
            return {
              success: false,
              output: '',
              error: 'Execution timed out waiting for local Piston API. The execution engine might be overloaded or Docker is slow.',
              executionTime: `${Date.now() - start}ms`,
              status: 'Time Limit Exceeded',
            };
          }
          if (error.response) {
            return {
              success: false,
              output: '',
              error: `Piston execution engine error (${error.response.status}): ${JSON.stringify(error.response.data)}`,
              executionTime: `${Date.now() - start}ms`,
              status: 'API Error',
            };
          }
          if (error.code === 'ECONNREFUSED') {
            return {
              success: false,
              output: '',
              error: 'Local Piston execution engine is offline (ECONNREFUSED). Please ensure the Docker container is running on port 2000.',
              executionTime: `${Date.now() - start}ms`,
              status: 'System Error',
            };
          }
          return {
            success: false,
            output: '',
            error: `Execution engine unavailable: ${error.message}`,
            executionTime: `${Date.now() - start}ms`,
            status: 'System Error',
          };
        }
        console.warn(`[PistonService] Retrying execution... (${retries} attempts left)`);
        await new Promise(res => setTimeout(res, 1000));
      }
    }
  }

  static _defaultFileName(pistonLanguage) {
    if (pistonLanguage === 'java') return 'Main.java';
    if (pistonLanguage === 'c++') return 'main.cpp';
    if (pistonLanguage === 'c') return 'main.c';
    if (pistonLanguage === 'javascript') return 'main.js';
    return 'main.py';
  }
}

module.exports = PistonService;
