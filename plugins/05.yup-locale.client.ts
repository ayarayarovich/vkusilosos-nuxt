import { defineNuxtPlugin } from 'nuxt/app'

import { ru } from 'yup-locales'
import { setLocale } from 'yup'

export default defineNuxtPlugin(() => {
  setLocale(ru)
})
