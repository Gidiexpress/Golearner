import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface TraceStep {
  description: string;
  vars: Record<string, any>;
}

export interface SimulationResult {
  output: string;
  trace: TraceStep[];
}

export async function simulateGoCode(code: string, args: string[]): Promise<SimulationResult> {
  const prompt = `
    You are a Go language interpreter for kids (8-9 years old). 
    Execute the following Go code with these arguments: ${args.join(', ')}.
    
    Code:
    ${code}
    
    Explain what happens at each step in simple terms, like a robot performing commands.
    Include the values of variables at each step.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          output: { 
            type: Type.STRING,
            description: "The final result returned by the function or printed to stdout."
          },
          trace: {
            type: Type.ARRAY,
            description: "Step-by-step trace of the execution.",
            items: {
              type: Type.OBJECT,
              properties: {
                description: { 
                    type: Type.STRING,
                    description: "Simple explanation of what happened in this step."
                },
                vars: { 
                    type: Type.OBJECT, 
                    description: "Current state of local variables.",
                    properties: {},
                    additionalProperties: { type: Type.STRING }
                }
              },
              required: ["description", "vars"]
            }
          }
        },
        required: ["output", "trace"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return {
      output: "Error: Could not simulate this code.",
      trace: [{ description: "The robot got confused by the code!", vars: {} }]
    };
  }
}
