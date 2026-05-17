import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    css: false,
    // 1. Cambiamos a 'threads' con un solo hilo para evitar el error de forks en Node viejo
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    // 2. Metemos TODAS las librerías que están dando guerra en el inline
    server: {
      deps: {
        inline: [
          "framer-motion",
          "@asamuzakjp/css-color",
          "@csstools/css-calc",
          "html-encoding-sniffer",
          "@exodus/bytes"
        ],
      },
    },
  },
})