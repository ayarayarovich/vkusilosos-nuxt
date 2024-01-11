<template>
  <div class="flex h-full w-full flex-col items-stretch justify-between pb-8">
    <div>
      <form @submit="signIn">
        <InputText
          label="Электронная почта"
          class="mb-4"
          name="login"
        />
        <InputPassword
          label="Пароль"
          class="mb-6"
          name="password"
        />

        <SimpleButton
          :disabled="isLoading"
          :class="{ 'opacity-50': isLoading }"
          class="mb-2 w-full px-8 py-5 font-bold uppercase"
        >
          <Transition
            name="fade"
            mode="out-in"
          >
            <svg
              v-if="isLoading"
              class="h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-else>Войти</span>
          </Transition>
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
        class="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#FC3F1D] px-8 py-3 text-sm font-bold uppercase text-[#FC3F1D]"
      >
        <IconYandex class="h-4" /> Войти по яндекс ID
      </button>
      <button
        class="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#6B78EE] px-8 py-3 text-sm font-bold uppercase text-[#6B78EE]"
      >
        <IconVKBlue class="h-3" /> Войти через вконтакте
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useAuthDialogStore } from '~/store/authDialog'
import { useProfileDialogStore } from '~/store/profileDialog'
import { useUserCredentials } from '~/composables/api/user'

const { handleSubmit, setErrors } = useForm({
  validationSchema: yup.object({
    login: yup.string().required().label('Электронная почта'),
    password: yup.string().required().label('Пароль'),
  }),
})

const { userCredentials } = useUserCredentials()
const authDialogStore = useAuthDialogStore()
const profileDialogStore = useProfileDialogStore()

const publicAxios = usePublicAxiosInstance()

const isLoading = ref(false)

const signIn = handleSubmit((vals) => {
  isLoading.value = true
  publicAxios
    .post('auth/login', vals)
    .then((res) => {
      userCredentials.value = {
        accessToken: res.data.token,
        refreshToken: res.data.refreshToken,
        isAuthenticated: true,
      }
      setTimeout(() => {
        authDialogStore.close()
        profileDialogStore.open()
      }, 500)
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
