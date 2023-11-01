<template>
  <div class="relative flex h-full w-full transform flex-col items-start overflow-hidden bg-white py-8">
    <strong class="mb-4 px-4 text-2xl font-medium">Оформление заказа</strong>

    <div class="grow self-stretch px-4">
      <div class="rounded-xl bg-current bg-gray p-1.5 text-sm">
        <div class="relative">
          <div
            class="absolute bottom-0 left-0 top-0 w-1/2 rounded-lg bg-white shadow-main transition-transform"
            :class="{
              'translate-x-0': reciptionWay == 'delivery',
              'translate-x-full': reciptionWay == 'restaurant',
            }"
          ></div>
          <button
            class="hover isolate h-10 w-1/2 rounded-lg"
            @click="reciptionWay = 'delivery'"
          >
            Доставка
          </button>
          <button
            class="isolate h-10 w-1/2 rounded-lg"
            @click="reciptionWay = 'restaurant'"
          >
            В ресторане
          </button>
        </div>
      </div>
    </div>

    <div class="flex w-full gap-4 px-4 pt-8 font-medium shadow-main">
      <button
        class="flex grow items-center justify-center rounded-xl bg-gray px-2 py-4 text-xs uppercase leading-none"
        @click="emit('backToCart')"
      >
        Назад в корзину
      </button>
      <SimpleButton class="grow px-4 py-4 text-xs uppercase">
        Оформить заказ на {{ totalCost }} &#8381;
        <IconArrowRight class="inline h-4" />
      </SimpleButton>
    </div>

    <span class="absolute bottom-2 left-0 right-0 text-center text-sm text-black opacity-50 md:hidden"
      >Свайпай вправо, чтобы закрыть</span
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/store/cart'
import { usePaymentStore } from '~/store/payment'

const emit = defineEmits(['backToCart'])

const paymentStore = usePaymentStore()
const cartStore = useCartStore()
const { reciptionWay } = storeToRefs(paymentStore)
const { totalCost } = storeToRefs(cartStore)
</script>
