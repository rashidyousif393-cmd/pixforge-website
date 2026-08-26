import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ isSsrBuild }) => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    publicDir: isSsrBuild ? false : path.resolve(__dirname, 'public'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: isSsrBuild
      ? {
          // The SSR bundle only exists to be `import()`-ed once, locally, by
          // scripts/prerender.mjs during `npm run build` -- it's never shipped
          // to a browser, so none of the client bundle's chunking/size concerns
          // apply here.
          outDir: 'dist-server',
          ssrEmitAssets: false,
        }
      : {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  const parts = id.split('node_modules/');
                  const pathAfterNodeModules = parts[parts.length - 1];
                  if (
                    pathAfterNodeModules.startsWith('react/') ||
                    pathAfterNodeModules.startsWith('react-dom/') ||
                    pathAfterNodeModules.startsWith('scheduler/')
                  ) {
                    return 'vendor-react';
                  }
                  if (
                    pathAfterNodeModules.startsWith('gsap/') ||
                    pathAfterNodeModules.startsWith('@gsap/')
                  ) {
                    return 'vendor-gsap';
                  }
                  if (
                    pathAfterNodeModules.startsWith('react-router') ||
                    pathAfterNodeModules.startsWith('@remix-run/')
                  ) {
                    return 'vendor-router';
                  }
                  // Everything else (lucide-react icons, @n8n/chat and its Vue-based
                  // dependency tree: vue, @vueuse, vue-markdown-render, markdown-it,
                  // highlight.js...) is left for Rollup's automatic chunking instead of
                  // being force-bucketed here, so icons/code only used by lazy-loaded,
                  // below-the-fold sections stay merged into THEIR own async chunk
                  // rather than being pulled into the eager initial bundle.
                  return undefined;
                }
              },
            },
          },
          chunkSizeWarningLimit: 1000,
        },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
