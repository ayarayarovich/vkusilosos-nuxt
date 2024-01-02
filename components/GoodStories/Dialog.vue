<template>
  <HeadlessTransitionRoot
    :show="isDialogOpen"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="closeDialog"
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
        <div class="fixed inset-0 bg-black/75" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0">
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <HeadlessDialogPanel class="mr-[calc(100%-100vw)] h-full w-screen">
            <div class="relative h-full w-full">
              <button
                type="button"
                class="absolute right-4 top-4 hidden md:block"
                @click="closeDialog"
              >
                <IconCloseGray class="h-8" />
              </button>

              <div class="flex h-full w-full items-center justify-center gap-24 overflow-hidden p-4">
                <button type="button" class="hidden md:block" @click="goToPreviousNarrativeSlide()">
                  <IconRoundArrowRight class="h-8 rotate-180" />
                </button>
                <AspectRatio
                  class="relative"
                  :ratio="9 / 16"
                >
                  <Transition
                    :name="transitionName"
                    :duration="200"
                  >
                    <GoodStoriesNarrativeView
                      v-bind="currentNarrative"
                      :key="currentNarrative?.id"
                    />
                  </Transition>
                </AspectRatio>
                <button type="button"  class="hidden md:block" @click="goToNextNarrativeSlide()">
                  <IconRoundArrowRight class="h-8" />
                </button>
              </div>
            </div>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { StateInjectionKey } from './state'

const { isDialogOpen, closeDialog, currentNarrativeIndex, goToNextNarrativeSlide, goToPreviousNarrativeSlide } = inject(StateInjectionKey)!
const { data: narratives } = useMain((v) => v.stories)
const currentNarrative = computed(() => narratives.value?.at(unref(currentNarrativeIndex)))

const transitionName = ref<'storyline-fade-right' | 'storyline-fade-left'>('storyline-fade-left')

watch([currentNarrativeIndex], ([to], [from]) => {
  if (to && from) {
    if (to > from) {
      transitionName.value = 'storyline-fade-left'
    } else {
      transitionName.value = 'storyline-fade-right'
    }
  }
})
</script>

<style>
.storyline-fade-left-enter-active,
.storyline-fade-left-leave-active,
.storyline-fade-right-enter-active,
.storyline-fade-right-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.storyline-fade-left-enter-from {
  opacity: 0;
  transform: translateX(4rem);
}
.storyline-fade-left-enter-to,
.storyline-fade-left-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.storyline-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-4rem);
}

.storyline-fade-right-enter-from {
  opacity: 0;
  transform: translateX(-4rem);
}
.storyline-fade-right-enter-to,
.storyline-fade-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.storyline-fade-right-leave-to {
  opacity: 0;
  transform: translateX(4rem);
}
</style>
