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
    // public:{
    //   webName:process.env.webName,
    //   webUrl:process.env.webUrl,
    //   variableName:process.env.variableName,
    //   serviceUrls: process.env.serviceUrls
    // },
    public:{
        webName:"demo_project",
        webUrl:"WEB_URL",
        variableName:"",
        serviceUrls: "https://backend.scbbbb.com/"
      },
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
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          // content: 'width=1080, initial-scale=0.1',
          content: 'width=1080',
        },
      ],
    },
  },
})
