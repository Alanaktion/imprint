import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
const os = require('os');

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    server: {
        // This is configured to work with Laravel Valet.
        // If you are not using Valet, update these paths or use @vitejs/plugin-basic-ssl
        https: {
            key: `${os.homedir()}/.config/valet/Certificates/imprint.test.key`,
            cert: `${os.homedir()}/.config/valet/Certificates/imprint.test.crt`,
        },
        host: 'imprint.test',
    },
});
