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
      apiKey: "AIzaSyCzKrxX3WMvl4voOfbeCLdx4W6v4KK2pEs",
      authDomain: "vkusilosos-c3bbf.firebaseapp.com",
      projectId: "vkusilosos-c3bbf",
      storageBucket: "vkusilosos-c3bbf.appspot.com",
      messagingSenderId: "799735561746",
      appId: "1:799735561746:web:8e3b229c6d16b7c5dba2cb",
      measurementId: "G-NFEGSK0DMV"
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
