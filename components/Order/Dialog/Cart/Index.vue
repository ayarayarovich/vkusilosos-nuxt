<template>
  <div class="relative h-full w-full">
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="basket && basket.total > 0"
        class="relative flex h-full w-full transform flex-col items-start overflow-y-auto bg-white py-8"
      >
        <strong class="px-4 text-2xl font-medium">
          {{ basket?.total || 0 }} {{ pluralizedItemsInCartCountWord }} на
          <AnimatedNumber :number="basket?.total_price || 0" /> &#8381;
        </strong>

        <p class="mt-2 px-4 opacity-50">{{ displayDeliveryCost }}</p>
        <div class="relative my-4 flex w-full grow flex-col items-stretch py-4">
          <ul class="px-4">
            <li
              v-for="position in basket?.list"
              :key="position.id"
              class="my-2 flex w-full gap-2 rounded-xl bg-white p-4 shadow-main"
            >
              <img
                class="h-full w-24 self-center object-contain object-center lg:h-24 lg:w-36"
                :src="position.img"
                alt=""
              />
              <div class="flex grow flex-col items-stretch justify-between self-stretch">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-black">{{ position.name }}</p>
                    <p class="text-sm text-black opacity-50">{{ position.weight }} гр</p>
                  </div>
                  <button
                    type="button"
                    @click="removeAll(position)"
                  >
                    <IconClose class="h-6" />
                  </button>
                </div>
                <div class="flex items-end justify-between">
                  <p class="mt-auto text-lg text-black">{{ position.price }} &#8381;</p>
                  <div>
                    <DishAdder
                      class="h-8 w-28 md:w-32"
                      hide-button
                      :dish-id="position.dish_id"
                      :dish-name="position.name"
                      :can-deliver="true"
                    />
                  </div>
                </div>
              </div>
            </li>

            <li
              v-if="matchedPromo"
              class="my-2 flex w-full gap-2 rounded-xl bg-white p-4 shadow-main"
            >
              <img
                class="h-full w-24 self-center object-contain object-center lg:h-24 lg:w-36"
                :src="matchedPromo.gift.img"
                alt=""
              />
              <div class="flex grow flex-col items-stretch justify-between self-stretch">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-black">{{ matchedPromo.gift.name }}</p>
                    <p class="text-sm text-black opacity-50">{{ matchedPromo.gift.weight }} гр</p>
                  </div>
                </div>
                <div class="flex items-end justify-end">
                  <span class="font-medium text-orange-200">Подарок к заказу</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="my-8 w-full px-4">
          <div class="flex w-full items-center justify-between rounded-lg p-4 shadow-elevated">
            <span>Укажите количество персон</span>
            <div class="h-8 w-28 md:w-32">
              <InputNumberAdder
                name="guests_count"
                :min="1"
                :max="99"
              />
            </div>
          </div>
        </div>

        <div
          v-if="filteredAdditions && filteredAdditions.length > 0"
          class="mb-8 w-full"
        >
          <p class="my-2 px-4 text-lg">Добавить к заказу?</p>

          <div class="relative w-full">
            <div class="absolute bottom-0 left-0 top-0 w-4 bg-gradient-to-r from-whitegray to-transparent"></div>
            <div class="absolute bottom-0 right-0 top-0 w-4 bg-gradient-to-l from-whitegray to-transparent"></div>
            <div class="flex items-stretch gap-4 overflow-y-auto px-4 py-4">
              <OrderDialogAddition
                v-for="add in filteredAdditions"
                :key="add.id"
                v-bind="add"
              />
            </div>
          </div>
        </div>

        <div class="w-full px-4 pt-4 font-medium shadow-main">
          <OrderDialogInputPromocode
            name="promo"
            class="mb-4"
            placeholder="Промокод"
          />

          <label class="mb-8 flex items-center justify-between gap-4">
            <div>
              <div>Вкусоины</div>
              <div class="text-sm font-normal text-black/50">У вас {{ user?.bonuses || 0 }} бонусов - спишем всё</div>
            </div>
            <InputSwitch name="use_coins" />
          </label>

          <div class="flex items-center justify-between">
            <span>{{ basket?.total }} {{ pluralizedItemsInCartCountWord }}</span>
            <span><AnimatedNumber :number="basket?.total_price || 0" /> &#8381;</span>
          </div>

          <div class="flex items-center justify-between">
            <span>Начислим вкусоины</span>
            <span>+ {{ bonusesToGet }}</span>
          </div>

          <SimpleButton
            :disabled="basket?.total == 0"
            class="mt-8 w-full px-4 py-4 text-xs uppercase"
            type="button"
            @click="emit('proccedToPayment')"
          >
            Перейти к оформлению <IconArrowRight class="inline h-4" />
          </SimpleButton>
        </div>
      </div>

      <div
        v-else
        class="flex h-full items-center justify-center"
      >
        <div
          class="relative flex max-w-xs flex-col items-center rounded-xl bg-blue-100 px-1 pb-20 pt-12 text-center lg:max-w-sm lg:pb-24"
        >
          <img
            class="h-12 lg:h-14"
            src="/fish.svg"
            alt=""
          />
          <strong class="mt-2 text-base font-bold uppercase lg:text-xl"> ой, кажется, Корзина пуста </strong>
          <p class="mt-4 text-sm">Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар</p>
          <p class="mt-2 text-sm">Мы доставим ваш заказ от {{ main?.from_deliver }} ₽</p>

          <img
            src="/upset-cup.svg"
            class="absolute top-0 h-24 -translate-y-3/4 transition-opacity lg:h-32"
            :class="isCupReady ? 'opacity-100' : 'opacity-0'"
            alt=""
          />

          <img
            src="/upset-sushi.svg"
            class="absolute bottom-0 h-32 max-w-none translate-y-1/2 transition-opacity lg:h-40"
            :class="isSushiReady ? 'opacity-100' : 'opacity-0'"
            alt=""
          />
        </div>
      </div>
    </Transition>

    <span class="absolute bottom-2 left-0 right-0 text-center text-sm text-black opacity-50 md:hidden">
      Свайпай вправо, чтобы закрыть
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useImage } from '@vueuse/core'
import AnimatedNumber from '~/components/AnimatedNumber.vue'
import type { DishInBasket } from '~/interfaces/main'

