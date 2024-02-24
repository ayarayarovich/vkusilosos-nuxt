<template>
  <div class="flex min-h-full items-center justify-center p-4 text-center">
    <div class="w-full max-w-4xl rounded-2xl shadow-xl transition-all">
      <div
        ref="dialogPanelEl"
        class="flex w-full transform flex-col gap-8 overflow-hidden rounded-2xl bg-white px-8 py-12 md:flex-row"
      >
        <img
          class="h-48 w-64 self-center object-contain"
          :src="dish?.img"
          alt=""
        />

        <div class="flex grow flex-col items-stretch justify-between">
          <div class="text-left">
            <h1 class="mb-2 flex items-center gap-2 text-2xl font-medium">
              {{ dish?.name }}
              <Tooltip>
                <div class="mb-4 text-center">Пищевая ценность на 100 г</div>
                <div class="flex justify-between gap-8">
                  <span class="text-nowrap"> Энерг. ценность </span>
                  <span class="text-nowrap"> {{ dish?.energ_cen }} ккал </span>
                </div>
                <div class="flex justify-between gap-8">
                  <span>Белки</span>
                  <span> {{ dish?.belki }} г </span>
                </div>
                <div class="flex justify-between gap-8">
                  <span>Жиры</span>
                  <span> {{ dish?.ziri }} г </span>
                </div>
                <div class="flex justify-between gap-8">
                  <span>Углеводы</span>
                  <span> {{ dish?.uglevodi }} г </span>
                </div>
              </Tooltip>
            </h1>
            <div class="mb-2 text-sm">
              <Skeleton
                height="1.25rem"
                width="50%"
                :show-content="isSuccess"
              >
                <span> {{ dish?.description }} </span>
              </Skeleton>
            </div>
            <div class="mb-8 text-sm lg:mb-24">
              <Skeleton
                height="1.25rem"
                width="33%"
                :show-content="isSuccess"
              >
                <span> {{ dish?.count }} / {{ dish?.weight }} гр </span>
              </Skeleton>
            </div>
          </div>
          <div
            v-if="dish"
            class="flex gap-4"
          >
            <DishAdder
              class="h-9 w-24 text-black lg:h-10 lg:w-32"
              hide-button
              :dish-id="dish.id"
              :dish-name="dish.name"
            />
            <DishAdder
              class="h-9 grow text-black lg:h-10"
              always-button
              :dish-id="dish.id"
              :dish-name="dish.name"
            >
              В корзину за {{ dish.price }} &#8381;
            </DishAdder>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

definePageMeta({
  middleware: ['check-category-dish-route'],
})

const { data: dish, isSuccess, suspense } = useDish(route.params.dish_slug as string, true)

onServerPrefetch(async () => {
  await suspense()
})
</script>
