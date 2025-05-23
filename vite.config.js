import { defineConfig } from "vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    assetsInclude: ['**/*.glb'],
    resolve: {
        alias: {
            "@": path.resolve("src"),
        },
    },
});
