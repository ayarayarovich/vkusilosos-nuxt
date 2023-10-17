<script setup lang="ts">
import type { Category } from '~/interfaces/dishes'
import { useCategoryStore } from '~/store/category'
import { storeToRefs } from 'pinia'
import ky from 'ky'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

useFetch<Category[]>('https://api.losos.ayarayarovich.tech/api/categories', {key: 'categories'}).then((res) => categories.value = res.data.value)

// useAsyncData<Category[]>('categories', () => ky.get('https://api.losos.ayarayarovich.tech/api/categories').json()).then(data => {
//     categories.value = data.data.value
// })


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

        <div
            class="scrollbar-hide my-4 flex flex-nowrap gap-8 overflow-x-scroll p-2 px-4 lg:container lg:mx-auto lg:my-8"
        >
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
            <StoriesItem class="shrink-0" />
        </div>

        <div class="sticky top-16 z-50 bg-white bg-opacity-30 backdrop-blur-sm lg:top-20">
            <div class="container mx-auto">
                <CategorySpy/>
            </div>
        </div>

        <div v-if="categories">
            <DishCategory
                v-for="(category, index) in categories"
                :immediate="index < 3"
                :key="category.id"
                :category="category"
            />
        </div>
    </main>
</template>
