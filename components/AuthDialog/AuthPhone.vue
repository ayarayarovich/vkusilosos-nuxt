<template>
  <div class="relative flex h-full flex-col items-stretch bg-[#fdfdfd]">
    <div class="mb-8 px-8 pt-12">
      <strong class="mb-4 block text-2xl font-medium"> Пожалуйста, авторизуйтесь </strong>
      <p class="text-sm">Напиши свой номер телефона, чтобы войти на сайт</p>
      <AuthDialogQRCode class="text-sm" />
    </div>
    <div class="mx-4 h-px bg-gray"></div>

    <div class="flex w-full grow flex-col items-stretch justify-between px-8">
      <form
        class="flex grow flex-col items-stretch justify-center pb-6"
        @submit.prevent="submit"
      >
        <div>
          <InputPhone
            class="mb-4"
            label="Номер телефона"
            name="phone"
          />
        </div>

        <SimpleButton
          class="mb-4 w-full px-8 py-5 font-bold uppercase"
          type="submit"
        >
          Выслать код
        </SimpleButton>
        <div class="text-center text-xs">
          Авторизуясь на сайте, я соглашаюсь с
          <button
            type="button"
            class="text-orange-200"
            @click="showUserAggreement = true"
          >
            условиями использования
          </button>
          <UserAgreement
            :show="showUserAggreement"
            @close="showUserAggreement = false"
          />
        </div>
      </form>
    </div>

    <div class="px-8 pb-4">
      <AuthDialogYandex />
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

const showUserAggreement = ref(false)

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
