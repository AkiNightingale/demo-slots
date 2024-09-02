import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    resolve: {
        alias: {
            '@': '',
        },
    },
    build: {
        outDir: '../build',
        emptyOutDir: true,
    },
    server: {
        open: true,
    },
    optimizeDeps: {
        include: ['pixi.js'],
    },
});
