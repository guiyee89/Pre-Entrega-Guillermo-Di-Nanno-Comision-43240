import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

export default defineConfig({
    base:'https://guiyee89.github.io/Pre-Entrega-Guillermo-Di-Nanno-Comision-43240/',
    plugins: [react(), macrosPlugin()]
})