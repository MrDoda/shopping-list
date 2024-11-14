import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ['fetch-mock'],
      },
    },
  }
})
