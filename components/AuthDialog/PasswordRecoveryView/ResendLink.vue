<template>
  <div class="flex h-full flex-col items-stretch justify-between py-6">
    <div>
      <p class="mb-4">
        Мы отправили вам код для восстановления пароля на почту. Если вы не получили код, то нажмите на кнопку
        “Отправить повторно”
      </p>

      <PinInput
        name="code"
        :length="4"
      />
    </div>

    <SimpleButton
      class="mb-2 w-full px-8 py-5 font-bold uppercase"
      @click="send"
    >
      Отправить повторно
    </SimpleButton>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import * as yup from 'yup'

const props = defineProps<{
  email: string
}>()

useForm({
  validationSchema: yup.object({
    code: yup.string().length(4).required().label('Код'),
  }),
})

const code = useFieldValue<string | undefined>('code')

const fbToken = useFCMToken()

const publicAxios = usePublicAxiosInstance()
const { mutateAsync } = useMutation({
  mutationFn: async (vals: { email: string; code: string }) => {
    const response = await publicAxios.post<{
      token: string
      refreshToken: string
    }>('auth/verify', {
      login: vals.email,
      code: vals.code,
      fb_token: fbToken.value,
    })
    return response.data
  },
})

const { userCredentials } = useUserCredentials()

watchEffect(() => {
  if (code.value?.length === 4) {
    mutateAsync({
      email: props.email,
      code: code.value,
    }).then((r) => {
      userCredentials.value = {
        accessToken: r.token,
        refreshToken: r.refreshToken,
        isAuthenticated: true,
      }
    })
  }
})

const { mutateAsync: resendRecovery } = useSendRecovery()

const send = () => {
  resendRecovery({ email: props.email })
}
</script>
