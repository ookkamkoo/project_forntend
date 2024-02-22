// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@ant-design-vue/nuxt'
  ],
  devServer: {
    port: 3001
  },
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
    serviceUrl:process.env.SERVICE_URL,
    public:{
      webName:process.env.WEB_NAME,
      webUrl:process.env.WEB_URL,
    }
  }
})
