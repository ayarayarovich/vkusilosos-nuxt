<template>
  <div class="flex h-full w-full flex-col items-stretch justify-between">
    <div class="flex grow flex-col items-stretch justify-between pb-6">
      <div>
        <p class="mb-4">Повторная отправка возможна через {{ secondsLeft }} секунд</p>
        <PinInput
          name="code"
          :length="4"
        />
      </div>

      <button
        class="mb-2 w-full rounded-xl px-4 py-4 text-sm font-bold uppercase transition-colors"
        :class="secondsLeft > 0 ? 'bg-gray text-[rgba(0,0,0,0.5)]' : 'accent-gradient-bg text-white'"
        :disabled="secondsLeft > 0"
        @click="sendOtpAgain"
      >
        {{ secondsLeft > 0 ? 'Повторно отправить можно через ' + minutesLeft : 'Отправить' }}
      </button>
    </div>

    <div class="text-xs">
      <div class="h-px bg-gray"></div>
      <div class="py-8 text-center">
        <button class="text-orange-200">Пропустить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import * as yup from 'yup'
import { useAuthDialogStore } from '~/store/authDialog'

const props = defineProps<{
  phone: string
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
  mutationFn: async (vals: { phone: string; code: string }) => {
    const response = await publicAxios.post<{
      token: string
      refreshToken: string
    }>('auth/verify', {
      login: vals.phone,
      code: vals.code,
      fb_token: fbToken.value
    })
    return response.data
  },
})

const { userCredentials } = useUserCredentials()
const authDialogStore = useAuthDialogStore()

watchEffect(() => {
  if (code.value?.length === 4) {
    mutateAsync({
      phone: props.phone,
      code: code.value,
    }).then((r) => {
      userCredentials.value = {
        accessToken: r.token,
        refreshToken: r.refreshToken,
        isAuthenticated: true,
      }
      authDialogStore.close()
    })
  }
})

const timeout = 120
const secondsLeft = ref(timeout)
const minutesLeft = computed(() => {
  return `${Math.floor(secondsLeft.value / 60)}:${secondsLeft.value % 60}`
})

const { pause, resume } = useIntervalFn(
  () => {
    secondsLeft.value = Math.max(0, secondsLeft.value - 1)
  },
  1000,
  {
    immediate: true,
  }
)

watch([secondsLeft], () => {
  if (secondsLeft.value === 0) pause()
})

const { mutate: _sendOtpAgain } = useSendOtp({
  onCheckCode: () => {
    secondsLeft.value = timeout
    resume()
  }
})
const sendOtpAgain = () => {
  _sendOtpAgain({
    phone: props.phone,
  })
}
</script>
