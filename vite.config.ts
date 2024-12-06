import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
	plugins: [react(), crx({ manifest })],
	define: {
		"process.env.GEMINI_API_KEY": JSON.stringify(
			process.env.GEMINI_API_KEY
		),
	},
});
