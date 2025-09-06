// FIX: Replaced incorrect type 'ModelConfig' with the correct 'GenerateContentConfig' as 'ModelConfig' is not an exported member of '@google/genai'.
import { GoogleGenAI, Chat, GenerateContentConfig } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY environment variable not set');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const initializeChatSession = (systemInstruction: string, isPremium = false): Chat => {
  const config: GenerateContentConfig = {
    systemInstruction: systemInstruction,
  };

  if (isPremium) {
    config.tools = [{ googleSearch: {} }];
  }

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: config,
  });
  return chat;
};
