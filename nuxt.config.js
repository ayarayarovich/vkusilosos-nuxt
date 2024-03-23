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
    'radix-vue/nuxt',
    'nuxt-vuefire',
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
  vuefire: {
    config: {
      apiKey: 'AIzaSyDI9FGAbA5e49lw2rKnF_ye8mbLLcgz4c0',
      authDomain: 'vkusilosos-28d37.firebaseapp.com',
      projectId: 'vkusilosos-28d37',
      storageBucket: 'vkusilosos-28d37.appspot.com',
      messagingSenderId: '863002177874',
      appId: '1:863002177874:web:6e17d3fa533dc0971d0a8b',
      measurementId: 'G-QGG1P5ZG27',
    },
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
    url: 'https://vkusilosos.ru',
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
    client: true,
  },
})
