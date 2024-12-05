import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBKYlHEgbqzE38sX7VTUlxeG8_BDapZSmo");
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

export const queryGeminiLLM = async (
	imageData: string,
	concise: boolean
): Promise<string> => {
	try {
		const prompt = concise
			? "Can you tell me the answer to this solution?"
			: "What's in this image? Please provide a detailed analysis.";

		// Remove the data URL prefix if present
		const base64Image = imageData.replace(
			/^data:image\/(png|jpg|jpeg|gif);base64,/,
			""
		);

		const result = await model.generateContent([
			prompt,
			{
				inlineData: {
					data: base64Image,
					mimeType: "image/jpeg",
				},
			},
		]);

		return result.response.text() || "No response from Gemini.";
	} catch (error) {
		console.error("Error querying Gemini:", error);
		return "Error fetching answer from Gemini.";
	}
};
