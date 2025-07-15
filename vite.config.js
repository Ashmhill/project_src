import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".html"));

if (htmlFiles.length === 0) {
  throw new Error(`❌ No .html file found in ${__dirname}`);
}

const mainHtml = htmlFiles[0];

export default defineConfig({
  root: __dirname,
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, mainHtml)
      }
    }
  },
  server: {
    open: `/${mainHtml}`  // 👈 Automatically open your actual HTML file
  }
});
