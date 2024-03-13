// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'
export default defineNuxtConfig({
  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
  ],
  css: ['~/assets/set.less'],
  devtools: { enabled: process.env.DEVTOOLS === 'true' },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_sets.scss" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    public:{
      webName:process.env.WEB_NAME,
      webUrl:process.env.WEB_URL,
      VARIABLE_NAME:process.env.VARIABLE_NAME,
      serviceUrls:process.env.SERVICEURL
    }
  },
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        for (const page of pages) {
          if (/* some condition */ true) {
            page.meta ||= {}
            // Note that this will override any middleware set in `definePageMeta` in the page
            page.meta.middleware = ['auth']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  }
})
