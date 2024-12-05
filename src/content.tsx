import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Popup from "./components/Popup";
import "./content.css";

// Create a container div for the React app
const container = document.createElement("div");
container.id = "mcq-answer-finder-container";

// Append to body only if container doesn't exist
if (!document.getElementById("mcq-answer-finder-container")) {
	document.body.append(container);

	createRoot(container).render(<StrictMode>{/* <Popup /> */}</StrictMode>);
}
