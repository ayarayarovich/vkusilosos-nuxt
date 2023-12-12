<template>
  <div class="flex h-full flex-col items-stretch justify-between py-6">
    <div>
      <p class="mb-4">
        Напишите свою электронную почту, указанную в аккаунте - мы вышлем вам ссылку для восстановления пароля
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
      class="mb-2 w-full px-8 py-5 font-bold uppercase"
      @click="sendLink"
    >
      Отправить
    </SimpleButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const error = ref<string>()

const emit = defineEmits(['next-stage'])

const sendLink = () => {
  const emailIsValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)
  if (emailIsValid) {
    emit('next-stage')
    error.value = undefined
  } else {
    error.value = 'Некорректный адрес почты'
  }
}
</script>
