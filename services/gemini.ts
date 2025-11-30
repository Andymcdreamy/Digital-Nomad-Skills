import { GoogleGenAI } from "@google/genai";
import { SkillData } from '../types';

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API_KEY not found in environment variables.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const askOracle = async (
    query: string, 
    currentSkills: SkillData[],
    history: { role: 'user' | 'model', parts: [{ text: string }] }[] = []
): Promise<string> => {
    const ai = getClient();
    if (!ai) return "NEXUS OFFLINE: API Key missing.";

    const skillContext = currentSkills.map(s => 
        `${s.name} (Category: ${s.category}, Level: ${s.level})`
    ).join('\n');

    const systemInstruction = `
    You are NEXUS, a futuristic AI interface for a Cyberpunk RPG dashboard. 
    The user is an Operator trying to optimize their real-world skills for the future.
    
    Current User Stats:
    ${skillContext}

    Tone: Futuristic, analytical, slightly cryptic but helpful. Use terms like "Cycle", "Credits", "Net", "Meatspace", "Upload".
    
    Goal: Answer the user's question about skill development, future trends, or specific advice on how to improve the skills listed.
    If asked about trends, use knowledge about real world future trends (AI, Crypto, Biotech) but flavor it with sci-fi lore.
    Keep responses concise (under 150 words) unless asked for a deep dive.
    `;

    try {
        const model = 'gemini-2.5-flash';
        const chat = ai.chats.create({
            model,
            config: {
                systemInstruction,
                temperature: 0.8,
            },
            history: history
        });

        const result = await chat.sendMessage({ message: query });
        return result.text || "NEXUS ERROR: Data corruption in response stream.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "NEXUS ERROR: Connection to mainframe severed.";
    }
};
