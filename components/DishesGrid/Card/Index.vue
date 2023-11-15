<template>
  <div
    class="relative row-span-1 flex cursor-pointer flex-col items-center rounded-xl p-4 shadow-main transition-all hover:-translate-y-2 hover:shadow-elevated lg:p-7"
    :class="dish.big ? 'col-span-2' : 'col-span-1'"
    @click="showDialog = true"
  >
    <div class="absolute z-20 top-4 right-4 flex flex-col items-end gap-2">
      <div v-for="tag in dish.tags" :key="tag.id" class="px-3 py-1 text-sm rounded-full bg-white font-medium shadow-main flex gap-2">
        <img v-if="tag.img" :src="tag.img" class="h-4" alt="">
        {{ tag.name }}
      </div>
    </div>
    <img
      class="h-28 w-auto object-contain drop-shadow-lg transition-opacity duration-1000 sm:h-36 md:h-40 lg:h-40 xl:h-48"
      :class="isReady ? 'opacity-100' : 'opacity-0'"
      :src="dish.img"
      alt=""
    />
    <h2 class="mb-auto mt-4 text-center text-sm">{{ dish.name }}</h2>
    <div
      class="mt-8 flex justify-between self-stretch"
      :class="dish.big ? 'flex-row items-center gap-8' : 'flex-col items-stretch gap-4'"
    >
      <div class="flex shrink-0 items-center gap-4 text-black">
        <span class="text-sm font-medium !leading-none lg:text-lg"> {{ dish.newPrice }} &#8381; </span>
        <span class="h-4 w-px bg-black"></span>
        <span class="font-base lg:text-md text-xs !leading-none"> {{ dish.weight }} гр </span>
      </div>
      <div
        class="h-9 w-full lg:h-10"
        :class="dish.big ? 'max-w-[16rem]' : ''"
      >
        <DishAdder
          v-if="cartStore.dishesCount[dish.id]"
          class="h-full w-full"
          :value="cartStore.dishesCount[dish.id]"
          @increment="cartStore.addDish(dish)"
          @decrement="cartStore.removeOne(dish.id)"
        />
        <SimpleButton
          v-else
          class="h-full w-full rounded-xl text-[0.7rem] font-medium uppercase text-white lg:text-sm"
          @click="cartStore.addDish(dish)"
        >
          В корзину
        </SimpleButton>
      </div>
    </div>
    <DishesGridCardDialog
      :dish="dish"
      :show="showDialog"
      @close="showDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useImage } from '@vueuse/core'
import type { Dish } from '~/interfaces/dishes'
import { useCartStore } from '~/store/cart'

const props = defineProps<{ dish: Dish }>()
const { dish } = toRefs(props)

const cartStore = useCartStore()

const showDialog = ref(false)

const { isReady } = useImage({
  src: dish.value.img,
})
</script>
