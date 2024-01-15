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
    'nuxt-lodash',
    '@nuxtjs/google-fonts',
    'vue-yandex-maps/nuxt',
    '@nuxtseo/module',
  ],
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  yandexMaps: {
    apikey: 'fd2d52ec-de88-404a-bf62-fd53f92a72ca',
    lang: 'ru_RU',
    strictMode: true,
  },
  build: {
    transpile: ['vue-toastification'],
  },
  googleFonts: {
    families: {
      Ubuntu: [300, 400, 500, 700],
    },
  },
  tailwindcss: {
    exposeConfig: true,
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
  site: {
    name: 'Вкус И Лосось',
    url: 'https://test.losos.toolio.space',
    description: 'Доставка японской кухни',
    defaultLocale: 'ru',
    indexable: true,
    trailingSlash: false,
  },
  css: ['~/assets/main.css'],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  sourcemap: {
    server: true,
    client: true
  }
})
