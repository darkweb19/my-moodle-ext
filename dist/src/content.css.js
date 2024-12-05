import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/sujanshrestha/Desktop/my-ext/src/content.css"
const __vite__css = "/* Add any specific styles for content script here */\n.extension-content {\n\tposition: fixed;\n\tz-index: 10000;\n\t/* Add more styles as needed */\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
import.meta.hot.accept()
import.meta.hot.prune(() => __vite__removeStyle(__vite__id))