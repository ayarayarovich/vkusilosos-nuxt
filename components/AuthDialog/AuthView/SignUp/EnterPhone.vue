<template>
  <div class="flex h-full w-full flex-col items-stretch justify-between">
    <form
      class="flex grow flex-col items-stretch justify-between pb-6"
      @submit.prevent="submit"
    >
      <div>
        <p class="mb-4">Напишите свой номер телефона, чтобы получить код по СМС для входа</p>
        <InputMasked
          mask="+{7} (000) 000-00-00"
          class="mb-4"
          label="Номер телефона"
          name="phone"
        />
      </div>

      <SimpleButton
        class="mb-2 w-full px-8 py-5 font-bold uppercase"
        type="submit"
      >
        Получить код
      </SimpleButton>
    </form>

    <div class="text-xs">
      <div class="h-px bg-gray"></div>
      <div class="py-8 text-center">
        Авторизуясь на сайте, я соглашаюсь с
        <NuxtLink
          to="/user_agreement"
          class="text-orange-200"
        >
          условиями использования
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'

const emit = defineEmits<{
  (e: 'next-stage', phone: string): void
}>()

interface Vals {
  phone: string
}

const { handleSubmit } = useForm<Vals>({
  validationSchema: yup.object({
    phone: yup.string().required().length(11, 'Номер телефона').label('Номер телефона'),
  }),
})

const { mutate } = useSendOtp({
  onCheckCode: (vals) => {
    emit('next-stage', vals.phone)
  },
})

const submit = handleSubmit((vals) => {
  mutate(vals)
})
</script>
