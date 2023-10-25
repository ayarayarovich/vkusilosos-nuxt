// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@vueuse/motion/nuxt",
  ],
  appConfig: {
    baseAPIURL: "https://api.losos.ayarayarovich.tech",
  },
  runtimeConfig: {
    public: {
      siteUrl: "losos.ayarayarovich.tech",
      siteName: "Вкус И Лосось",
      siteDescription: "Доставка японской кухни",
      language: "ru",
    },
  },
  routeRules: {
    "/": { swr: 60 },
  },
  css: ["~/assets/main.css"],
  // extends: [
  //   'nuxt-seo-kit'
  // ],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
});
