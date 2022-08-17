import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      input: {
        ui: 'ui.html',
        code: 'figma/code.ts',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
