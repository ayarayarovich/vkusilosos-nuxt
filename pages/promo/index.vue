<template>
  <div>
    <div class="container mx-auto my-6 flex items-center gap-2 px-4 leading-none">
      <RouterLink to="/">Главная</RouterLink>
      <span>/</span>
      <RouterLink to="/promo">Акции</RouterLink>
    </div>
    <div class="container mx-auto my-16 px-4">
      <div
        class="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <template v-if="isSuccess">
          <div
            v-for="(article, index) in articles?.list"
            :key="index"
          >
            <img
              :src="article.img"
              draggable="false"
              alt=""
              class="aspect-square w-full rounded-xl object-cover object-top"
            />
            <div class="relative -mt-16 w-full rounded-xl bg-white p-8 shadow-main">
              <div class="mb-4 flex items-center justify-between">
                <h1 class="font-bold uppercase text-orange-200">
                  {{ article.name }}
                </h1>
                <!-- <p class="text-sm text-black opacity-50">{{ article.text }}</p> -->
              </div>
              <div class="mb-4">
                <!-- {{ article.text }} -->
              </div>
              <NuxtLink
                :to="'promo/' + article.id"
                class="flex items-center gap-2 font-bold uppercase leading-none"
              >
                Читать полностью <IconBlogArrowRight class="inline-block h-[1em]" />
              </NuxtLink>
            </div>
          </div>
        </template>
        <template v-else>
          <Skeleton
            v-for="i in 6"
            :key="i"
            height="24rem"
            width="100%"
            :show-content="false"
          />
        </template>
      </div>
    </div>

    <div class="mb-12 flex justify-center px-4">
      <Paginator
        v-model:page="currentPage"
        :total="articles?.total"
        :items-per-page="itemsPerPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1)
const itemsPerPage = ref(20)

const offset = computed(() => (currentPage.value - 1) * itemsPerPage.value)

const {
  data: articles,
  isSuccess,
  suspense,
} = usePromos({
  offset,
  limit: itemsPerPage,
})

onServerPrefetch(async () => {
  await suspense()
})
</script>
