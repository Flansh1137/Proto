import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer() // Add the bundle analyzer plugin
  ],
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group dependencies from node_modules into separate chunks
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to 1000 kB
  },
  server: {
    port: 5137, // Optional: You can define the dev server port if needed
  },
});
