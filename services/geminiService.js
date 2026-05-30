const { GoogleGenerativeAI } = require("@google/generative-ai");

// class GeminiService {
//   static _getGeminiModel() {
//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error('AI service not configured. Missing GEMINI_API_KEY.');
//     }
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     return  genAI.getGenerativeModel({
//   model: 'gemini-1.5-flash'
// });
//   }

class GeminiService {

  static getModel() {

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    return genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });
  }

  

  static async _generateRawResponse(prompt, retries = 3) {
    const model = this.getModel();
    
    while (retries > 0) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.5,
          },
        });
        return result.response.text();
      } catch (error) {
        retries--;
        console.warn(`[GeminiService] Network or API error. Retries left: ${retries}. Error: ${error.message}`);
        if (retries === 0) {
          throw new Error(`Failed to connect to Gemini AI after multiple attempts. Network or DNS issue: ${error.message}`);
        }
        await new Promise(res => setTimeout(res, 1500));
      }
    }
  }

  static async explainCode(code, problemDescription, language) {
    const prompt = `You are Code Mentor AI, an expert programming instructor. 
A student is working on the following problem:
${problemDescription}

Here is their ${language} code:
${code}

Please provide a helpful, encouraging review of this code. 
1. Provide a step-by-step code explanation.
2. Explicitly detect any bugs or logic errors.
Keep it concise and format the output beautifully in Markdown.`;

    return this._generateRawResponse(prompt);
  }

  static async optimizeCode(code, problemDescription, language) {
    const prompt = `You are Code Mentor AI.
A student is working on: ${problemDescription}
Their ${language} code:
${code}

Suggest optimizations for better performance, memory usage, or readability. 
Provide a clear, brief explanation and a small code snippet showing the optimized approach. Format in Markdown.`;

    return this._generateRawResponse(prompt);
  }

  static async analyzeComplexity(code, problemDescription, language) {
    const prompt = `You are Code Mentor AI.
A student wrote this ${language} code for the problem: "${problemDescription}".
Code:
${code}

Provide the estimated Time Complexity and Space Complexity using Big-O notation. 
Explain briefly why it has that complexity. Format in Markdown.`;

    return this._generateRawResponse(prompt);
  }

  static async generateHint(code, problemDescription, language) {
    const prompt = `You are Code Mentor AI.
A student wrote this ${language} code for the problem: "${problemDescription}".
Code:
${code}

Provide a very short, guiding hint to help them improve or fix their code without giving away the full answer. Format in Markdown.`;

    return this._generateRawResponse(prompt);
  }
  static async generateResumeSummary(resumeData) {
    const prompt = `You are an expert tech recruiter. Given the following resume data, generate a professional, impactful 3-4 sentence summary. Do not include any intro/outro text, just the summary itself.
Resume Data: ${JSON.stringify(resumeData)}`;
    return this._generateRawResponse(prompt);
  }

  static async improveBulletPoints(bulletPoints, role) {
    const prompt = `You are an expert ATS optimizer. Improve the following resume bullet points for a ${role || 'Software Engineer'} role. 
Make them action-oriented, metric-driven (if applicable), and impactful. Return ONLY the improved bullet points separated by newlines, with no markdown bullet dashes or numbers at the start of each line.
Original bullets:
${bulletPoints.join('\n')}`;
    return this._generateRawResponse(prompt);
  }

  static async analyzeATS(resumeData, jobDescription, retries = 3) {
    const prompt = `You are an expert Applicant Tracking System (ATS). 
Analyze the following resume against this job description (if provided, else general software engineering standards).
Job Description: ${jobDescription || 'Standard Software Engineer Role'}
Resume: ${JSON.stringify(resumeData)}

Provide:
1. An overall ATS match score (out of 100).
2. Missing keywords or skills.
3. 3-4 actionable suggestions to improve the resume.

Format exactly as a JSON object: {"score": 85, "missingKeywords": ["Docker", "AWS"], "suggestions": ["Add more metrics"]}`;
    
    const model = this.getModel();
    while (retries > 0) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        });
        return JSON.parse(result.response.text());
      } catch (error) {
        retries--;
        console.warn(`[GeminiService ATS] Network or API error. Retries left: ${retries}. Error: ${error.message}`);
        if (retries === 0) {
          throw new Error(`Failed to connect to Gemini AI (ATS module). Network or DNS issue: ${error.message}`);
        }
        await new Promise(res => setTimeout(res, 1500));
      }
    }
  }

  static async evaluateMockInterview(question, answer, retries = 3) {
    const prompt = `You are a Senior Technical Interviewer.
You asked a candidate this question: "${question}"
The candidate answered: "${answer}"

Evaluate their answer. Provide:
1. A score out of 10.
2. Short, constructive feedback (what was good, what was missing).
3. The ideal concise answer.

Format exactly as a JSON object: {"score": 8, "feedback": "Good understanding, but missed X.", "idealAnswer": "..."}`;
    
    const model = this.getModel();
    while (retries > 0) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        });
        return JSON.parse(result.response.text());
      } catch (error) {
        retries--;
        console.warn(`[GeminiService Interview] Network or API error. Retries left: ${retries}. Error: ${error.message}`);
        if (retries === 0) {
          throw new Error(`Failed to connect to Gemini AI (Mock Interview). Network or DNS issue: ${error.message}`);
        }
        await new Promise(res => setTimeout(res, 1500));
      }
    }
  }
}

module.exports = GeminiService;
