import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  // development, no deploy!
  // build: {
  //   // build to the backend's dist directory because the backend will serve it for us
  //   outDir: "../backend/dist",
  // },
  build:{
    
  }
});
