<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="emit('close')"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25">
          <MouseFollower :hide-when-over-el="dialogPanelEl" />
        </div>
      </HeadlessTransitionChild>

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="w-full max-w-sm rounded-2xl shadow-xl transition-all">
              <form
                ref="dialogPanelEl"
                class="flex w-full transform flex-col items-stretch justify-between gap-4 overflow-hidden rounded-2xl bg-whitegray p-8"
                @submit.prevent="onSubmit"
              >
                <h1 class="mb-2 w-full text-center text-lg font-medium">Оставить отзыв</h1>

                <InputText
                  label="Имя"
                  name="name"
                  type="text"
                />
                <InputText
                  label="Электронная почта"
                  name="email"
                  type="text"
                />
                <InputPhone
                  label="Телефон"
                  name="phone"
                />
                <InputTextarea
                  label="Коментарий"
                  name="message"
                  :rows="3"
                />

                <SimpleButton
                  class="w-full px-4 py-4"
                  type="submit"
                  :disabled="isPending"
                >
                  Отправить
                </SimpleButton>
              </form>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import * as yup from 'yup'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref<HTMLElement>()

const { userCredentials } = useUserCredentials()
const { data: user } = useUser((v) => ({
  name: v.name,
  phone: v.phone,
  email: v.email,
}))

const validationSchema = yup.object({
  name: yup.string().label('Имя'),
  phone: yup.string().label('Телефон'),
  email: yup.string().email().label('Электронная почта'),
  message: yup.string().label('Комментарий'),
})

const initialValues = computed(() => {
  if (userCredentials.value.isAuthenticated && user.value) {
    return user.value
  }
  return {
    email: '',
    message: '',
    name: '',
    phone: '',
  }
})

const { handleSubmit } = useForm({
  validationSchema,
  initialValues,
})

const { mutateAsync, isPending } = useSendReview()

const onSubmit = handleSubmit((vals) => {
  mutateAsync(vals).then(() => emit('close'))
})
</script>
