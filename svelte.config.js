import adapter from "@sveltejs/adapter-static"; 

const prod = process.env.NODE_ENV === "production";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: "docs",
            assets: "docs"
		}),
		paths: {
			base: prod ? "/energy-and-state-fragility" : "",
		},
		prerender: {
			default: true,
		}
	}
};

export default config;
