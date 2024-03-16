<template>
  <button
    class="aspect-[9/10] h-36 rounded-[1rem] border-[0.15rem] border-orange-200 p-[0.25rem]"
    type="button"
    @click="openDialog(index)"
    @mouseenter="preloadFirstSlide = true"
  >
    <img
      class="h-full w-full rounded-[0.6rem] object-cover object-center"
      :src="props.preview"
      alt="Прьевю сториса"
    />
    <img
      v-if="preloadFirstSlide"
      class="hidden"
      :src="props.story_items[0]?.img"
      alt=""
    />
  </button>
</template>

<script setup lang="ts">
import { StateInjectionKey } from './state'
import type { Story } from '~/interfaces/main'
const props = defineProps<Story & { index: number }>()

const preloadFirstSlide = ref(false)

const { openDialog } = inject(StateInjectionKey)!
</script>
