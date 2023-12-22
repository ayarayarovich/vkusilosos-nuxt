import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    icon: false,
    closeButton: false,
    hideProgressBar: true,
  } satisfies PluginOptions)
})
