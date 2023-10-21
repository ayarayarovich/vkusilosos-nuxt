<template>
  <div class="flex flex-col items-stretch h-full">
    <div class="flex items-start flex-col mt-10 mx-8 mb-4">
      <h2 class="block text-xl font-medium mb-2">История заказов</h2>
      <h3 class="block text-sm font-medium text-black opacity-50">
        Последние 20 заказов за последние 90 дней
      </h3>
    </div>

    <div class="h-px bg-black opacity-10 mx-4 mb-8"></div>

    <div class="mb-12 mt-4 mx-8 bg-white shadow-main rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <div>Активный заказ</div>
        <div class="text-[#999700] mr-4">Готовится</div>
      </div>
      <div class="flex w-full">
        <div class="grow-[1] shrink-0 basis-0">222</div>
        <div class="grow-[2] shrink-0 basis-0">24.03.2023, 20:08</div>
        <div class="grow-[1] shrink-0 basis-0">5875 &#8381;</div>
        <div class="grow-[1] shrink-0 basis-0">
          <button class="text-orange-200">Посмотреть</button>
        </div>
      </div>
    </div>

    <div class="px-6 pb-6 grow">
      <div class="flex flex-col h-full items-stretch">
        <div class="flex w-full px-4 py-2 mb-2 bg-gray rounded-xl">
          <div class="grow-[1] shrink-0 basis-0">№</div>
          <div class="grow-[2] shrink-0 basis-0">Время заказа</div>
          <div class="grow-[1] shrink-0 basis-0">Сумма</div>
          <div class="grow-[1] shrink-0 basis-0 w-[10ch]">Чек</div>
        </div>

        <div class="flex-auto relative h-0">
          <div
            class="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent"
          ></div>
          <div
            class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"
          ></div>
          <div
            class="h-full py-4 overflow-y-auto scrollbar-hide scroll-smooth flex flex-col items-stretch gap-2"
          >
            <div
              v-for="index in 20"
              :key="index"
              class="bg-white shadow-main rounded-xl px-4 py-2 flex w-full"
            >
              <div class="grow-[1] shrink-0 basis-0">{{ index }}</div>
              <div class="grow-[2] shrink-0 basis-0">24.03.2023, 20:08</div>
              <div class="grow-[1] shrink-0 basis-0">5875 &#8381;</div>
              <div class="grow-[1] shrink-0 basis-0">
                <button class="text-orange-200">Посмотреть</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
