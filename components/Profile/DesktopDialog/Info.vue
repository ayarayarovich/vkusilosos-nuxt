<template>
  <div class="flex h-full flex-col items-stretch">
    <button
      class="mx-8 mb-4 mt-10 flex items-center gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="h-8 rotate-180 invert md:hidden" />
      <h2 class="block text-xl font-medium leading-none">Данные</h2>
    </button>

    <div class="mx-4 mb-4 h-px bg-black opacity-10"></div>

    <div class="relative mx-8 mb-4 h-0 grow">
      <div class="scrollbar-hide h-full overflow-y-auto scroll-smooth py-4">
        <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputText
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
            label="Дата рождаения"
          />
        </div>

        <div class="mb-8">
          <ProfileCreditCards />
        </div>

        <div class="mb-8">
          <h3 class="mb-5 block text-xl font-medium">Изменить пароль</h3>
          <div class="flex flex-col gap-4 lg:flex-row">
            <InputPassword
              class="flex-1"
              name="last_password"
              label="Старый пароль"
            />
            <InputPassword
              class="flex-1"
              name="new_password"
              label="Новый пароль"
            />
          </div>
        </div>

        <div class="mb-8">
          <h3 class="mb-5 block text-xl font-medium">Подписки</h3>
          <div class="flex items-center gap-2">
            <input
              id="personal-recomendations-checkbox"
              type="checkbox"
            />

            <label for="personal-recomendations-checkbox"> Получать персональные предложения и акции </label>
            <Tooltip> Согласен на получение от ООО “Вкуси Лосось” рекламных предложений </Tooltip>
          </div>
        </div>
      </div>

      <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { DateTime } from 'luxon'
import deepEqual from 'deep-equal'
import { formatPhone } from '~/utils'

const emit = defineEmits(['go-back'])

const { data: user } = useUser((v) => {
  const birthday = v.birthday.split(' ')[0] // 2005-09-04 04:00:00 +0400 MSD
  return {
    name: v.name,
    phone: formatPhone(v.phone),
    email: v.email,
    birthday: DateTime.fromFormat(birthday, 'yyyy-mm-dd').toJSDate(),
  }
})

const { mutate: setUser } = useSetUser()

const { values } = useForm<any>({
  validationSchema: yup.object({
    name: yup.string().label('Имя'),
    email: yup.string().label('Электронная почта'),
    phone: yup.string().label('Телефон'),
    birthday: yup.date().label('Дата'),
    last_password: yup.string().label('Старый пароль'),
    new_password: yup.string().label('Новый пароль'),
  }),
  initialValues: user,
})

onUnmounted(() => {
  const before = {
    name: user.value?.name,
    email: user.value?.email,
    birthday: user.value?.birthday,
  }
  const after = {
    name: values.name,
    email: values.email,
    birthday: values.birthday,
  }

  const updates: { [key: string]: any } = {}

  if (!deepEqual(before, after)) {
    updates.name = values.name
    updates.email = values.email
    updates.birthday = DateTime.fromJSDate(values.birthday).toFormat('yyyy/mm/dd')
  }

  if (values.last_password || values.new_password) {
    updates.last_password = values.last_password
    updates.new_password = values.new_password
  }

  if (Object.keys(updates).length > 0) {
    setUser(updates)
  }
})
</script>
