<template>
  <div class="h-full w-full flex flex-col items-stretch justify-between">
    <div class="grow flex flex-col items-stretch justify-between pb-6">
      <div>
        <p class="mb-4">
          Напишите свой номер телефона, чтобы получить код по СМС для входа
        </p>
        <InputText
          label="Телефон (пока без маски)"
          class="mb-4"
          name="email"
          type="text"
          v-model="login"
          :is-error="true"
          :error-message="error"
        />
      </div>

      <SimpleButton class="py-5 px-8 mb-2 w-full uppercase font-bold"
        >Войти</SimpleButton
      >
    </div>

    <div class="text-xs">
      <div class="h-px bg-gray"></div>
      <div class="py-8 text-center">
        Авторизуясь на сайте, я соглашаюсь с
        <RouterLink to="#" class="text-orange-200">
          условиями использования
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const login = ref("");
const password = ref("");

const { view, changeView } = inject<any>("view");

const error = computed(() => {
  if (login.value.includes("pidor")) {
    return "Охуел?";
  }
});
</script>
