// import React, { useState, useRef } from "react";
// import { performOCR } from "../../utils/ocr";
// import { queryGeminiLLM } from "../../utils/gemini";

// const Popup: React.FC = () => {
// 	const [text, setText] = useState<string>("");
// 	const [answer, setAnswer] = useState<string>("");
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [isSelecting, setIsSelecting] = useState(false);
// 	const [selection, setSelection] = useState<{
// 		x: number;
// 		y: number;
// 		width: number;
// 		height: number;
// 	} | null>(null);
// 	const overlayRef = useRef<HTMLDivElement | null>(null);
// 	const startPos = useRef<{ x: number; y: number } | null>(null);
// 	// Start dragging to select area
// 	const startSelection = (e: React.MouseEvent) => {
// 		if (!isSelecting) return;

// 		startPos.current = { x: e.clientX, y: e.clientY };
// 		setSelection({ x: e.clientX, y: e.clientY, width: 0, height: 0 });

// 		// Handle mouse move to adjust the selection box
// 		const mouseMoveHandler = (moveEvent: MouseEvent) => {
// 			if (startPos.current) {
// 				const width = moveEvent.clientX - startPos.current.x;
// 				const height = moveEvent.clientY - startPos.current.y;
// 				setSelection({
// 					x: startPos.current.x,
// 					y: startPos.current.y,
// 					width: width > 0 ? width : 0,
// 					height: height > 0 ? height : 0,
// 				});
// 			}
// 		};

// 		// Stop dragging when the mouse button is released
// 		const mouseUpHandler = () => {
// 			window.removeEventListener("mousemove", mouseMoveHandler);
// 			window.removeEventListener("mouseup", mouseUpHandler);
// 			setIsSelecting(false); // Stop selecting after mouse up
// 		};

// 		window.addEventListener("mousemove", mouseMoveHandler);
// 		window.addEventListener("mouseup", mouseUpHandler);
// 	};

// 	// Function to capture the screenshot of the selected area
// 	// const captureScreenshot = () => {
// 	// 	console.log("error but clicked");
// 	// 	// if (!selection) return;

// 	// 	// Ensure chrome is available
// 	// 	console.log(chrome.tabs);
// 	// 	chrome.tabs.captureVisibleTab((image: string | undefined) => {
// 	// 		if (chrome.runtime.lastError) {
// 	// 			console.error(
// 	// 				"Error capturing tab:",
// 	// 				chrome.runtime.lastError.message
// 	// 			);
// 	// 			return;
// 	// 		}
// 	// 		console.log("captured");
// 	// 		if (image) {
// 	// 			console.log("Captured image:", image);
// 	// 			// Perform OCR on the captured image
// 	// 			performOCR(image).then((ocrText) => {
// 	// 				console.log("OCR Text:", ocrText);
// 	// 				setText(ocrText); // Set extracted text for further processing
// 	// 			});
// 	// 		} else {
// 	// 			console.error("No image was captured.");
// 	// 		}
// 	// 	});
// 	// };

// 	const captureScreenshot = () => {
// 		return null;
// 	};

// 	const copyToClipboard = () => {
// 		navigator.clipboard.writeText(text).then(() => {
// 			alert("Copied to clipboard!");
// 		});
// 	};

// 	const getConciseAnswer = async () => {
// 		if (!text) return;
// 		setLoading(true);
// 		const conciseAnswer = await queryGeminiLLM(text, true);
// 		setAnswer(conciseAnswer);
// 		setLoading(false);
// 	};

// 	return (
// 		<div style={{ padding: "16px", width: "300px" }}>
// 			<h2>MCQ Answer Finder</h2>
// 			{loading ? (
// 				<p>Loading...</p>
// 			) : text ? (
// 				<>
// 					<button onClick={copyToClipboard}>Copy Questions</button>
// 					<button onClick={getConciseAnswer}>
// 						Get Concise Answer
// 					</button>
// 					<pre style={{ marginTop: "10px" }}>{answer}</pre>
// 				</>
// 			) : (
// 				<>
// 					<button onClick={() => setIsSelecting(true)}>
// 						Start Selection
// 					</button>
// 					{isSelecting && (
// 						<div
// 							ref={overlayRef}
// 							style={{
// 								position: "absolute",
// 								top: 0,
// 								left: 0,
// 								right: 0,
// 								bottom: 0,
// 								backgroundColor: "rgba(0, 0, 0, 0.5)",
// 								cursor: "crosshair",
// 								zIndex: 9999,
// 							}}
// 							onMouseDown={startSelection}
// 						>
// 							{selection && (
// 								<div
// 									style={{
// 										position: "absolute",
// 										top: selection.y,
// 										left: selection.x,
// 										width: selection.width,
// 										height: selection.height,
// 										border: "2px dashed white",
// 										backgroundColor:
// 											"rgba(255, 255, 255, 0.3)",
// 										pointerEvents: "none",
// 									}}
// 								/>
// 							)}
// 						</div>
// 					)}
// 					<button onClick={captureScreenshot}>
// 						Capture Screenshot
// 					</button>
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default Popup;
