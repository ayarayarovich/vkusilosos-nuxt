<template>
  <div
    class="flex h-full w-full flex-col items-stretch justify-end"
    @click.stop="emit('close')"
  >
    <div
      class="rounded-t-xl bg-white"
      @click.stop=""
    >
      <div
        ref="draggingArea"
        class="flex items-center justify-center pb-4 pt-2"
      >
        <div class="mx-auto h-1 w-8 rounded-full bg-gray"></div>
      </div>

      <div class="flex items-center gap-2 px-4 pb-4 text-lg font-medium">
        <IconUserDark class="h-8" />
        <span>+7 (864) 974 - 83 -44</span>
      </div>
      <div class="mx-4 h-px bg-gray"></div>

      <div class="mx-4 my-8 flex flex-col items-stretch gap-4">
        <button
          class="text-start text-lg font-medium text-black"
          @click="emit('change-view', 'orders-history')"
        >
          История заказов
        </button>

        <button
          class="flex items-center gap-2 text-start text-lg font-medium text-black"
          @click="emit('change-view', 'info')"
        >
          Данные
          <div class="inline-block aspect-square h-2 rounded-full bg-red"></div>
        </button>

        <button
          class="text-start text-lg font-medium text-black"
          @click="emit('change-view', 'addresses')"
        >
          Адреса
        </button>

        <button
          class="text-start text-lg font-medium text-black"
          @click="emit('change-view', 'bonus')"
        >
          Бонусная система
        </button>
      </div>

      <div class="mt-16">
        <div class="mx-4 h-px bg-gray"></div>
        <button
          class="w-full px-6 py-6 text-start transition-colors hover:bg-white"
          @click="isAuthenticated = false"
        >
          Выйти <IconExit class="inline-block h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/store/user'
const emit = defineEmits(['close', 'change-view'])

const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)

const draggingArea = ref()

useSwipe(draggingArea, {
  onSwipeEnd(_, direction) {
    if (direction === 'down') {
      emit('close')
    }
  },
})
</script>
