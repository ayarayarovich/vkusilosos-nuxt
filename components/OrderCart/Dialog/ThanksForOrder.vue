<template>
  <div class="flex h-full items-center justify-center">
    <div
      class="relative flex max-w-xs flex-col items-center rounded-xl bg-blue-100 px-1 pb-20 pt-12 text-center lg:max-w-sm lg:pb-24"
    >
      <img
        class="h-12 lg:h-14"
        src="/fish.svg"
        alt=""
      />
      <strong class="mt-2 text-base font-bold uppercase lg:text-xl">спасибо за заказ</strong>
      <p class="mt-4 text-sm">Отследить статус заказа можно в личном кабинете, откройте “История заказов”</p>
      <p class="mt-2 text-sm">Приятного аппетита!</p>

      <img
        src="/happy-cup.svg"
        class="absolute top-0 h-24 -translate-y-3/4 transition-opacity lg:h-32"
        :class="isCupReady ? 'opacity-100' : 'opacity-0'"
        alt=""
      />

      <img
        src="/happy-sushi.svg"
        class="absolute bottom-0 h-32 max-w-none translate-y-1/2 transition-opacity lg:h-40"
        :class="isSushiReady ? 'opacity-100' : 'opacity-0'"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'

const { isReady: isCupReady } = useImage({ src: '/upset-cup.svg' })
const { isReady: isSushiReady } = useImage({ src: '/upset-sushi.svg' })
</script>
