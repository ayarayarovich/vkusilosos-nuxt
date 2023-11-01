<template>
  <div class="flex h-full flex-col items-stretch">
    <div class="mx-8 mb-4 mt-10 flex flex-col items-start">
      <button
        class="flex items-center gap-2"
        @click="emit('go-back')"
      >
        <IconArrowRight class="h-8 rotate-180 invert md:hidden" />
        <h2 class="block text-xl font-medium leading-none">История заказов</h2>
      </button>
      <h3 class="ml-10 block text-sm font-medium text-black opacity-50 md:ml-0">
        Последние 20 заказов за последние 90 дней
        <input
          v-model="isEmpty"
          type="checkbox"
        />
      </h3>
    </div>

    <div class="mx-4 h-px bg-black opacity-10"></div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="isEmpty"
        class="flex h-0 grow items-center justify-center p-8"
      >
        <div>
          <img
            src="~/assets/samoe-vremya-zakazat.svg"
            alt=""
            class="mb-6 h-48 w-full object-contain object-center"
          />
          <strong class="mb-2 block text-center text-2xl font-medium">
            Самое время заказать <br />
            что-то вкусное
          </strong>
          <p class="mb-8 text-center">Укажите адрес доставки на карте и выберете ресторан</p>
          <SimpleButton class="w-full px-8 py-4 font-medium uppercase"> Выбрать ресторан </SimpleButton>
        </div>
      </div>

      <div
        v-else
        class="mt-8 flex h-0 grow flex-col items-stretch gap-8 text-xs md:mt-16 md:gap-16 md:text-base"
      >
        <div class="mx-8 rounded-xl bg-white p-4 shadow-main">
          <div class="mb-4 flex items-center justify-between">
            <div>Активный заказ</div>
            <div class="text-[#999700] md:mr-4">Готовится</div>
          </div>
          <div class="flex w-full">
            <div class="shrink-0 grow-[1] basis-0">222</div>
            <div class="shrink-0 grow-[2] basis-0">24.03.2023, 20:08</div>
            <div class="shrink-0 grow-[1] basis-0">5875 &#8381;</div>
            <div class="shrink-0 grow-[1] basis-0">
              <ProfileDialogOrdersHistoryReceipt :order-id="222" />
            </div>
          </div>
        </div>

        <div class="grow px-6 pb-6">
          <div class="flex h-full flex-col items-stretch">
            <div class="mb-2 flex w-full rounded-xl bg-gray px-4 py-2">
              <div class="shrink-0 grow-[1] basis-0">№</div>
              <div class="shrink-0 grow-[2] basis-0">Время заказа</div>
              <div class="shrink-0 grow-[1] basis-0">Сумма</div>
              <div class="w-[10ch] shrink-0 grow-[1] basis-0">Чек</div>
            </div>

            <div class="relative h-0 flex-auto">
              <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-white to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
              <div class="scrollbar-hide flex h-full flex-col items-stretch gap-2 overflow-y-auto scroll-smooth py-4">
                <div
                  v-for="index in 20"
                  :key="index"
                  class="flex w-full rounded-xl bg-white px-4 py-2 shadow-main"
                >
                  <div class="shrink-0 grow-[1] basis-0">{{ index }}</div>
                  <div class="shrink-0 grow-[2] basis-0">24.03.2023, 20:08</div>
                  <div class="shrink-0 grow-[1] basis-0">5875 &#8381;</div>
                  <div class="shrink-0 grow-[1] basis-0">
                    <ProfileDialogOrdersHistoryReceipt :order-id="index" />
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
const emit = defineEmits(['go-back'])
const isEmpty = ref(false)
</script>
