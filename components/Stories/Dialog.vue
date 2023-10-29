<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
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
        <div class="fixed inset-0 bg-[#252321] bg-opacity-70" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-hidden">
        <button
          class="fixed hidden lg:block m-4 top-0 right-0"
          @click="emit('close')"
        >
          <IconCloseGray class="h-10" />
        </button>

        <div class="flex flex-col items-stretch h-full py-8 md:py-24 text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="flex items-center justify-center relative h-full transition-all">
              <div
                ref="storylineContainer"
                class="relative flex items-center justify-center h-full w-full"
              >
                <Transition
                  :name="transitionName"
                  :duration="200"
                  mode="out-in"
                >
                  <div
                    :key="currentStoriesID"
                    class="bg-white aspect-[9/16] shadow-lg overflow-hidden rounded-xl"
                    :class="isTall ? 'w-full h-auto' : 'w-auto h-full'"
                  >
                    <StoriesStoryline
                      :id="currentStoriesID"
                      @reached-start="storylineReachedStart"
                      @reached-end="storylineReachedEnd"
                      @close="emit('close')"
                    />
                  </div>
                </Transition>
              </div>

              <button
                class="absolute hidden lg:block left-4 top-1/2 -translate-y-1/2 rounded-full"
                @click.prevent="storiesStore.prevStoryline()"
              >
                <IconRoundArrowRight class="w-8 rotate-180" />
              </button>
              <button
                class="absolute hidden lg:block right-4 top-1/2 -translate-y-1/2 rounded-full"
                @click.prevent="storiesStore.nextStoryline()"
              >
                <IconRoundArrowRight class="w-8" />
              </button>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { toRefs, ref, watch } from 'vue'
import { onKeyUp } from '@vueuse/core'
import { useStoriesStore } from '~/store/stories'

const storiesStore = useStoriesStore()
const { currentStoriesID } = storeToRefs(storiesStore)

const props = defineProps<{
  show?: boolean
}>()

const { show } = toRefs(props)
const emit = defineEmits(['close'])

const isTall = ref(false)

const storylineContainer = ref()
useResizeObserver(storylineContainer, ([entry]) => {
  const { width, height } = entry.contentRect
  isTall.value = width / height < 9 / 16
})

const transitionName = ref<'storyline-fade-right' | 'storyline-fade-left'>('storyline-fade-left')

watch([currentStoriesID], ([to], [from]) => {
  if (to && from) {
    if (to > from) {
      transitionName.value = 'storyline-fade-left'
    } else {
      transitionName.value = 'storyline-fade-right'
    }
  }
})

const storylineReachedEnd = () => {
  storiesStore.nextStoryline()
}

const storylineReachedStart = () => {
  storiesStore.prevStoryline()
}

onKeyUp('Escape', () => {
  emit('close')
})

onKeyUp('ArrowLeft', () => {
  storiesStore.prevStoryline()
})
onKeyUp('ArrowRight', () => {
  storiesStore.nextStoryline()
})
</script>

<style>
.storyline-fade-left-enter-active,
.storyline-fade-left-leave-active,
.storyline-fade-right-enter-active,
.storyline-fade-right-leave-active {
  transition: all 0.3s ease;
}

.storyline-fade-left-enter-from {
  opacity: 0;
  transform: translateX(1rem);
}
.storyline-fade-left-enter-to,
.storyline-fade-left-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.storyline-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}

.storyline-fade-right-enter-from {
  opacity: 0;
  transform: translateX(-1rem);
}
.storyline-fade-right-enter-to,
.storyline-fade-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.storyline-fade-right-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}
</style>
~/store/stories
