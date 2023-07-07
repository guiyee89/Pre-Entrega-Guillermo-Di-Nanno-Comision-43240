import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

export default defineConfig({
    plugins: [react(), macrosPlugin()],
    resolve: {
        alias: {
            "@": new URL("./src", import.meta.url).pathname,
        },
      },
})