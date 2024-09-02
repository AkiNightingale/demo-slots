import { defineConfig } from 'vite';

export default defineConfig(({ command }) => (
  {
    base: command === 'serve' ? '/' : '/demo-slots/',
    root: '.',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
    },
    server: {
      open: true,
    },
    publicDir: 'public',
    optimizeDeps: {
      include: ['pixi.js'],
    },
  }
));
