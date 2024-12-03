import { createWorker } from "tesseract.js";

export const performOCR = async (image: string): Promise<string> => {
	const worker = await createWorker();
	await worker.load();
	const {
		data: { text },
	} = await worker.recognize(image);
	await worker.terminate();
	return text;
};
