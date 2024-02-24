<template>
  <div class="relative">
    <div
      ref="container"
      class="scrollbar-hide flex items-center overflow-x-auto pr-4 text-sm uppercase"
    >
      <CategorySpyElement
        v-for="category in categories"
        :key="category.id"
        :behavior="props.behavior"
        :category="category"
      />
    </div>

    <div class="absolute bottom-0 left-0 top-0 w-4 bg-gradient-to-r from-whitegray to-transparent"></div>
    <div class="absolute bottom-0 right-0 top-0 w-4 bg-gradient-to-l from-whitegray to-transparent"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  behavior: 'redirect-and-scroll' | 'scroll'
}>()

const { data: categories } = useCategories((v) => v.list)
</script>
