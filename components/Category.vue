<template>
  <section
    :id="'dish-category-' + props.category.id"
    ref="fetchObserver"
    class="mb-8 mt-4 lg:mb-16 lg:mt-8"
  >
    <div
      ref="containerEl"
      class="container mx-auto min-h-[10rem] px-4"
    >
      <h1 class="my-8 text-2xl font-medium uppercase text-black">
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
          <DishesGrid>
            <DishesGridCard
              v-for="dish in dishes"
              :key="dish.id"
              :dish="dish"
              :big_card="dish.newPrice > 1000 || (500 < dish.newPrice && dish.newPrice < 600)"
              :class="{
                'orange-bg': dish.newPrice < 400,
                'yellowgreen-bg': dish.newPrice > 1000,
                'blue-bg': 800 < dish.newPrice && dish.newPrice < 900,
              }"
            />
          </DishesGrid>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Category, Dish } from '~/interfaces/dishes'
import { useCategoryStore } from '~/store/category'

const props = defineProps<{
  category: Category
  immediate?: boolean
}>()

const fetchObserver = ref()
const containerEl = ref()
const categoryStore = useCategoryStore()

const { data: dishesData, status: dishesStatus } = await usePublicAxios<{ dishes: Dish[] }>(
  `dish-category-${props.category.id}`,
  async (axios) => {
    const response = await axios.post('api/dish', {
      offset: 0,
      limit: 999999,
      min_price: 0,
      max_price: 9999999,
      category_id: props.category.id,
      have: false,
    })
    return response.data
  }
)

const { data: tagsData, status: tagsStatus } = await usePublicAxios<{ id: number; name: string; img: string }[]>(
  `dish-category-${props.category.id}-tags`,
  async (axios) => {
    const response = await axios.get('api/tags', {
      params: {
        category: props.category.id,
      },
    })

    return response.data
  }
)

useIntersectionObserver(
  containerEl,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      categoryStore.currentCategoryID = props.category.id
    }
  },
  {
    rootMargin: '-30% 0px -50% 0px',
  }
)

const dishes = computed(() => dishesData.value?.dishes)
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
