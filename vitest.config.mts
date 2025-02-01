import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"]
        }
    },
    plugins:[tsConfigPaths()],
    
})