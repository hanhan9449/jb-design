import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import path from 'path'
export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',

      lib: {
        entry: path.resolve(__dirname, "public-api.ts"),
        formats: ['es', 'umd', 'cjs'],
        name: "public-api",
        // fileName: (format) => `public-api.${format}.js`
      },
      rollupOptions: {
        external: ['solid-js'],
        output: {
          globals: {
            'solid-js': "Solidjs"
          }
        }

    }
  },
});
