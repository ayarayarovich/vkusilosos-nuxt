<template>
  <div class="relative flex h-full w-full transform flex-col items-stretch overflow-hidden bg-whitegray pt-8">
    <div class="flex grow flex-col items-stretch px-4">
      <strong class="mb-4 text-2xl font-medium">Оформление заказа</strong>

      <div class="flex grow flex-col items-stretch gap-4 self-stretch">
        <div class="rounded-xl bg-current bg-gray p-1.5 text-sm">
          <div class="relative">
            <div
              class="absolute bottom-0 left-0 top-0 w-1/2 rounded-lg bg-white shadow-main transition-transform"
              :class="{
                'translate-x-0': receptionWay === 'delivery',
                'translate-x-full': receptionWay === 'restaurant',
              }"
            ></div>
            <button
              class="hover isolate h-10 w-1/2 rounded-lg"
              disabled
              @click="receptionWay = 'delivery'"
            >
              Доставка
            </button>
            <button
              class="isolate h-10 w-1/2 rounded-lg"
              disabled
              @click="receptionWay = 'restaurant'"
            >
              В ресторане
            </button>
          </div>
        </div>

        <div class="relative h-0 grow">
          <div class="absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 z-10 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
          <div class="h-full overflow-y-auto py-4">
            <Transition>
              <OrderCartDialogDelivery />
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-4 py-8 shadow-main">
      <p class="mb-6 text-lg">Способ оплаты</p>

      <HeadlessRadioGroup v-model="selectedPayType">
        <OrderCartDialogRadioButton
          value="cash"
          label="Наличными"
        >
          <IconBlackWallet />
        </OrderCartDialogRadioButton>
        <div
          class="mb-2 grid grid-cols-1 grid-rows-[0fr] overflow-hidden transition-[grid-template-rows]"
          :class="{
            'grid-rows-[1fr]': selectedPayType === 'cash',
          }"
        >
          <div class="min-h-0">
            <div class="ml-8 py-2">
              <p class="mb-2 text-sm text-black text-opacity-50">С какой суммы подготовить сдачу?</p>
              <div class="flex items-center gap-4">
                <div class="relative w-fit">
                  <input class="w-[15ch] rounded-xl bg-black bg-opacity-10 px-4 py-3 pr-8 text-end outline-none" />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-black text-opacity-50"> ₽ </span>
                </div>
                <label>
                  <input
                    type="checkbox"
                    name="sdacha"
                  />
                  Без сдачи
                </label>
              </div>
            </div>
          </div>
        </div>
        <OrderCartDialogRadioButton
          class="mb-2"
          value="card_when_recieve"
          label="Картой при получении"
        >
          <IconCard />
        </OrderCartDialogRadioButton>
        <OrderCartDialogRadioButton
          v-for="card in cards"
          :key="card.id"
          class="mb-2"
          value="visa"
          :label="card.cart"
        >
          <CreditCardIcon
            :card-number="card.cart"
            class="h-6"
          />
        </OrderCartDialogRadioButton>
      </HeadlessRadioGroup>

      <div class="mt-8 flex w-full gap-4 font-medium">
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
    </div>

    <span class="absolute bottom-2 left-0 right-0 text-center text-sm text-black opacity-50 md:hidden"
      >Свайпай вправо, чтобы закрыть</span
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLocationStore } from '~/store/location'

const emit = defineEmits(['backToCart'])

const selectedPayType = ref()

const locationStore = useLocationStore()
const { receptionWay } = storeToRefs(locationStore)

const { data: cards } = useUser((v) => v.carts)
</script>
