<template>
  <div>
    <div class="container mx-auto my-6 flex items-center gap-2 px-4 leading-none">
      <RouterLink to="/">Главная</RouterLink>
      <span>/</span>
      <RouterLink to="/blog">Блог</RouterLink>
    </div>
    {{ data }}
    <div class="container mx-auto my-16 px-4">
      <div
        v-if="isSuccess"
        class="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(article, index) in articles?.list"
          :key="index"
          v-motion-slide-visible-once-bottom
        >
          <img
            :src="article.img"
            alt=""
            class="aspect-square w-full rounded-xl object-cover object-top"
          />
          <div class="relative -mt-16 w-full rounded-xl bg-white p-8 shadow-main">
            <div class="mb-4 flex items-center justify-between">
              <h1 class="font-bold uppercase text-orange-200">
                {{ article.name }}
              </h1>
              <!-- <p class="text-sm text-black opacity-50">{{ article.date }}</p> -->
            </div>
            <div class="mb-4">
              {{ article.text }}
            </div>
            <NuxtLink
              :to="'blog/' + article.id"
              class="flex items-center gap-2 font-bold uppercase leading-none"
            >
              Читать полностью <IconBlogArrowRight class="inline-block h-[1em]" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto my-16 flex h-12 items-center justify-center gap-2 px-4">
      <button
        class="flex aspect-square h-full items-center justify-center rounded-lg bg-white shadow-main"
        :disabled="isFirstPage"
        @click="prevPage()"
      >
        <IconCart
          class="h-4 transition-opacity"
          :class="{ 'opacity-50': isFirstPage }"
        />
      </button>
      <button
        v-for="index in pageCount"
        :key="index"
        class="flex aspect-square h-full items-center justify-center rounded-lg border-2 bg-white shadow-main transition-colors"
        :class="{
          'border-orange-200': currentPage === index,
          'border-transparent': currentPage !== index,
        }"
        @click="currentPage = index"
      >
        <span class="text-base">{{ index }}</span>
      </button>
      <button
        class="flex aspect-square h-full items-center justify-center rounded-lg bg-white shadow-main"
        :disabled="isLastPage"
        @click="nextPage()"
      >
        <IconCart
          class="h-4 transition-opacity"
          :class="{ 'opacity-50': isLastPage }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// function repeat<T>(array: T[], n: number) {
//   let newArray: T[] = []
//   for (let i = 0; i < n; i++) {
//     newArray = newArray.concat(array)
//   }
//   return newArray
// }

const pageCount = ref(3)
const currentPage = ref(1)

const prevPage = () => {
  currentPage.value = Math.max(1, currentPage.value - 1)
}
const nextPage = () => {
  currentPage.value = Math.min(pageCount.value, currentPage.value + 1)
}

const isLastPage = computed(() => pageCount.value === currentPage.value)
const isFirstPage = computed(() => currentPage.value === 1)

const offset = ref(0)

const { data: articles, isSuccess } = useBlogs({
  offset,
  limit: 20,
})
</script>
