import { sveltekit } from '@sveltejs/kit/vite';
import svg from "vite-plugin-svgstring";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), svg()],
	resolve: {
		alias: {
			"$styles": path.resolve("./src/styles"),
			"$data": path.resolve("./src/data"),
			"$components": path.resolve("./src/components"),
			"$utils": path.resolve("./src/utils"),
			"$stores": path.resolve("./src/stores"),
			"$actions": path.resolve("./src/actions"),
			"$svg": path.resolve("./src/svg")
		}
	}
};

export default config;
