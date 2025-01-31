import path from "path"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite"

export default defineConfig({
  assetsInclude: ['**/*.zip', '**/*.svg'],
  plugins: [react(), svgr({
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
     include: "**/*.svg",
    }),],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})