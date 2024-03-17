<template>
  <div class="relative flex h-full flex-col items-stretch bg-[#fdfdfd]">
    <div class="mb-8 px-8 pt-12">
      <strong class="mb-4 block text-2xl font-medium">Подтвердите вход</strong>
      <div class="flex items-center gap-2 text-sm">
        Отправили сообщение на номер:
        <button
          class="flex items-center gap-1 rounded-md text-orange-400 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
          type="button"
          @click="emit('edit-phone')"
        >
          {{ formatPhone(props.phone) }}
          <IconEditPen class="h-4 text-orange-600" />
        </button>
      </div>
    </div>
    <div class="mx-4 mb-8 h-px bg-gray"></div>

    <div class="mx-8 grow">
      <div class="flex h-full w-full flex-col items-stretch justify-between">
        <div class="flex grow flex-col items-stretch justify-between pb-6">
          <div></div>
          <div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import * as yup from 'yup'
import { formatPhone } from '~/utils'

const emit = defineEmits(['edit-phone'])

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
      fb_token: fbToken.value,
    })
    return response.data
  },
})

const { userCredentials } = useUserCredentials()

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
  },
})
const sendOtpAgain = () => {
  _sendOtpAgain({
    phone: props.phone,
  })
}
</script>
