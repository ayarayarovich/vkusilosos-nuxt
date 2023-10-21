<template>
  <div class="relative bg-[#fdfdfd] h-full flex flex-col items-stretch">
    <strong class="block px-8 pt-12 mb-8 text-2xl font-medium">
      Пожалуйста, авторизуйтесь
    </strong>
    <div class="h-px mx-4 mb-8 bg-gray"></div>
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

    <div class="grow mx-8">
      <Transition name="fade" mode="out-in">
        <AuthDialogAuthViewSignIn v-if="action === 'signin'" />
        <AuthDialogAuthViewSignUp v-else-if="action === 'signup'" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const action = ref<"signin" | "signup">("signin");
</script>
