<template>
  <div
    class="h-full flex flex-col items-stretch justify-end w-full"
    @click.stop="emit('close')"
  >
    <div class="bg-white rounded-t-xl" @click.stop="">
      <div
        ref="draggingArea"
        class="flex pt-2 pb-4 items-center justify-center"
      >
        <div class="mx-auto bg-gray h-1 w-8 rounded-full"></div>
      </div>

      <div class="flex items-center px-4 pb-4 text-lg font-medium gap-2">
        <IconUserDark class="h-8" />
        <span>+7 (864) 974 - 83 -44</span>
      </div>
      <div class="bg-gray h-px mx-4"></div>

      <div class="mx-4 my-8 flex flex-col items-stretch gap-4">
        <button
          class="font-medium text-black text-lg text-start"
          @click="emit('change-view', 'orders-history')"
        >
          История заказов
        </button>

        <button
          class="font-medium text-black flex items-center gap-2 text-lg text-start"
          @click="emit('change-view', 'info')"
        >
          Данные
          <div class="inline-block h-2 aspect-square rounded-full bg-red"></div>
        </button>

        <button
          class="font-medium text-black text-lg text-start"
          @click="emit('change-view', 'addresses')"
        >
          Адреса
        </button>

        <button
          class="font-medium text-black text-lg text-start"
          @click="emit('change-view', 'bonus')"
        >
          Бонусная система
        </button>
      </div>

      <div class="mt-16">
        <div class="bg-gray h-px mx-4"></div>
        <button
          class="py-6 px-6 w-full text-start transition-colors hover:bg-white"
          @click="isAuthenticated = false"
        >
          Выйти <IconExit class="h-6 inline-block" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";
const emit = defineEmits(["close", "change-view"]);

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);

const draggingArea = ref();

useSwipe(draggingArea, {
  onSwipeEnd(e, direction) {
    if (direction === "down") {
      emit("close");
    }
  },
});
</script>
