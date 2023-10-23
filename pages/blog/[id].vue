<template>
  <div class="py-16 h-full flex items-center justify-center">
    <div class="flex items-stretch gap-8">
      <div class="">
        <img
          :src="currentArticle?.imgURL"
          alt=""
          class="h-[32rem] aspect-[3/4] object-cover object-center rounded-xl"
        />
      </div>
      <div class="bg-white shadow-main p-8 rounded-xl w-[42rem]">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-orange-200 font-bold uppercase">
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
</template>

<script setup lang="ts">
const articles = ref([
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
]);

const route = useRoute();

const currentArticle = computed(() =>
  articles.value.find((el) => el.id === Number(route.params.id)),
);
</script>
