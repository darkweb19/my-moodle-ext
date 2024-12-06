import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

export const queryGeminiLLM = async (
	imageData: string,
	concise: boolean,
	onStreamUpdate: (text: string) => void
): Promise<void> => {
	try {
		const prompt = concise
			? `Can you tell me the answer to this solution? You just have to tell me the answer in this format :
			   Answer : _____ Option A B C D E (whatever the correct option is and say what in the option)
			   Question:--------whatever the question is-------
			   Explaination :  Here,  ___ a little bit explaination what is the context_____
			   `
			: "What's in this image? Please provide a detailed analysis.";

		// Remove the data URL prefix if present
		const base64Image = imageData.replace(
			/^data:image\/(png|jpg|jpeg|gif);base64,/,
			""
		);

		const result = await model.generateContentStream([
			prompt,
			{
				inlineData: {
					data: base64Image,
					mimeType: "image/jpeg",
				},
			},
		]);
		let fullResponse = "";
		for await (const chunk of result.stream) {
			const chunkText = chunk.text();
			fullResponse += chunkText;
			onStreamUpdate(fullResponse);
		}
	} catch (error) {
		console.error("Error querying Gemini:", error);
		onStreamUpdate("Error fetching answer from Gemini.");
	}
};
