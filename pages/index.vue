<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Category } from '~/interfaces/dishes'
import { useCategoryStore } from '~/store/category'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

// const publicAxios = usePublicAxios()
// useAsyncData(async () => {
//   const response = await publicAxios.get('api/categories')
//   return response.data
// }).then((res) => {
//   categories.value = res.data.value
// })

usePublicAxios(`categories`, async (axios) => {
  const response = await axios.get('api/categories')
  return response.data
}).then((res) => {
  categories.value = res.data.value
})
</script>

<template>
  <main id="home">
    <div class="container mx-auto my-4 px-4 lg:my-8">
      <BannerSlider
        autoplay
        :autoplay-delay="3000"
      />
    </div>

    <div class="container mx-auto my-4 flex flex-col gap-4 px-4 lg:my-8 lg:flex-row lg:gap-8">
      <div class="flex flex-1 items-center justify-center rounded-3xl bg-white px-10 py-7 shadow-main">
        <IconWallet class="mr-4 inline h-10" />Оплата любым удобным способом
      </div>
      <div class="flex flex-1 items-center justify-center rounded-3xl bg-white px-10 py-7 shadow-main">
        <IconBadge class="mr-4 inline h-10" />Ежедневные акции и подарки
      </div>
      <div class="flex flex-1 items-center justify-center rounded-3xl bg-white px-10 py-7 shadow-main">
        <IconToc class="mr-4 inline h-10" />Профессиональные сушисты
      </div>
    </div>

    <div class="relative my-4 md:container md:mx-auto md:my-8">
      <Stories />
    </div>

    <div class="sticky top-16 z-50 bg-white bg-opacity-30 backdrop-blur-sm lg:top-20">
      <div class="container mx-auto">
        <CategorySpy />
      </div>
    </div>

    <div v-if="categories">
      <Category
        v-for="(category, index) in categories"
        :key="category.id"
        :immediate="index < 3"
        :category="category"
      />
    </div>

    <div class="container mx-auto my-24 hidden px-4 lg:block">
      <div class="relative w-full rounded-xl bg-white px-24 py-24 shadow-main">
        <img
          class="pointer-events-none absolute left-0 top-0 h-full w-full select-none rounded-xl"
          :draggable="false"
          src="~/assets/app-decoration.svg"
          alt=""
        />
        <div class="relative">
          <h1 class="mb-4 text-4xl font-bold">
            Скачайте приложение <br />
            на телефон ❤️
          </h1>
          <p class="mb-4 text-sm text-black opacity-50">С приложением делать заказы проще!</p>
          <div class="h-12">
            <a
              class="mr-2 inline-block h-full"
              href="https://google.com"
              target="_blank"
            >
              <img
                src="~/assets/googleplay.png"
                class="h-full"
                alt=""
              />
            </a>
            <a
              class="inline-block h-full"
              href="https://www.apple.com/app-store/"
              target="_blank"
            >
              <img
                src="~/assets/appstore.png"
                class="h-full"
                alt=""
              />
            </a>
          </div>
          <div
            v-motion-slide-visible-once-bottom
            class="absolute -bottom-20 right-28 h-96"
            :delay="200"
          >
            <img
              src="/app-1.png"
              class="h-full w-auto"
              alt=""
            />
          </div>
          <div
            v-motion-slide-visible-once-bottom
            class="absolute -bottom-12 right-0 h-96"
          >
            <img
              src="/app-2.png"
              class="h-full w-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto mb-24 px-4">
      <h1 class="mb-4 text-xl font-medium">Наши точки</h1>
      <ClientOnly>
        <YandexMap
          :coordinates="[55.755864, 37.617698]"
          :zoom="13"
          class="h-96 w-full overflow-hidden rounded-xl"
        >
          <YandexMarker
            :coordinates="[45.019627, 39.031206]"
            :marker-id="1"
          />
        </YandexMap>
      </ClientOnly>
    </div>
  </main>
</template>
