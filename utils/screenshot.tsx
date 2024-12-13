import { queryGeminiLLM } from "./gemini";

export const takeScreenshot = (
	setPreview: (url: string | null) => void,
	setLoading: (loading: boolean) => void,
	setAnswer?: (answer: string) => void
) => {
	setLoading(true); // Set loading state to true

	// Use the Chrome Tabs API to capture the visible area of the current tab
	chrome.tabs.captureVisibleTab({ format: "png" }, async (imageUri) => {
		if (chrome.runtime.lastError) {
			console.error(
				"Error capturing screenshot:",
				chrome.runtime.lastError
			);
			setPreview(null); // Reset preview on error
			setLoading(false); // Set loading state to false
			return;
		}

		// Set the captured image URI to the preview state
		setPreview(imageUri);
		setLoading(false); // Set loading state to false
		//query to gemini
		if (setAnswer) {
			await queryGeminiLLM(imageUri, false, (geminiAnswer) =>
				setAnswer(geminiAnswer)
			);
		}
	});
};
