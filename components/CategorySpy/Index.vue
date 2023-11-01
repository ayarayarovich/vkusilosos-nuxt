<template>
  <div
    ref="container"
    class="scrollbar-hide flex items-center overflow-x-auto py-4 pr-4 text-sm uppercase"
  >
    <CategorySpyElement
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~/store/category'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
</script>
