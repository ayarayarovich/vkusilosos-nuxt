<template>
  <div class="relative">
    <div
      ref="container"
      class="scrollbar-hide flex items-center overflow-x-auto pr-4 text-sm uppercase"
    >
      <CategorySpyElement
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>

    <div class="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-whitegray to-transparent"></div>
    <div class="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-whitegray to-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~/store/category'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
</script>
