
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
      "react": path.resolve(__dirname, "node_modules/react"),
    },
  },
  optimizeDeps: {
    include: ['mapbox-gl', 'react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: ['node_modules/mapbox-gl/**']
    }
  }
}));
