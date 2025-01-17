import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/index.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
    },
    build: {
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'resources/js/app.js'),
            },
        },
    },
});