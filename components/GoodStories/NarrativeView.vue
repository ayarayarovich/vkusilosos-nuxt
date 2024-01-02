<template>
  <div class="h-full w-full overflow-hidden rounded-xl">
    <div class="relative h-full w-full">
      <div
        class="absolute bottom-0 left-0 top-0 w-1/2"
        @click="goToPreviousNarrativeSlide()"
      ></div>
      <div
        class="absolute bottom-0 right-0 top-0 w-1/2"
        @click="goToNextNarrativeSlide()"
      ></div>
      <div class="from absolute left-0 right-0 top-0 h-14 bg-gradient-to-b from-black/40 to-black/0"></div>
      <div class="absolute left-0 right-0 top-0 flex items-center gap-1 p-3">
        <GoodStoriesProgressTile
          v-for="(slide, index) in props.story_items"
          :key="slide.id"
          :index="index"
        />

        <button
          type="button"
          class="ml-2 rounded-full outline-none md:hidden"
          @click="closeDialog()"
        >
          <IconCloseGray class="h-5" />
        </button>
      </div>
      <img
        :src="props.story_items[currentNarrativeSlideIndex].img"
        class="h-full w-full object-cover object-center"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { StateInjectionKey } from './state'
import type { Story } from '~/interfaces/main'

const {
  goToNextNarrativeSlide,
  goToPreviousNarrativeSlide,
  currentNarrativeIndex,
  currentNarrativeSlideIndex,
  closeDialog,
} = inject(StateInjectionKey)!

const props = defineProps<Story>()
</script>
