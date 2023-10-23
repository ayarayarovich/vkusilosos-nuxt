<template>
  <div class="h-full flex flex-col items-stretch mt-2">
    <div class="grow h-0 relative">
      <div
        class="h-full py-2 overflow-y-auto flex flex-col items-stretch gap-2 scrollbar-hide"
      >
        <div
          v-for="i in 10"
          :key="i"
          class="bg-white p-4 rounded-xl shadow-main flex items-center"
        >
          <IconMapPoint class="h-5" />
          <div class="ml-2">Москва, проспект Строителей 38, эт 2, кв 25</div>
          <button
            class="ml-auto outline-none focus:ring-2 ring-offset-2 ring-orange-200 rounded-full p-1 transition-shadow"
          >
            <IconEditPen class="h-4" />
          </button>
        </div>
      </div>

      <div
        class="absolute top-0 right-0 left-0 h-2 bg-gradient-to-b from-whitegray to-transparent"
      ></div>

      <div
        class="absolute bottom-0 right-0 left-0 h-2 bg-gradient-to-t from-whitegray to-transparent"
      ></div>
    </div>

    <div class="mt-2 flex gap-2">
      <button
        class="flex-1 py-3 px-4 bg-gray rounded-xl font-medium outline-none focus:ring-2 ring-offset-2 ring-gray transition-shadow"
      >
        <span class="text-black opacity-70">Добавить адрес</span>
      </button>
      <SimpleButton class="flex-1 py-3 px-4 font-medium">Выбрать</SimpleButton>
    </div>
  </div>
</template>
