<template>
  <div class="relative flex h-full flex-col items-stretch bg-[#fdfdfd]">
    <strong class="mb-8 block px-8 pt-12 text-2xl font-medium"> Пожалуйста, авторизуйтесь </strong>
    <div class="mx-4 mb-8 h-px bg-gray"></div>
    <div class="mx-8 mb-8">
      <div class="rounded-xl bg-current bg-gray p-1.5 text-sm">
        <div class="relative">
          <div
            class="absolute bottom-0 left-0 top-0 w-1/2 rounded-lg bg-white shadow-main transition-transform"
            :class="{
              'translate-x-0': action == 'signin',
              'translate-x-full': action == 'signup',
            }"
          ></div>
          <button
            class="hover isolate h-10 w-1/2 rounded-lg"
            @click="action = 'signin'"
          >
            Вход
          </button>
          <button
            class="isolate h-10 w-1/2 rounded-lg"
            @click="action = 'signup'"
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>

    <div class="mx-8 grow">
      <Transition
        name="fade"
        mode="out-in"
      >
        <AuthDialogAuthViewSignIn v-if="action === 'signin'" />
        <AuthDialogAuthViewSignUp v-else-if="action === 'signup'" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const action = ref<'signin' | 'signup'>('signin')
</script>
