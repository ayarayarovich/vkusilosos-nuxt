<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      :initial-focus="addToCartButton"
      class="relative z-50"
      @close="emit('close')"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25">
          <MouseFollower :hide-when-over-el="dialogPanelEl" />
        </div>
      </HeadlessTransitionChild>

      <div class="fixed top-0 left-0 bottom-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="w-full max-w-4xl rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="flex w-full transform flex-col gap-8 overflow-hidden rounded-2xl bg-white p-12 md:flex-row"
              >
                <img
                  class="h-48 w-64 self-center object-contain"
                  :src="props.dish.img"
                  alt=""
                />

                <div class="flex grow flex-col items-stretch justify-between">
                  <div class="text-left">
                    <HeadlessDialogTitle
                      as="h1"
                      class="mb-2 text-2xl font-medium"
                      >{{ props.dish.name }}</HeadlessDialogTitle
                    >
                    <p class="mb-2 text-sm">{{ props.dish.description }}</p>
                    <p class="mb-8 text-sm lg:mb-24">{{ props.dish.weight }} гр</p>
                  </div>
                  <div class="flex gap-4">
                    <DishAdder
                      class="h-9 w-24 text-black lg:h-10 lg:w-32"
                      :value="cartStore.dishesCount[props.dish.id]"
                      @increment="cartStore.addDish(props.dish)"
                      @decrement="cartStore.removeOne(props.dish.id)"
                    />
                    <SimpleButton
                      ref="addToCartButton"
                      class="h-9 grow rounded-lg text-[0.7rem] font-medium uppercase text-white lg:h-10 lg:text-sm"
                      @click="cartStore.addDish(props.dish)"
                      >В корзину за {{ dish.newPrice }} &#8381;</SimpleButton
                    >
                  </div>
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useCartStore } from '~/store/cart'
import type { Dish } from '~/interfaces/dishes'

const props = defineProps<{
  show?: boolean
  dish: Dish
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const cartStore = useCartStore()

const dialogPanelEl = ref<HTMLElement>()

const addToCartButton = ref()
</script>
