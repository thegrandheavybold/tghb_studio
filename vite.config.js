import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {

  const isProduction = mode === 'production'
  const fullReloadFilePattern = /\.(njk|md|json|toml|ya?ml)$/
  const fullReloadJsDataPattern = /(\/src\/_data\/.*\.js$|\/src\/.*\.11tydata\.js$)/

  return {
    root: 'src',
    plugins: [
      {
        name: 'full-reload-on-content-change',
        handleHotUpdate({ file, server }) {
          if (fullReloadFilePattern.test(file) || fullReloadJsDataPattern.test(file)) {
            server.ws.send({ type: 'full-reload' })
            return []
          }
        }
      }
    ],
    server: {
      watch: {
        usePolling: true,
        interval: 120
      }
    },

    css: {
      preprocessorOptions: {
        sass: {
          includePaths: ['./node_modules'],
          quietDeps: true
        }
      }
    },

    optimizeDeps: {
      include: ['mixitup-multifilter/dist/mixitup-multifilter.js']
    },

    build: {
      manifest: true,
      outDir: path.resolve(__dirname, '.vite-build'),
      emptyOutDir: true,
      sourcemap: !isProduction,

      commonjsOptions: {
        include: [/mixitup-multifilter/, /node_modules/]
      },

      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/js/main.js'),
          style: path.resolve(__dirname, 'src/sass/style.sass')
        },

        output: {

          entryFileNames: (chunkInfo) => {
            return 'assets/js/[name]-[hash].js'
          },

          chunkFileNames: 'assets/js/[name]-[hash].js',

          assetFileNames: (assetInfo) => {

            const ext = assetInfo.name.split('.').pop()

            if (/png|jpe?g|svg|gif|webp|avif/i.test(ext)) {
              return 'assets/img/[name]-[hash][extname]'
            }

            if (/woff2?|ttf|otf/i.test(ext)) {
              return 'assets/fonts/[name]-[hash][extname]'
            }

            if (/css/i.test(ext)) {
              return 'assets/css/[name]-[hash][extname]'
            }

            return 'assets/[name]-[hash][extname]'
          }

        }
      }
    }
  }
})
