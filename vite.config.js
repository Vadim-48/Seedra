import {defineConfig} from 'vite'
import path from 'path'
import {resolve} from 'path'
import {globSync} from 'glob'
import handlebars from 'vite-plugin-handlebars'
import autoprefixer from 'autoprefixer'
import viteImagemin from 'vite-plugin-imagemin'
import sortMediaQueries from 'postcss-sort-media-queries';
import {hulakPlugins} from 'vite-plugin-hulak-tools'

const BASE_URL = '/Seedra/'; // name project in github

const pages = Object.fromEntries(
    globSync(['./*.html', './pages/*.html'], {ignore: 'node_modules/**'}).map(file => {
        const name = path.basename(file, '.html');
        return [name, resolve(__dirname, file)];
    })
);

export default defineConfig({
    base: BASE_URL,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    css: {
        postcss: {
            plugins:
                [
                    autoprefixer(),
                    sortMediaQueries({sort: 'desktop-first'}),
                ],
        },
    },

    plugins: [
        {
            name: 'dev-pages-rewrite',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url.startsWith(BASE_URL)) {
                        const cleanPath = req.url.substring(BASE_URL.length);
                        const name = path.basename(cleanPath.split('?')[0], '.html');
                        if (name && globSync(`./pages/${name}.html`).length > 0) {
                            req.url = BASE_URL + `pages/${name}.html`;
                        }
                    }
                    next();
                });
            }
        },

        //  for build dist without /pages/
        {
            name: 'flatten-pages-plugin',
            enforce: 'post',
            generateBundle(_, bundle) {
                for (const fileName in bundle) {
                    if (fileName.startsWith('pages/') && fileName.endsWith('.html')) {
                        const newName = path.basename(fileName);
                        bundle[fileName].fileName = newName;
                    }
                }
            }
        },

        hulakPlugins({
            enableHandlebars: true,
            handlebarsOptions: {
                partialDirectory: './src/html'
            }
        }),

        handlebars({
            partialDirectory: path.resolve(__dirname, 'src/html'),
        }),

        viteImagemin({ //  WebP
            gifsicle: {},
            optipng: {optimizationLevel: 5},
            mozjpeg: {quality: 90},
        }),

        {
            name: 'handlebars-full-reload',
            handleHotUpdate({file, server}) {
                if (file.endsWith('.html')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    })
                }
            },
        },
    ],

    server: {
        watch: {
            // include: ['src/html/**/*.html', 'src/**/*.html'],
            ignored: ['**/*.webp']
        },
    },

    build: {
        sourcemap: false,
        rollupOptions: {
            input: {
                ...pages,
            },
        },
    },
})