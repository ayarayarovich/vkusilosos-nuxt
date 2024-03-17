<template>
  <div class="flex h-full flex-col items-stretch">
    <button
      class="mx-8 mb-4 mt-10 flex items-center gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="size-8 rotate-180 md:hidden" />
      <h2 class="block text-xl font-medium leading-none">Данные</h2>
    </button>

    <div class="mx-4 mb-4 h-px bg-black opacity-10"></div>

    <div class="relative mx-8 mb-4 h-0 grow">
      <form
        class="scrollbar-hide flex h-full flex-col items-stretch overflow-y-auto scroll-smooth py-4"
        @submit="onSubmit"
      >
        <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputPhone
            type="text"
            name="phone"
            label="Телефон"
            locked
          />
          <InputText
            type="text"
            name="email"
            label="Электронная почта"
          />
          <InputText
            type="text"
            name="name"
            label="Имя"
          />
          <InputDatepicker
            name="birthday"
            label="Дата рождения"
            :locked="!!user?.birthday"
          />
        </div>

        <div
          class="mb-8"
          @submit.stop=""
        >
          <ProfileCreditCards />
        </div>

        <div class="mb-8">
          <h3 class="mb-5 block text-xl font-medium">Подписки</h3>
          <div class="flex items-center gap-2">
            <label class="flex items-center gap-2">
              <InputCheckbox
                name="personal_recomendations"
                class="shrink-0"
              />
              <span class="cursor-pointer select-none">Получать персональные предложения и акции</span>
            </label>
            <Tooltip>
              Согласен на получение от <span class="text-nowrap">ООО “Вкуси Лосось”</span> <br />
              рекламных предложений
            </Tooltip>
          </div>
        </div>

        <div class="flex-1"></div>
        <SimpleButton class="px-8 py-5 text-sm font-medium uppercase">Сохранить</SimpleButton>
      </form>

      <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { DateTime } from 'luxon'
import { formatPhone } from '~/utils'

const emit = defineEmits(['go-back'])

const { data: user } = useUser((v) => {
  return {
    name: v.name,
    phone: formatPhone(v.phone),
    email: v.email,
    birthday: v.birthday ? DateTime.fromFormat(v.birthday.split(' ')[0], 'yyyy-LL-dd').toJSDate() : undefined,
    personal_recomendations: v.email_pushes || v.get_pushes || v.sms_pushes,
  }
})

const { mutate: setUser } = useSetUser()

const { setFieldError, handleSubmit } = useForm<any>({
  validationSchema: yup.object({
    name: yup.string().label('Имя'),
    email: yup.string().label('Электронная почта'),
    phone: yup.string().required().label('Телефон'),
    birthday: yup.date().label('Дата'),
    personal_recomendations: yup.boolean().label('Получать персональные предложения и акции'),
  }),
  initialValues: user,
})

const onSubmit = handleSubmit((vals) => {
  const before = user.value

  if (before?.personal_recomendations !== vals.personal_recomendations) {
    if (vals.personal_recomendations === true) {
      vals.get_pushes = true
    } else if (vals.personal_recomendations === false) {
      vals.email_pushes = false
      vals.get_pushes = false
      vals.sms_pushes = false
    }
  }
  delete vals.personal_recomendations

  setUser(vals)
})

watch([user], () => {
  const data = user.value as any
  if (data?.action === 'set data') {
    setFieldError('phone', 'Укажите телефон')
  }
})
</script>
