<template>
  <HeadlessTransitionRoot
    appear
    :show="setDataDialogStore.isOpen"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="setDataDialogStore.close()"
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
            <HeadlessDialogPanel class="w-full max-w-md rounded-2xl shadow-xl transition-all">
              <form
                ref="dialogPanelEl"
                class="flex w-full transform flex-col items-stretch justify-between gap-4 overflow-hidden rounded-2xl bg-whitegray p-8"
                @submit.prevent="onSubmit"
              >
                <h1 class="mb-2 w-full text-center text-lg font-medium">Введите недостающие данные</h1>

                <InputPhone
                  name="phone"
                  label="Телефон"
                />
                <InputText
                  name="email"
                  label="Электронная почта"
                />

                <SimpleButton
                  class="mt-4 w-full px-4 py-4"
                  type="submit"
                  :disabled="isPending"
                >
                  Сохранить
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
import { ref } from 'vue'
import * as yup from 'yup'
import { useSetDataDialog } from '~/store/setDataDialog'

const setDataDialogStore = useSetDataDialog()

const dialogPanelEl = ref<HTMLElement>()

const { handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    phone: yup.string().required('Введите телефон').length(11, 'Некорректный номер телефона').label('Телефон'),
    email: yup.string().email('Некорректный адрес').required('Введите почту').label('Электронная почта'),
  }),
})

const { data: user } = useUser((v) => v)
watch(
  [user],
  () => {
    const phone = user.value?.phone || undefined
    const email = user.value?.email || undefined

    if (phone || email) {
      resetForm({
        values: {
          phone,
          email,
        },
      })
    }
  },
  {
    immediate: true,
  }
)

const { mutateAsync, isPending } = useSetUser()

const onSubmit = handleSubmit((vals: any) => {
  mutateAsync({
    phone: vals.phone,
    email: vals.email,
  }).then(setDataDialogStore.close)
})
</script>
