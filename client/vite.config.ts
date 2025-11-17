import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  resolve: {
    alias: [
      { find: /^\/components/, replacement: path.resolve(__dirname, 'src/components') },
      { find: /^\/styles/, replacement: path.resolve(__dirname, 'src/styles') },
      { find: /^\/pages/, replacement: path.resolve(__dirname, 'src/pages') },
      { find: /^\/router/, replacement: path.resolve(__dirname, 'src/router') },
      { find: /^\/routes/, replacement: path.resolve(__dirname, 'src/routes') },
      { find: /^\/store/, replacement: path.resolve(__dirname, 'src/store') },
      { find: /^\/providers/, replacement: path.resolve(__dirname, 'src/providers') },
      { find: /^\/api/, replacement: path.resolve(__dirname, 'src/api') },
      { find: /^\/hooks/, replacement: path.resolve(__dirname, 'src/hooks') },
      { find: /^\/features/, replacement: path.resolve(__dirname, 'src/features') },
      { find: /^\/utils/, replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
});
