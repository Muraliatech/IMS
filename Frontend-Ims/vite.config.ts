import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(),tailwindcss()], // No need to include Tailwind here
  server: {
    port: 5173, // You can change the port if needed
  },
  build: {
    outDir: 'dist', // Default output folder
  }
});
