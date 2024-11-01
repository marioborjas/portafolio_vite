import { defineConfig } from "vite";
import * as glob from "glob";
import path, { resolve } from "node:path";
import htmlPurge from 'vite-plugin-purgecss';
import cssnano from 'cssnano';

const getHtmlEntries = () => {
    return Object.fromEntries(
        [
            ...glob.sync('./**/*.html', { ignore: ['./dist/**', './node_modules/**'] }).map(file => [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ])
        ]
    );
};

export default defineConfig(
    {
        appType: 'mpa',
        base: "/portafolio_vite/",
        build: {
            rollupOptions: {
                input: getHtmlEntries()
            }
        },
        css: {
            postcss: {
                plugins: [
                    cssnano({ preset: 'default' }) // Añade minificación de CSS con cssnano
                ],
            },
        },
        plugins: [
            htmlPurge({}),
        ]
    }
);
