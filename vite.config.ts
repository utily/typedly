/// <reference types="vitest/config" />
import { defineConfig } from "vite"

export default defineConfig({
	test: {
		typecheck: { tsconfig: "./tsconfig.json" },
		coverage: {
			enabled: true,
			cleanOnRerun: true,
			reporter: ["text", "json", "html"],
			provider: "v8",
			thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 }
		},
		globals: true,
		include: ["**/*.spec.[tj]s"],
		testTimeout: 20000,
		isolate: false,
		exclude: ["node_modules", "dist"],
		server: { deps: { inline: ["isly"] } }
	}
})
