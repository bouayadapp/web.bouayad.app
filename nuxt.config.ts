import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/sass/main.scss'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/utils',
      pathPrefix: false,
    },
    {
      path: '~/components/partials/Nav',
      pathPrefix: false,
    },
    {
      path: '~/components/partials',
      pathPrefix: false,
    },
    {
      path: '~/components/sections',
      pathPrefix: false,
    },
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: process.env.BOUAYADAPP_API_SECRET,
    // Keys within public, will be also exposed to the client-side
    public: {
      apiHost: process.env.BOUAYADAPP_API_URL,
    }
  },

  compatibilityDate: '2024-09-22',

  devtools: {
    timeline: {
      enabled: true,
    },
  },
})