import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { queryGeminiLLM } from "../../utils/gemini";
import "../App.css";

const Popup = () => {
	const [answer, setAnswer] = useState("");
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);

	const onDrop = useCallback(async (acceptedFiles: any) => {
		const file = acceptedFiles[0];
		if (!file) return;

		setPreview(URL.createObjectURL(file));
		setLoading(true);

		try {
			const reader = new FileReader();
			reader.onload = async () => {
				try {
					const base64Image = reader.result as string;
					const conciseAnswer = await queryGeminiLLM(
						base64Image,
						true,
						(streamedText) => {
							setAnswer(streamedText);
						}
					);

					console.log("Gemini Answer:", conciseAnswer);
				} catch (err) {
					console.error("Error getting answer from Gemini:", err);
					setAnswer("Error getting answer. Please try again.");
				} finally {
					setLoading(false);
				}
			};
			reader.readAsDataURL(file);
		} catch (err) {
			console.error("Error processing image:", err);
			setLoading(false);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif"],
		},
	});

	return (
		<div className="container">
			<div
				{...getRootProps()}
				className={`dropzone ${isDragActive ? "active" : ""}`}
			>
				<input {...getInputProps()} />
				<p>
					{isDragActive
						? "Drop the image here..."
						: "Drag 'n' drop an image here, or click to select"}
				</p>
			</div>

			{preview && (
				<div className="preview-container">
					<img
						src={preview}
						alt="Preview"
						className="preview-image"
					/>
				</div>
			)}

			{loading && (
				<div className="loading">
					<div className="spinner"></div>
					<p className="loading-text">Analyzing image...</p>
				</div>
			)}

			{answer && (
				<div className="result">
					<h3 className="result-title">Analysis Result:</h3>
					<p className="result-text">{answer}</p>
				</div>
			)}
		</div>
	);
};

export default Popup;
