<template>
  <div class="relative h-full w-full">
    <Transition name="fade" mode="out-in">
      <div
        v-if="itemsCount > 0"
        class="relative flex h-full w-full transform flex-col items-start overflow-hidden bg-white py-8"
      >
        <strong class="px-4 text-2xl font-medium"
          >{{ itemsCount }} {{ pluralizedItemsInCartCountWord }} на
          {{ displayTotalCost }} &#8381;</strong
        >
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
              v-for="dish in dishes"
              :key="dish.id"
              class="my-2 flex w-full gap-2 rounded-xl bg-white p-4 shadow-main"
            >
              <img
                class="h-full w-24 self-center object-contain object-center lg:h-24 lg:w-36"
                :src="dish.img"
                alt=""
              />
              <div
                class="flex grow flex-col items-stretch justify-between self-stretch"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-black">{{ dish.name }}</p>
                    <p class="text-sm text-black opacity-50">
                      {{ dish.weight }} гр
                    </p>
                  </div>
                  <button @click="cartStore.removeAll(dish.id)">
                    <IconClose class="h-6" />
                  </button>
                </div>
                <div class="flex items-end justify-between">
                  <p class="mt-auto text-lg text-black">
                    {{ dish.newPrice }} &#8381;
                  </p>
                  <div>
                    <DishAdder
                      class="h-8 w-28 md:w-32"
                      :value="dishesCount[dish.id]"
                      @increment="cartStore.addDish(dish)"
                      @decrement="cartStore.removeOne(dish.id)"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="w-full px-4 pt-8 font-medium shadow-main">
          <div class="flex items-center justify-between">
            <span>{{ itemsCount }} {{ pluralizedItemsInCartCountWord }}</span>
            <span>{{ displayTotalCost }} &#8381;</span>
          </div>

          <div class="flex items-center justify-between">
            <span>Начислим вкусоины</span>
            <span>+ 62</span>
          </div>

          <SimpleButton
            :disabled="itemsCount == 0"
            class="mt-8 w-full px-4 py-4 text-xs uppercase"
            @click="emit('proccedToPayment')"
          >
            Перейти к оформлению <IconArrowRight class="inline h-4" />
          </SimpleButton>
        </div>
      </div>

      <div v-else class="h-full flex items-center justify-center">
        <div
          class="bg-blue-100 relative px-1 max-w-xs lg:max-w-sm pt-12 pb-20 lg:pb-24 rounded-xl text-center flex flex-col items-center"
        >
          <img class="h-12 lg:h-14" src="/fish.svg" alt="" />
          <strong class="uppercase font-bold text-base lg:text-xl mt-2">
            ой, кажется, Корзина пуста
          </strong>
          <p class="text-sm mt-4">
            Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар
          </p>
          <p class="text-sm mt-2">Мы доставим ваш заказ от 699 ₽</p>

          <img
            src="/upset-cup.svg"
            class="h-24 lg:h-32 absolute top-0 -translate-y-3/4 transition-opacity"
            :class="isCupReady ? 'opacity-100' : 'opacity-0'"
            alt=""
          />

          <img
            src="/upset-sushi.svg"
            class="h-32 lg:h-40 absolute bottom-0 translate-y-1/2 max-w-none transition-opacity"
            :class="isSushiReady ? 'opacity-100' : 'opacity-0'"
            alt=""
          />
        </div>
      </div>
    </Transition>

    <span
      class="absolute bottom-2 left-0 right-0 text-center text-sm text-black opacity-50 md:hidden"
      >Свайпай вправо, чтобы закрыть</span
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useImage } from "@vueuse/core";
import { useCartStore } from "~/store/cart";

const emit = defineEmits(["proccedToPayment"]);

const cartStore = useCartStore();
const { itemsCount, totalCost, dishes, dishesCount } = storeToRefs(cartStore);

const pluralizedItemsInCartCountWord = computed(() => {
  if (itemsCount.value === 1) return "товар";
  if (itemsCount.value === 2) return "товара";
  if (itemsCount.value === 3) return "товара";
  if (itemsCount.value === 4) return "товара";
  return "товаров";
});

const { isReady: isCupReady } = useImage({ src: "/upset-cup.svg" });
const { isReady: isSushiReady } = useImage({ src: "/upset-sushi.svg" });

const displayTotalCost = totalCost;
</script>
