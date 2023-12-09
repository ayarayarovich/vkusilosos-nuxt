// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    '@vueuse/motion/nuxt',
    '@vee-validate/nuxt',
    'nuxt-lodash'
  ],
  lodash: {
    prefix: "_",
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  appConfig: {
    baseAPIURL: 'https://api.losos.toolio.space',
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://test.losos.toolio.space',
      siteName: 'Вкус И Лосось',
      siteDescription: 'Доставка японской кухни',
      language: 'ru',
    },
  },
  routeRules: {
    // '/': { swr: 60 },
    // '/blog/**': { swr: 60 },
  },
  css: ['~/assets/main.css'],
  // extends: [
  //   'nuxt-seo-kit'
  // ],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
})
