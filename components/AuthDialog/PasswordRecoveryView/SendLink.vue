<template>
  <form
    class="flex h-full flex-col items-stretch justify-between py-6"
    @submit.prevent="submit"
  >
    <div>
      <p class="mb-4">
        Напишите свою электронную почту, указанную в аккаунте - мы вышлем вам код для восстановления пароля
      </p>
      <InputText
        label="Электронная почта"
        class="mb-4"
        name="email"
      />
    </div>

    <SimpleButton
      class="mb-2 w-full px-8 py-5 font-bold uppercase"
      type="submit"
    >
      Отправить
    </SimpleButton>
  </form>
</template>

<script setup lang="ts">
import * as yup from 'yup'

const emit = defineEmits<{
  (e: 'next-stage', email: string): void
}>()

const { handleSubmit } = useForm<{
  email: string
}>({
  validationSchema: yup.object({
    email: yup.string().email('Электронная почта').required().label('Электронная почта'),
  }),
})

const { mutateAsync } = useSendRecovery()

const submit = handleSubmit((vals) => {
  mutateAsync({ email: vals.email }).then(() => {
    emit('next-stage', vals.email)
  })
})

</script>
