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
                'translate-x-0': receptionWay?.type === 'delivery',
                'translate-x-full': receptionWay?.type === 'restaurant',
              }"
            ></div>
            <button
              class="hover isolate h-10 w-1/2 rounded-lg"
              disabled
            >
              Доставка
            </button>
            <button
              class="isolate h-10 w-1/2 rounded-lg"
              disabled
            >
              Самовывоз
            </button>
          </div>
        </div>

        <div class="relative h-0 grow">
          <div class="absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 z-10 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
          <div class="h-full overflow-y-auto py-4">
            <Transition
              name="fade"
              mode="out-in"
            >
              <OrderCartDialogDelivery v-if="receptionWay?.type === 'delivery'" />
              <OrderCartDialogDelivery v-else-if="receptionWay?.type === 'restaurant'" />
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-4 py-8 shadow-main">
      <p class="mb-6 text-lg">Способ оплаты</p>

      <HeadlessRadioGroup v-model="selectedPayType">
        <OrderCartDialogRadioButton
          :value="-2"
          label="Наличными"
        >
          <IconBlackWallet />
        </OrderCartDialogRadioButton>
        <div
          class="mb-2 grid grid-cols-1 grid-rows-[0fr] overflow-hidden transition-[grid-template-rows]"
          :class="{
            'grid-rows-[1fr]': selectedPayType === -2,
          }"
        >
          <div class="min-h-0">
            <div class="ml-8 py-2">
              <p class="mb-2 text-sm text-black text-opacity-50">С какой суммы подготовить сдачу?</p>
              <div class="flex items-center gap-4">
                <div
                  class="relative w-fit transition-opacity"
                  :class="{
                    'opacity-50': noCashback,
                  }"
                >
                  <input
                    v-model="cashback"
                    type="number"
                    class="w-[15ch] rounded-xl border border-transparent bg-black bg-opacity-10 px-4 py-3 pr-8 text-end outline-none transition-colors"
                    :class="{
                      '!border-red': !!cashbackError,
                    }"
                    :disabled="noCashback"
                  />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 select-none text-black text-opacity-50">
                    ₽
                  </span>
                </div>
                <label class="flex items-center gap-2">
                  <InputCheckbox name="no_cashback" />
                  <span class="cursor-pointer select-none"> Без сдачи </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <OrderCartDialogRadioButton
          class="mb-2"
          :value="-1"
          label="Картой при получении"
        >
          <IconCard />
        </OrderCartDialogRadioButton>
        <OrderCartDialogRadioButton
          class="mb-2"
          :value="0"
          label="Картой на сайте"
        >
          <IconCard />
        </OrderCartDialogRadioButton>
        <OrderCartDialogRadioButton
          v-for="card in cards"
          :key="card.id"
          class="mb-2"
          :value="card.id"
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
          type="button"
          @click="emit('backToCart')"
        >
          Назад в корзину
        </button>
        <SimpleButton
          class="grow px-4 py-4 text-xs uppercase"
          type="submit"
        >
          Оформить заказ на {{ basket?.total_price }} &#8381;
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
const emit = defineEmits(['backToCart'])

const { data: receptionWay } = useCurrentReceptionWay()

const { data: cards } = useUser((v) => v.carts)

const { data: basket } = useBasket((v) => v)

const noCashback = useFieldValue<boolean | undefined>('no_cashback')

const { value: selectedPayType } = useField<number | undefined>('cart_id')
const { value: cashback, errorMessage: cashbackError } = useField<number | undefined>('cashback')
</script>
