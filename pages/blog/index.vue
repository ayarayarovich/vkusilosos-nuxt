<template>
  <div class="container mx-auto px-4 my-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
      <div v-for="(article, index) in articles" :key="index">
        <img
          :src="article.imgURL"
          alt=""
          class="rounded-xl w-full aspect-square object-cover object-top"
        />
        <div class="bg-white relative rounded-xl -mt-16 w-full p-8 shadow-main">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-orange-200 font-bold uppercase">
              {{ article.title }}
            </h1>
            <p class="text-sm text-black opacity-50">{{ article.date }}</p>
          </div>
          <div class="mb-4">
            {{ article.preview }}
          </div>
          <NuxtLink
            :to="'blog/' + article.id"
            class="font-bold uppercase leading-none flex items-center gap-2"
            >Читать полностью <IconBlogArrowRight class="h-[1em] inline-block"
          /></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function repeat<T>(array: T[], n: number) {
  let newArray: T[] = [];
  for (let i = 0; i < n; i++) {
    newArray = newArray.concat(array);
  }
  return newArray;
}

const articles = ref(
  repeat(
    [
      {
        id: 1,
        imgURL: "/blog-1.png",
        date: "24.07.23",
        title: "DOG - FRIENDLY",
        preview:
          "К нам часто заглядывают гости со своими питомцами. И правильно! Если прогуливаться с собакой, то только до...",
      },
      {
        id: 2,
        imgURL: "/blog-2.png",
        date: "24.07.23",
        title: "Доставка за 45 минут",
        preview:
          "Следи внимательно за местами, где расположены наши суши-бары. Будь на чеку — мы постоянно масштабируемся...",
      },
      {
        id: 3,
        imgURL: "/blog-3.png",
        date: "24.07.23",
        title: "МЫ РАСШИРЯЕМСЯ",
        preview:
          "Уже 1 августа начала свою работу еще одна точка сети суши-баров «ВКУС и ЛОСОСЬ». Ты должен заглянуть к нам...",
      },
    ],
    10,
  ),
);
</script>
