import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    mode === 'development' &&
    componentTagger(),
    process.env.ANALYZE &&
    (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as any),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    modulePreload: { polyfill: false },
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          radix: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-menubar',
            '@radix-ui/react-select',
            '@radix-ui/react-popover',
            '@radix-ui/react-toast',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-switch',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-slider',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-label',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-separator',
          ],
          framer: ['framer-motion'],
          query: ['@tanstack/react-query'],
          zod: ['zod'],
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
}));
