<template>
  <div class="mt-2 flex h-full flex-col items-stretch">
    <div class="relative h-0 grow">
      <div class="scrollbar-hide flex h-full flex-col items-stretch gap-2 overflow-y-auto py-2">
        <div
          v-for="i in 10"
          :key="i"
          class="flex items-center rounded-xl bg-white p-4 shadow-main"
        >
          <IconMapPoint class="h-5" />
          <div class="ml-2 text-left">Москва, проспект Строителей 38, эт 2, кв 25</div>
          <button
            class="ml-auto rounded-full p-1 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
          >
            <IconEditPen class="h-4" />
          </button>
        </div>
      </div>

      <div class="absolute left-0 right-0 top-0 h-2 bg-gradient-to-b from-whitegray to-transparent"></div>

      <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>

    <div class="mt-2 flex gap-2">
      <button
        class="flex-1 rounded-xl bg-gray px-4 py-3 font-medium outline-none ring-gray ring-offset-2 transition-shadow focus:ring-2"
      >
        <span class="text-black opacity-70">Добавить адрес</span>
      </button>
      <SimpleButton class="flex-1 px-4 py-3 font-medium">Выбрать</SimpleButton>
    </div>
  </div>
</template>
