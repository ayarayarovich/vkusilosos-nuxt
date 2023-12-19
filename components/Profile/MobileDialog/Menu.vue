<template>
  <div
    class="fixed bottom-0 w-full rounded-t-xl bg-white"
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
      <span>{{ formatPhone(user?.phone || '') }}</span>
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

      <button
        class="text-start text-lg font-medium text-black"
        @click="emit('change-view', 'notifications')"
      >
        Уведомления
      </button>
    </div>

    <div class="mt-16">
      <div class="mx-4 h-px bg-gray"></div>
      <button
        class="w-full px-6 py-6 text-start transition-colors hover:bg-white"
        @click="signOut()"
      >
        Выйти <IconExit class="inline-block h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileDialogStore } from '~/store/profileDialog'
import { useUserStore } from '~/store/user'
import { formatPhone } from '~/utils'

const emit = defineEmits(['close', 'change-view'])

const userStore = useUserStore()
const profileDialogStore = useProfileDialogStore()

const { data: user } = useUser((v) => v)

const signOut = () => {
  profileDialogStore.close()
  userStore.signOut()
}

const draggingArea = ref()

useSwipe(draggingArea, {
  onSwipeEnd(_, direction) {
    if (direction === 'down') {
      profileDialogStore.close()
    }
  },
})
</script>
