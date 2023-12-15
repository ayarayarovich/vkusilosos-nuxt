<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
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

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto">
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
                class="flex w-full transform flex-col gap-8 overflow-hidden rounded-2xl bg-white px-8 py-12 md:flex-row"
              >
                <img
                  class="h-48 w-64 self-center object-contain"
                  :src="dish.img"
                  alt=""
                />

                <div class="flex grow flex-col items-stretch justify-between">
                  <div class="text-left">
                    <HeadlessDialogTitle
                      as="h1"
                      class="mb-2 flex items-center gap-2 text-2xl font-medium"
                    >
                      {{ dish.name }}
                      <Hint>
                        <div class="mb-4 text-center">Пищевая ценность на 100 г</div>
                        <div class="flex justify-between gap-8">
                          <span> Энерг. ценность </span>
                          <span> {{ dishDetails?.energ_cen }} ккал </span>
                        </div>
                        <div class="flex justify-between gap-8">
                          <span>Белки</span>
                          <span> {{ dishDetails?.belki }} г </span>
                        </div>
                        <div class="flex justify-between gap-8">
                          <span>Жиры</span>
                          <span> {{ dishDetails?.ziri }} г </span>
                        </div>
                        <div class="flex justify-between gap-8">
                          <span>Углеводы</span>
                          <span> {{ dishDetails?.uglevodi }} г </span>
                        </div>
                      </Hint>
                    </HeadlessDialogTitle>
                    <div class="mb-2 text-sm">
                      <Skeleton
                        height="1.25rem"
                        width="50%"
                        :show-content="isSuccess"
                      >
                        <span> {{ dishDetails?.description }} </span>
                      </Skeleton>
                    </div>
                    <div class="mb-8 text-sm lg:mb-24">
                      <Skeleton
                        height="1.25rem"
                        width="33%"
                        :show-content="isSuccess"
                      >
                        <span> {{ dishDetails?.count }} / {{ dishDetails?.weight }} гр </span>
                      </Skeleton>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <DishAdder
                      class="h-9 w-24 text-black lg:h-10 lg:w-32"
                      hide-button
                      :dish-id="dishDetails?.id"
                    />
                    <DishAdder
                      class="h-9 grow text-black lg:h-10"
                      always-button
                      :dish-id="dishDetails?.id"
                    >
                      В корзину за {{ dish.price }} &#8381;
                    </DishAdder>
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
import type { Dish } from '~/interfaces/dishes'

const props = defineProps<{
  show?: boolean
  dish: Dish
}>()
const { show, dish } = toRefs(props)
const emit = defineEmits(['close'])

const { data: dishDetails, isSuccess } = useDish(dish.value?.id, show)

const dialogPanelEl = ref<HTMLElement>()
</script>
