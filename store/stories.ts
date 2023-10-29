import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStoriesStore = defineStore('stories', () => {
  const currentStoriesID = ref<number>()

  const nextStoryline = () => {
    if (currentStoriesID.value) currentStoriesID.value += 1
  }

  const prevStoryline = () => {
    if (currentStoriesID.value) currentStoriesID.value -= 1
  }

  return { currentStoriesID, nextStoryline, prevStoryline }
})
