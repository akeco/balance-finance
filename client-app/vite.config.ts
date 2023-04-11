import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import eslint from 'vite-plugin-eslint';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: vitestConfig.test,
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
  },
});
