<template>
  <button
    class="flex min-w-48 gap-4 rounded-xl border-2 border-transparent bg-white p-4 shadow-elevated outline-none transition-colors hover:border-orange-100 focus:border-orange-200 disabled:opacity-50"
    :disabled="isPending"
    @click="addToBasket"
  >
    <img
      class="aspect-[4/3] h-12 object-cover object-center"
      :src="props.img"
      alt=""
    />
    <div class="flex h-full flex-col items-start justify-between">
      <p class="text-base">{{ props.name }}</p>
      <p class="text-base">{{ props.price }} ₽</p>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Addition } from '~/composables/api/dishes'

const props = defineProps<Addition>()

const { mutate, isPending } = useAddToBasket()

const addToBasket = () => {
  mutate({
    count: 1,
    dish_id: props.id,
  })
}
</script>
