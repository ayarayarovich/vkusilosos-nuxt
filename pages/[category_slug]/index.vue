<template>
  <main>
    <div class="sticky top-[calc(4rem-0.5px)] z-30 bg-white bg-opacity-30 backdrop-blur-sm lg:top-[calc(5rem-0.5px)]">
      <div class="container mx-auto py-4">
        <CategorySpy behavior="redirect-and-scroll" />
      </div>
    </div>
    <Category
      v-if="category"
      :category="category"
    />

    {{ category }}
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

definePageMeta({
  middleware: ['check-category-route'],
})

const { data: category, suspense: suspenseCategory } = useCategory(route.params.category_slug as string, (v) => v)
onServerPrefetch(async () => {
  await suspenseCategory()
})

useHead({
  title: category.value?.title || undefined,
  meta: [
    { name: 'description', content: category.value?.description_seo || '' },
    { name: 'keywords', content: category.value?.keywords || '' },
  ],
})
</script>
