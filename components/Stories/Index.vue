<template>
  <div>
    <div class="absolute top-0 bottom-0 left-0 bg-gradient-to-l from-transparent to-white w-4"></div>
    <div class="absolute top-0 bottom-0 right-0 bg-gradient-to-r from-transparent to-white w-4"></div>
    <div class="scrollbar-hide flex flex-nowrap gap-8 overflow-x-auto scroll-smooth px-4">
      <StoriesItem
        v-for="index in 10"
        :key="index"
        class="shrink-0"
        @click.prevent="openStoriesDrawer(index)"
      />
    </div>

    <StoriesDialog
      :show="storiesDrawerOpen"
      @close="closeStoriesDrawer"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStoriesStore } from '~/store/stories'

const storiesDrawerOpen = ref(false)

const storiesStore = useStoriesStore()
const { currentStoriesID } = storeToRefs(storiesStore)

const openStoriesDrawer = (storiesID: number) => {
  currentStoriesID.value = storiesID
  storiesDrawerOpen.value = true
}
const closeStoriesDrawer = () => {
  storiesDrawerOpen.value = false
}
</script>
~/store/stories
