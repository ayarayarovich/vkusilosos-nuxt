<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container mx-auto flex h-full flex-col items-stretch px-4">
    <div class="my-6 flex items-center gap-2 leading-none">
      <RouterLink to="/">Главная</RouterLink>
      <span>/</span>
      <RouterLink to="/promo">Акции</RouterLink>
      <span>/</span>
      <RouterLink :to="`/promo/${article?.id}`">{{ article?.name }}</RouterLink>
    </div>
    <div class="flex grow items-center justify-center">
      <div class="flex w-full flex-col items-stretch gap-8 py-12 lg:flex-row">
        <Skeleton
          height="32rem"
          width="33%"
          :show-content="isSuccess"
        >
          <div class="shrink">
            <img
              :src="article?.img"
              draggable="false"
              alt=""
              class="sticky top-32 hidden aspect-[3/4] w-full rounded-xl object-cover object-center lg:block"
            />
            <img
              :src="article?.phone_img"
              draggable="false"
              alt=""
              class="sticky top-32 hidden aspect-[2/1] w-full rounded-xl object-cover object-center lg:hidden"
            />
          </div>
        </Skeleton>

        <Skeleton
          height="32rem"
          width="100%"
          :show-content="isSuccess"
        >
          <div class="shrink-0 grow basis-2/3 rounded-xl bg-white p-8 shadow-main">
            <div class="mb-4 flex items-center justify-between">
              <h1 class="font-bold uppercase text-orange-200">
                {{ article?.name }}
              </h1>
              <p class="text-sm text-black opacity-50">{{ displayDateStart }} - {{ displayDateEnd }}</p>
            </div>

            <div
              class="promo"
              v-html="article?.text"
            ></div>
          </div>
        </Skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DateTime } from 'luxon'

const route = useRoute()

const id = ref(route.params.id as string)

const {
  data: article,
  isSuccess,
  suspense,
} = usePromo(id, (v) => {
  return v
})

const displayDateStart = computed(() => {
  if (article.value?.start) {
    return DateTime.fromISO(article.value?.start).toFormat('dd.mm.yy')
  }
  return ''
})

const displayDateEnd = computed(() => {
  if (article.value?.end) {
    return DateTime.fromISO(article.value?.end).toFormat('dd.mm.yy')
  }
  return ''
})

onServerPrefetch(async () => {
  await suspense()
})
</script>

<style>
.promo p {
  @apply mb-2;
}
.promo ul li {
  @apply mb-2 ml-8 list-disc marker:text-orange-400;
}
</style>
