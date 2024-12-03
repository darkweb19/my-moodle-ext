import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model: GenerativeModel = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

export const queryGeminiLLM = async (
	text: string,
	concise: boolean
): Promise<string> => {
	const prompt = concise
		? `Provide a concise answer for the following question or MCQ without any explanation: \n\n${text}`
		: text;

	try {
		const result = await model.generateContent(prompt);
		return result.response.text() || "No response from Gemini.";
	} catch (error) {
		console.error("Error querying Gemini:", error);
		return "Error fetching answer from Gemini.";
	}
};
