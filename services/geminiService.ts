import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';

// Fix: Initialize GoogleGenAI directly with the environment variable as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a 5-question multiple-choice quiz about ${topic}. For each question, provide 4 options and indicate the correct answer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quiz: {
              type: Type.ARRAY,
              description: "An array of 5 quiz questions.",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "The quiz question."
                  },
                  options: {
                    type: Type.ARRAY,
                    description: "An array of 4 possible answers.",
                    items: { type: Type.STRING }
                  },
                  correctAnswer: {
                    type: Type.STRING,
                    description: "The correct answer from the options array."
                  }
                },
                required: ["question", "options", "correctAnswer"]
              }
            }
          },
          required: ["quiz"]
        },
      },
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);
    
    // Validate the structure before returning
    if (parsed.quiz && Array.isArray(parsed.quiz)) {
      return parsed.quiz as QuizQuestion[];
    } else {
      throw new Error("Invalid quiz format received from API");
    }

  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback to static questions in case of API error
    return [
        {
            question: `What is a core concept of ${topic}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A"
        },
        {
            question: "This is a fallback question due to an API error.",
            options: ["Retry", "Check Console", "OK", "Cancel"],
            correctAnswer: "Check Console"
        }
    ];
  }
};