import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "index.html"),
        guides: path.resolve(__dirname, "guides/index.html"),
        youtubeGuide: path.resolve(__dirname, "guides/youtube-seo-2025/index.html"),
        chatgptGuide: path.resolve(__dirname, "guides/chatgpt-marketing-roi-prompt/index.html"),
        tiktokGuide: path.resolve(__dirname, "guides/tiktok-seo-2025/index.html"),
        videos: path.resolve(__dirname, "videos/index.html"),
        impressum: path.resolve(__dirname, "impressum/index.html"),
        datenschutz: path.resolve(__dirname, "datenschutz/index.html"),
      },
    },
  },
}));
