<template>
  <main
    id="not-found"
    class="h-full flex items-center justify-center"
  >
    <div
      class="mx-auto my-[7vmin] flex w-fit flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-xl"
    >
      <img
        class="h-[30vmin]"
        src="/404.png"
        alt=""
      />
      <p class="text-lg">Упс, мы не смогли найти эту страницу 😢</p>
      <SimpleButton
        ref="button"
        class="min-w-[70%] p-4 flex items-center uppercase justify-center"
        @click="router.push({ path: '/' })"
      >
        Вернуться на гланую <IconArrowRight class="inline h-[1em]" />
      </SimpleButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFocus } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const button = ref(null)
useFocus(button, { initialValue: true })
</script>
