<template>
  <div class="relative">
    <div class="absolute bottom-0 left-0 top-0 w-4 bg-gradient-to-r from-whitegray to-transparent"></div>
    <div class="absolute bottom-0 right-0 top-0 w-4 bg-gradient-to-l from-whitegray to-transparent"></div>

    <div class="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-thin scrollbar-track-black/5 scrollbar-thumb-black/10">
      <GoodStoriesNarrative
        v-for="(narrative, index) in narratives"
        :key="narrative.id"
        :index="index"
        v-bind="narrative"
      />
    </div>

    <GoodStoriesDialog />
  </div>
</template>

<script setup lang="ts">
import { StateInjectionKey } from './state'
const { data: narratives } = useMain((v) => v.stories)

const isDialogOpen = ref(false)
const currentNarrativeIndex = ref(0)
const currentNarrativeSlideIndex = ref(0)

const openDialog = (narrativeIndex?: number) => {
  if (narrativeIndex !== undefined) {
    currentNarrativeIndex.value = narrativeIndex
    currentNarrativeSlideIndex.value = 0
  }
  isDialogOpen.value = true
}
const closeDialog = () => (isDialogOpen.value = false)
const goToNextNarrative = () => {
  if (narratives.value) {
    if (currentNarrativeIndex.value + 1 < narratives.value.length) {
      currentNarrativeIndex.value += 1
      currentNarrativeSlideIndex.value = 0
    } else {
      closeDialog()
    }
  }
}
const goToPreviousNarrative = () => {
  if (narratives.value) {
    if (currentNarrativeIndex.value > 0) {
      currentNarrativeIndex.value -= 1
      currentNarrativeSlideIndex.value = narratives.value[currentNarrativeIndex.value].story_items.length - 1
    } else {
      closeDialog()
    }
  }
}
const goToNextNarrativeSlide = () => {
  if (narratives.value) {
    if (unref(currentNarrativeSlideIndex) + 1 < narratives.value[currentNarrativeIndex.value].story_items.length) {
      currentNarrativeSlideIndex.value += 1
    } else {
      goToNextNarrative()
    }
  }
}
const goToPreviousNarrativeSlide = () => {
  if (narratives.value) {
    if (currentNarrativeSlideIndex.value > 0) {
      currentNarrativeSlideIndex.value -= 1
    } else {
      goToPreviousNarrative()
    }
  }
}

provide(StateInjectionKey, {
  isDialogOpen,
  currentNarrativeIndex,
  currentNarrativeSlideIndex,

  openDialog,
  closeDialog,
  goToNextNarrative,
  goToPreviousNarrative,
  goToNextNarrativeSlide,
  goToPreviousNarrativeSlide,
})
</script>