const emit = defineEmits(['proccedToPayment'])

const { data: user } = useUser((v) => v)
const { data: basket } = useBasket((v) => v)
const { data: main } = useMain((v) => v)
const { data: additions } = useAdditions((v) => v)
const bonusesToGet = computed(() => {
  if (main.value?.percent_order && basket.value) {
    return Math.floor((basket.value.total_price * main.value.percent_order) / 100)
  }
  return 0
})

const matchedPromo = computed(() => {
  if (main.value?.promo) {
    const promo = main.value.promo

    if (promo.promo === 'sum' && basket.value?.total_price && basket.value?.total_price >= promo.sum) {
      return promo
    }
    if (
      promo.promo === 'dish' &&
      basket.value?.list.find((v) => v.dish_id === promo.dish.id && v.count >= promo.count)
    ) {
      return promo
    }
  }
  return undefined
})

const filteredAdditions = computed(() => {
  if (basket.value && additions.value) {
    return additions.value.filter((a) => basket.value.list.find((b) => b.dish_id === a.id) === undefined)
  }

  return additions.value
})

const pluralizedItemsInCartCountWord = computed(() => {
  if (basket.value?.total === 1) return 'товар'
  if (basket.value?.total === 2) return 'товара'
  if (basket.value?.total === 3) return 'товара'
  if (basket.value?.total === 4) return 'товара'
  return 'товаров'
})

const displayDeliveryCost = computed(() => {
  if (main.value && basket.value) {
    if (basket.value.total_price > main.value.from_deliver) {
      return 'Бесплатная доставка'
    } else {
      return `Стоимость доставки ${main.value.deliver_price} ₽`
    }
  }
  return 'Нет данных'
})

const { mutate } = useAddToBasket()

const removeAll = (position: DishInBasket) => {
  mutate({
    id: position.id,
    count: 0,
    dish_id: position.dish_id,
    dish_name: position.name,
  })
}

const { isReady: isCupReady } = useImage({ src: '/upset-cup.svg' })
const { isReady: isSushiReady } = useImage({ src: '/upset-sushi.svg' })
</script>
