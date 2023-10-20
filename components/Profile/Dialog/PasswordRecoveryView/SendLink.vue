<template>
  <div class="py-6 h-full flex flex-col items-stretch justify-between">
    <div>
      <p class="mb-4">
        Напишите свою электронную почту, указанную в аккаунте - мы вышлем вам
        ссылку для восстановления пароля
      </p>
      <InputText
        v-model="email"
        label="Электронная почта"
        class="mb-4"
        name="email"
        type="text"
        :error-message="error"
      />
    </div>

    <SimpleButton
      class="py-5 px-8 mb-2 w-full uppercase font-bold"
      @click="sendLink"
    >
      Отправить
    </SimpleButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const error = ref<string>();

const emit = defineEmits(["next-stage"]);

const sendLink = () => {
  const emailIsValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value);
  if (emailIsValid) {
    emit("next-stage");
    error.value = undefined;
  } else {
    error.value = "Некорректный адрес почты";
  }
};
</script>
