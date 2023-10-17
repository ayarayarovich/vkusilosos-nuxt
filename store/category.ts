import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '~/interfaces/dishes'

export const useCategoryStore = defineStore(
    'category',
    () => {
        const currentCategoryID = ref(-1)
        const categories = ref<Category[] | null>(null)

        return { currentCategoryID, categories }
    }
)
