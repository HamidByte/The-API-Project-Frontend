import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import basicSsl from '@vitejs/plugin-basic-ssl'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: true, // Not needed for Vite 5+
  //   host: '127.0.0.1',
  //   port: 5173
  // },
  plugins: [
    // basicSsl({
    //   /* name of certification */
    //   name: 'api.com',
    //   /** custom trust domains */
    //   domains: ['api.com', '127.0.0.1', 'localhost']
    //   /* custom certification directory */
    //   // certDir: '/Users/.../.devServer/cert'
    // }),
    vue()
  ],
  envPrefix: 'APP_',
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true
  }
})
