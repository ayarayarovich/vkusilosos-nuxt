<template>
  <div class="flex h-full flex-col items-stretch">
    <div class="mx-8 mb-4 mt-10 flex items-center justify-between">
      <button
        class="flex items-center gap-2"
        @click="emit('go-back')"
      >
        <IconArrowRight class="size-8 rotate-180 md:hidden" />
        <h2 class="block text-2xl font-medium leading-none">Уведомления</h2>
      </button>
    </div>

    <div class="mx-4 h-px bg-black opacity-10"></div>

    <div class="relative my-2 h-0 grow">
      <div class="absolute top-0 z-10 h-8 w-full bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-whitegray to-transparent"></div>
      <form
        class="h-full overflow-y-scroll px-8 py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray"
        @submit="onSubmit"
      >
        <div class="mb-16">
          <h2 class="mb-4 text-xl font-medium text-black">О статусе заказа</h2>

          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-y border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Пуши</HeadlessSwitchLabel>
            <InputSwitch name="status_pushes" />
          </HeadlessSwitchGroup>
        </div>

        <div>
          <h2 class="mb-4 text-xl font-medium text-black">Об акциях и скидках</h2>

          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-y border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Пуши</HeadlessSwitchLabel>
            <InputSwitch name="get_pushes" />
          </HeadlessSwitchGroup>
          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-b border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Письмо на почту</HeadlessSwitchLabel>
            <InputSwitch name="email_pushes" />
          </HeadlessSwitchGroup>
          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-b border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Смс</HeadlessSwitchLabel>
            <InputSwitch name="sms_pushes" />
          </HeadlessSwitchGroup>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
const emit = defineEmits(['go-back'])

const { data: usersSettings } = useUser((r) => ({
  email_pushes: r.email_pushes,
  get_pushes: r.get_pushes,
  sms_pushes: r.sms_pushes,
  status_pushes: r.status_pushes,
}))

const { mutate: setUser } = useSetUser()

const { values } = useForm({
  validationSchema: yup.object({
    email_pushes: yup.boolean().label('Письмо на почту'),
    get_pushes: yup.boolean().label('Пуши об акциях'),
    sms_pushes: yup.boolean().label('СМС'),
    status_pushes: yup.boolean().label('Пуши о статусе заказа'),
  }),
  initialValues: usersSettings,
})

onBeforeUnmount(() => {
  setUser({
    ...values,
  })
})
</script>
