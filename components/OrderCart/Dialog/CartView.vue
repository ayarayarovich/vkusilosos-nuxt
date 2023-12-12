<template>
  <div class="relative h-full w-full">
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="basket && basket.total > 0"
        class="relative flex h-full w-full transform flex-col items-start overflow-hidden bg-white py-8"
      >
        <strong class="px-4 text-2xl font-medium">
          {{ basket?.total || 0 }} {{ pluralizedItemsInCartCountWord }} на
          <AnimatedNumber :number="basket?.total_price || 0" /> &#8381;
        </strong>

        <p class="mt-2 px-4 opacity-50">Бесплатная доставка</p>
        <div class="relative my-4 flex w-full grow flex-col items-stretch py-4">
          <div
            class="absolute left-0 right-0 top-0 z-50 h-4 bg-gradient-to-t from-[rgba(253,253,253,0)] to-[rgba(253,253,253,1)]"
          ></div>
          <div
            class="absolute bottom-[-1px] left-0 right-0 z-50 h-4 bg-gradient-to-b from-[rgba(253,253,253,0)] to-[rgba(253,253,253,1)]"
          ></div>
          <ul class="absolute inset-0 overflow-y-auto px-4">
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
                  <button @click="removeAll(position)">
                    <IconClose class="h-6" />
                  </button>
                </div>
                <div class="flex items-end justify-between">
                  <p class="mt-auto text-lg text-black">{{ position.price }} &#8381;</p>
                  <div>
                    <DishAdder
                      class="h-8 w-28 md:w-32"
                      :dish-id="position.dish_id"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="w-full px-4 pt-8 font-medium shadow-main">
          <div class="flex items-center justify-between">
            <span>{{ basket?.total }} {{ pluralizedItemsInCartCountWord }}</span>
            <span><AnimatedNumber :number="basket?.total_price || 0" /> &#8381;</span>
          </div>

          <div class="flex items-center justify-between">
            <span>Начислим вкусоины</span>
            <span>+ 62</span>
          </div>

          <SimpleButton
            :disabled="basket?.total == 0"
            class="mt-8 w-full px-4 py-4 text-xs uppercase"
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
          <p class="mt-2 text-sm">Мы доставим ваш заказ от 699 ₽</p>

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

    <span class="absolute bottom-2 left-0 right-0 text-center text-sm text-black opacity-50 md:hidden"
      >Свайпай вправо, чтобы закрыть</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useImage } from '@vueuse/core'
import AnimatedNumber from '~/components/AnimatedNumber.vue'
import type { DishInBasket } from '~/interfaces/main'

const emit = defineEmits(['proccedToPayment'])

const { data: basket } = useBasket((v) => v)

const pluralizedItemsInCartCountWord = computed(() => {
  if (basket.value?.total === 1) return 'товар'
  if (basket.value?.total === 2) return 'товара'
  if (basket.value?.total === 3) return 'товара'
  if (basket.value?.total === 4) return 'товара'
  return 'товаров'
})

const { mutate } = useAddToBasket()

const removeAll = (position: DishInBasket) => {
  mutate({
    id: position.id,
    count: 0,
    dish_id: position.dish_id,
  })
}

const { isReady: isCupReady } = useImage({ src: '/upset-cup.svg' })
const { isReady: isSushiReady } = useImage({ src: '/upset-sushi.svg' })
</script>
