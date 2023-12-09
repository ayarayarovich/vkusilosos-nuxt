import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const currentCategoryID = ref(-1)

  return { currentCategoryID }
})
