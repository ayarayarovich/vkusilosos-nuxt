<template>
  <div class="flex flex-col items-stretch h-full">
    <div class="flex items-start flex-col mt-10 mx-8 mb-4">
      <button class="flex items-center gap-2" @click="emit('go-back')">
        <IconArrowRight class="h-8 md:hidden invert rotate-180" />
        <h2 class="block text-xl font-medium leading-none">История заказов</h2>
      </button>
      <h3 class="block ml-10 md:ml-0 text-sm font-medium text-black opacity-50">
        Последние 20 заказов за последние 90 дней
        <input v-model="isEmpty" type="checkbox" />
      </h3>
    </div>

    <div class="h-px bg-black opacity-10 mx-4"></div>

    <Transition name="fade" mode="out-in">
      <div v-if="isEmpty" class="grow h-0 p-8 flex items-center justify-center">
        <div>
          <img
            src="~/assets/samoe-vremya-zakazat.svg"
            alt=""
            class="h-48 w-full object-contain object-center mb-6"
          />
          <strong class="font-medium text-2xl block text-center mb-2">
            Самое время заказать <br />
            что-то вкусное
          </strong>
          <p class="text-center mb-8">
            Укажите адрес доставки на карте и выберете ресторан
          </p>
          <SimpleButton class="uppercase font-medium py-4 px-8 w-full">
            Выбрать ресторан
          </SimpleButton>
        </div>
      </div>

      <div
        v-else
        class="grow h-0 flex flex-col items-stretch text-xs md:text-base gap-8 md:gap-16 mt-8 md:mt-16"
      >
        <div class="mx-8 bg-white shadow-main rounded-xl p-4">
          <div class="flex items-center justify-between mb-4">
            <div>Активный заказ</div>
            <div class="text-[#999700] md:mr-4">Готовится</div>
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
    </Transition>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["go-back"]);
const isEmpty = ref(false);
</script>
