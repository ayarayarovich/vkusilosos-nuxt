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
            <div
              v-if="isLoading"
              class="lds-dual-ring"
            ></div>
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
import { useUserStore } from '~/store/user'

const { handleSubmit, setErrors } = useForm({
  validationSchema: yup.object({
    login: yup.string().required().label('Электронная почта'),
    password: yup.string().required().label('Пароль'),
  }),
})

const userStore = useUserStore()
const authDialogStore = useAuthDialogStore()
const profileDialogStore = useProfileDialogStore()

const publicAxios = usePublicAxiosInstance()

const isLoading = ref(false)

const signIn = handleSubmit((vals) => {
  isLoading.value = true
  publicAxios
    .post('auth/login', vals)
    .then((res) => {
      userStore.accessToken = res.data.token
      userStore.refreshToken = res.data.refreshToken
      userStore.isAuthenticated = true

      authDialogStore.close()
      profileDialogStore.open()
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

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
