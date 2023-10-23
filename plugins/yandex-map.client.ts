import plugin from "vue-yandex-maps";
import { defineNuxtPlugin } from "nuxt/app";

const settings = {
  apiKey: "fd2d52ec-de88-404a-bf62-fd53f92a72ca",
  lang: "ru_RU", // Используемый язык
  coordorder: "latlong", // Порядок задания географических координат
  debug: true,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, settings);
});
