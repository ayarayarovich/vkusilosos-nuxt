<template>
  <section
    :id="'dish-category-' + props.category.id"
    class="mb-8 mt-4 hidden lg:mb-16 lg:mt-8"
    :class="{
      '!block': !!dishesData?.total && !!dishesData.dishes.length,
    }"
  >
    <div
      ref="containerEl"
      class="container mx-auto min-h-[10rem] px-4"
    >
      <h1 class="mb-8 text-2xl font-medium uppercase text-black">
        {{ props.category.name }}
      </h1>
      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="dishesStatus == 'pending'"
          class="flex h-full items-center justify-center"
        >
          <span class="loader"></span>
        </div>
        <div v-else-if="dishesStatus == 'success'">
          <HeadlessRadioGroup
            v-if="dishesData?.tags && dishesData?.tags.length > 0"
            v-model="currentTag"
            class="mb-8 flex flex-wrap items-center gap-2"
          >
            <HeadlessRadioGroupOption
              v-slot="{ checked }"
              :value="-1"
            >
              <Tag
                name="Все"
                :checked="checked"
              />
            </HeadlessRadioGroupOption>

            <HeadlessRadioGroupOption
              v-for="tag in dishesData?.tags"
              :key="tag.id"
              v-slot="{ checked }"
              :value="tag.id"
            >
              <Tag
                v-bind="tag"
                :checked="checked"
              />
            </HeadlessRadioGroupOption>
          </HeadlessRadioGroup>
          <div class="grid grid-flow-row-dense grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            <template
              v-for="dish in dishesData?.dishes"
              :key="dish.id"
            >
              <DishCard
                v-if="currentTag == -1 || dish.tags?.includes(currentTag)"
                :dish="dish"
                :big_card="dish.size === 2"
                :class="{
                  'orange-bg': dish.color === 1,
                  'blue-bg': dish.color === 2,
                  'yellowgreen-bg': dish.color === 3,
                  'yellow-bg': dish.color === 4,
                }"
                :should-include-tag="currentTag"
                :category-tags="dishesData?.tags"
              />
            </template>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '~/interfaces/dishes'
import { useCategoryStore } from '~/store/category'

const props = defineProps<{
  category: Category
  immediate?: boolean
}>()

const currentTag = ref<number>(-1)

const containerEl = ref()
const categoryStore = useCategoryStore()

const { data: dishesData, status: dishesStatus, suspense } = useDishes(props.category.id)
onServerPrefetch(async () => {
  await suspense()
})

useIntersectionObserver(
  containerEl,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      categoryStore.currentCategoryID = props.category.id
    }
  },
  {
    rootMargin: '-30% 0px -69% 0px',
    threshold: 0,
  }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-active {
  transition-delay: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-complete-item {
  transition: all 0.8s ease;
  /* display: inline-block; */
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}

.loader {
  --color: theme('colors.orange.400');
  width: 1rem;
  height: 1rem;
  position: relative;
  border-radius: 50%;
  color: var(--color);
  animation: fill 1s ease-in infinite alternate;
}
.loader::before,
.loader::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  left: 1.5rem;
  top: 0;
  animation: fill 0.9s ease-in infinite alternate;
}

.loader::after {
  left: auto;
  right: 1.5rem;
  animation-duration: 1.1s;
}

@keyframes fill {
  0% {
    box-shadow: 0 0 0 2px inset;
  }
  100% {
    box-shadow: 0 0 0 5px inset;
  }
}
</style>
