<template>
  <div
    ref="element"
    class="hidden shrink-0 pl-4"
    :class="{
      '!block': !!dishesData?.total && !!dishesData.dishes.length,
    }"
  >
    <button
      class="accent-gradient-bg rounded-full"
      @click="onClick"
    >
      <div
        class="rounded-full border-2 border-transparent bg-clip-padding px-8 py-2 transition-colors"
        :class="props.category.id == currentCategoryID ? 'font-medium text-white' : 'bg-white text-black'"
      >
        {{ props.category.name }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import type { Category } from '~/interfaces/dishes'
import { useCategoryStore } from '~/store/category'

const props = defineProps<{
  category: Category
  behavior: 'redirect-and-scroll' | 'scroll'
}>()

const { data: dishesData, suspense } = useDishes({ categorySlug: props.category.link })
onServerPrefetch(async () => {
  await suspense()
})

const categoryStore = useCategoryStore()
const { currentCategoryID } = storeToRefs(categoryStore)

const parent = useParentElement()
const element = ref<HTMLElement>()

const onClick = () => {
  if (props.behavior === 'redirect-and-scroll') {
    ;(navigateTo('/') as Promise<void>).then(() => {
      const target = document.querySelector<HTMLDivElement>('#dish-category-' + props.category.id)!
      const header = document.querySelector<HTMLDivElement>('#header')!

      setTimeout(() => {
        window.scrollTo({
          top: Math.round(
            target.getBoundingClientRect().top +
              document.documentElement.scrollTop -
              header.getBoundingClientRect().height -
              parentBounding.height.value -
              32
          ),
          behavior: 'smooth',
        })
      }, 500)
    })
  }
  if (props.behavior === 'scroll') {
    const target = document.querySelector<HTMLDivElement>('#dish-category-' + props.category.id)!
    const header = document.querySelector<HTMLDivElement>('#header')!

    window.scrollTo({
      top: Math.round(
        target.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          header.getBoundingClientRect().height -
          parentBounding.height.value -
          32
      ),
      behavior: 'smooth',
    })
  }
}

const parentBounding = useElementBounding(parent)

const elementsLeft = ref(0)
onMounted(() => {
  elementsLeft.value = element.value!.offsetLeft - parentBounding.left.value
})

watch([currentCategoryID], () => {
  if (currentCategoryID.value === props.category.id) {
    parent.value!.scrollTo({
      behavior: 'smooth',
      left: elementsLeft.value,
    })
  }
})
</script>
