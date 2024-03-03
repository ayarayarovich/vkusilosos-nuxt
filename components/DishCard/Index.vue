<template>
  <div
    class="relative row-span-1 flex cursor-pointer flex-col items-center rounded-xl p-4 shadow-main transition-all hover:-translate-y-2 hover:shadow-elevated lg:p-7"
    :class="dish.size === 2 ? 'col-span-2' : 'col-span-1'"
    @click="showDialog = true"
  >
    <div
      v-if="categoryTags"
      class="absolute right-4 top-4 z-20 flex flex-col items-end gap-2"
    >
      <div
        v-for="tag in shownTags"
        :key="tag.id"
        class="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs shadow-main"
      >
        <img
          v-if="tag.img"
          :src="tag.img"
          class="h-4"
          alt=""
        />
        {{ tag.name }}
      </div>
    </div>
    <div class="mt-4 h-28 w-auto overflow-hidden sm:h-36 md:h-40 lg:h-32 lg:max-lg:mt-0 xl:h-48">
      <MyImage :src="dish.img" :alt="dish.name" />
    </div>
    <NuxtLink
      :to="dish.link"
      class="mb-auto mt-4 text-center"
      @click.stop=""
    >
      {{ dish.name }}
    </NuxtLink>
    <div
      class="mt-8 flex justify-between self-stretch"
      :class="dish.size === 2 ? 'flex-row items-center gap-8' : 'flex-col items-stretch gap-4'"
    >
      <div class="flex shrink-0 items-center gap-4 text-black">
        <span class="text-sm font-medium !leading-none lg:text-lg"> {{ dish.price }} &#8381; </span>
        <span class="h-4 w-px bg-black"></span>
        <span class="font-base lg:text-md text-xs !leading-none"> {{ dish.weight }} гр </span>
      </div>
      <div
        class="h-9 w-full lg:h-10"
        :class="dish.size === 2 ? 'max-w-[16rem]' : ''"
      >
        <DishAdder
          :dish-id="dish.id"
          :dish-name="dish.name"
          :can-deliver="dish.can_deliver"
          class="h-full w-full"
        />
      </div>
    </div>
    <DishCardDialog
      :dish="dish"
      :show="showDialog"
      @close="showDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dish, Tag } from '~/interfaces/dishes'

const props = defineProps<{ dish: Dish; categoryTags?: Tag[]; shouldIncludeTag?: number }>()
const { dish } = toRefs(props)

const showDialog = ref(false)

const tags = computed(() => props.categoryTags?.filter((tag) => dish.value.tags?.includes(tag.id)))

const shownTags = computed(() => {
  if (tags.value && props.shouldIncludeTag) {
    const tagsToBeShown: Tag[] = []

    const tag = tags.value.find((tag) => tag.id === props.shouldIncludeTag)
    if (tag) {
      tagsToBeShown.push(tag)
    }
    const otherTags = tags.value.filter((tag) => tag.id !== props.shouldIncludeTag)

    const needAdd = otherTags.slice(0, Math.min(2 - tagsToBeShown.length, otherTags.length))

    tagsToBeShown.push(...needAdd)

    return tagsToBeShown
  }
  return tags.value?.splice(0, 2)
})
</script>
