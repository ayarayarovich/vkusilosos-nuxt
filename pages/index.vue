<script setup lang="ts">
import type { MyCoords } from '~/interfaces/common'

const { data: main, suspense: suspenseMain } = useMain((v) => v)
const { data: categories, suspense: suspenseCategories } = useCategories()
const { data: restCoordinates } = useRestaurants((v) => {
  return v.map<MyCoords>((r) => ({
    Lat: r.lat,
    Lng: r.lng,
  }))
})

onServerPrefetch(async () => {
  await suspenseMain()
  await suspenseCategories()
})
</script>

<template>
  <main id="home">
    <!-- для модалок с документами типо офферты и ты -->
    <div class="absolute">
      <NuxtPage />
    </div>

    <div
      v-if="main?.banners.length"
      class="container mx-auto my-4 px-4 lg:my-8"
    >
      <BannerSlider
        autoplay
        :autoplay-delay="3000"
      />
    </div>

    <div
      v-once
      class="container mx-auto my-4 flex flex-col gap-4 px-4 lg:my-8 lg:flex-row lg:gap-8"
    >
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

    <div
      v-if="main?.stories.length"
      class="relative my-4 md:container md:mx-auto md:my-8"
    >
      <GoodStories />
    </div>

    <section
      v-if="main?.recomendation.length"
      class="my-8 lg:my-16"
    >
      <div
        ref="containerEl"
        class="container mx-auto min-h-[10rem] px-4"
      >
        <h1 class="mb-8 text-2xl font-medium uppercase text-black">МЫ РЕКОМЕНДУЕМ</h1>

        <div class="grid grid-flow-row-dense grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          <template
            v-for="dish in main?.recomendation"
            :key="dish.id"
          >
            <DishCard
              :dish="dish"
              :big_card="dish.size === 2"
              :class="{
                'orange-bg': dish.color === 1,
                'blue-bg': dish.color === 2,
                'yellowgreen-bg': dish.color === 3,
                'yellow-bg': dish.color === 4,
              }"
            />
          </template>
        </div>
      </div>
    </section>

    <div class="sticky top-[calc(4rem-0.5px)] z-30 bg-white bg-opacity-30 backdrop-blur-sm lg:top-[calc(5rem-0.5px)]">
      <div class="container mx-auto py-4">
        <CategorySpy />
      </div>
    </div>

    <div v-if="categories">
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>

    <div
      v-once
      class="container mx-auto my-24 hidden px-4 lg:block"
    >
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

    <div
      v-once
      class="container mx-auto mb-24 px-4"
    >
      <h1 class="mb-4 text-xl font-medium">Наши точки</h1>
      <div class="h-96 w-full overflow-hidden rounded-xl">
        <MyYandexMap
          :coordinates="[37.617698, 55.755864]"
          :markers="restCoordinates"
          :zoom="9"
        />
      </div>
    </div>
  </main>
</template>
