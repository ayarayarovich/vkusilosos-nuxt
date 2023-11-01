<template>
  <div class="container mx-auto flex h-full flex-col items-stretch px-4">
    <div class="my-6 flex items-center gap-2 leading-none">
      <RouterLink to="/">Главная</RouterLink>
      <span>/</span>
      <RouterLink to="/blog">Блог</RouterLink>
      <span>/</span>
      <RouterLink :to="`/blog/${currentArticle?.id}`">{{ currentArticle?.title }}</RouterLink>
    </div>
    <div class="flex grow items-center justify-center">
      <div class="flex items-stretch gap-8 py-12">
        <div class="">
          <img
            :src="currentArticle?.imgURL"
            alt=""
            class="aspect-[3/4] h-[32rem] rounded-xl object-cover object-center"
          />
        </div>
        <div class="w-[42rem] rounded-xl bg-white p-8 shadow-main">
          <div class="mb-4 flex items-center justify-between">
            <h1 class="font-bold uppercase text-orange-200">
              {{ currentArticle?.title }}
            </h1>
            <p class="text-sm text-black opacity-50">
              {{ currentArticle?.date }}
            </p>
          </div>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
          <p>theas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const articles = ref([
  {
    id: 1,
    imgURL: '/blog-1.png',
    date: '24.07.23',
    title: 'DOG - FRIENDLY',
    preview:
      'К нам часто заглядывают гости со своими питомцами. И правильно! Если прогуливаться с собакой, то только до...',
  },
  {
    id: 2,
    imgURL: '/blog-2.png',
    date: '24.07.23',
    title: 'Доставка за 45 минут',
    preview:
      'Следи внимательно за местами, где расположены наши суши-бары. Будь на чеку — мы постоянно масштабируемся...',
  },
  {
    id: 3,
    imgURL: '/blog-3.png',
    date: '24.07.23',
    title: 'МЫ РАСШИРЯЕМСЯ',
    preview:
      'Уже 1 августа начала свою работу еще одна точка сети суши-баров «ВКУС и ЛОСОСЬ». Ты должен заглянуть к нам...',
  },
])

const route = useRoute()

const currentArticle = computed(() => articles.value.find((el) => el.id === Number(route.params.id)))
</script>
