// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@vueuse/motion/nuxt",
  ],
  runtimeConfig: {
    public: {
      siteUrl: "losos.ayarayarovich.tech",
      siteName: "Вкус И Лосось",
      siteDescription: "Доставка японской кухни",
      language: "ru",
    },
  },
  routeRules: {
    "/": { swr: 600 },
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
