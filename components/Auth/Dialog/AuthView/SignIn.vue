<template>
  <div class="flex h-full w-full flex-col items-stretch justify-between pb-8">
    <div>
      <form @submit="signIn">
        <InputText
          label="Электронная почта"
          class="mb-4"
          name="phone"
          type="text"
        />
        <InputText
          label="Пароль"
          class="mb-6"
          name="password"
          type="password"
        />

        <SimpleButton
          :disabled="isLoading"
          :class="{ 'opacity-50': isLoading }"
          class="mb-2 w-full px-8 py-5 font-bold uppercase"
        >
          Войти
        </SimpleButton>
      </form>

      <div class="flex items-center justify-between">
        <AuthDialogAuthViewQRCode />
        <button
          class="text-orange-200"
          @click="changeView('recovery')"
        >
          Забыли пароль?
        </button>
      </div>
    </div>

    <div>
      <button
        class="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#21A049] px-8 py-3 text-base font-bold uppercase text-[#21A049]"
      >
        <IconSber class="h-6" /> Войти по сбербанк ID
      </button>
      <button
        class="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#6B78EE] px-8 py-3 text-base font-bold uppercase text-[#6B78EE]"
      >
        <IconVKBlue class="h-4" /> Войти через вконтакте
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useUserStore } from '~/store/user'

const { handleSubmit, setErrors } = useForm({
  validationSchema: yup.object({
    phone: yup.string().required().label('Электронная почта'),
    password: yup.string().required().label('Пароль'),
  }),
})

const userStore = useUserStore()

const publicAxios = usePublicAxiosInstance()

const isLoading = ref(false)

const signIn = handleSubmit((vals) => {
  isLoading.value = true
  publicAxios
    .post('api/password_verification', vals)
    .then((res) => {
      userStore.accessToken = res.data.accessToken
      userStore.refreshToken = res.data.refreshToken
      userStore.userID = res.data.user.userId
      userStore.isAuthenticated = true
    })
    .catch(() => {
      setErrors({
        phone: 'Неверный логин или пароль',
        password: 'Неверный логин или пароль',
      })
    })
    .finally(() => {
      isLoading.value = false
    })
})

const { changeView } = inject<any>('view')
</script>
