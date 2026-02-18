import {defineConfig} from 'vite'
import path from 'path'
import {resolve} from 'path'
import handlebars from 'vite-plugin-handlebars'
import autoprefixer from 'autoprefixer'
import viteImagemin from 'vite-plugin-imagemin'
import sortMediaQueries from 'postcss-sort-media-queries';
import {hulakPlugins} from 'vite-plugin-hulak-tools'

const pages = {
    index: resolve(__dirname, 'index.html'),
    // all-products:  resolve(__dirname, 'all-products.html'),
    // 'about-seedra':  resolve(__dirname, 'about-seedra.html'),
    'our-blog':  resolve(__dirname, 'our-blog.html'),
    'card-news':  resolve(__dirname, 'card-news.html'),
    // our-blog:  resolve(__dirname, 'our-blog.html'),
    product:  resolve(__dirname, 'product.html'),
}

export default defineConfig({
    base: '/Seedra/',  // name project in github
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
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