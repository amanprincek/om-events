import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@om-tent/core-types': path.resolve(__dirname, './packages/core-types/index.ts'),
        '@om-tent/mock-data': path.resolve(__dirname, './packages/mock-data/index.ts'),
        '@om-tent/ui-system': path.resolve(__dirname, './packages/ui-system/index.ts'),
        '@om-tent/data-access': path.resolve(__dirname, './packages/data-access/index.ts'),
        '@om-tent/utils': path.resolve(__dirname, './packages/utils/index.ts')
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
