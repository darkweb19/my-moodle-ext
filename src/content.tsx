import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./content.css";

// Create a container div for the React app
const container = document.createElement("div");
container.id = "mcq-answer-finder-container";

document.body.append(container);

createRoot(container).render(
	<StrictMode>
		<div>content page</div>
	</StrictMode>
);
