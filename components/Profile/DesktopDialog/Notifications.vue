<template>
  <div class="flex h-full flex-col items-stretch">
    <div class="mx-8 mb-4 mt-10 flex items-center justify-between">
      <button
        class="flex items-center gap-2"
        @click="emit('go-back')"
      >
        <IconArrowRight class="h-8 rotate-180 invert md:hidden" />
        <h2 class="block text-2xl font-medium leading-none">Уведомления</h2>
      </button>
    </div>

    <div class="mx-4 h-px bg-black opacity-10"></div>

    <div class="relative my-2 h-0 grow">
      <div class="absolute top-0 z-10 h-8 w-full bg-gradient-to-b from-whitegray to-transparent"></div>
      <div class="absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-whitegray to-transparent"></div>
      <form
        class="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray h-full overflow-y-scroll px-8 py-8"
        @submit="onSubmit"
      >
        <div class="mb-16">
          <h2 class="mb-4 text-xl font-medium text-black">О статусе заказа</h2>

          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-y border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Пуши</HeadlessSwitchLabel>
            <InputSwitch name="push" />
          </HeadlessSwitchGroup>
        </div>

        <div>
          <h2 class="mb-4 text-xl font-medium text-black">Об акциях и скидках</h2>

          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-y border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Пуши</HeadlessSwitchLabel>
            <InputSwitch name="promo_push" />
          </HeadlessSwitchGroup>
          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-b border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Письмо на почту</HeadlessSwitchLabel>
            <InputSwitch name="promo_email" />
          </HeadlessSwitchGroup>
          <HeadlessSwitchGroup
            as="div"
            class="flex items-center justify-between border-b border-black border-opacity-10 py-4"
          >
            <HeadlessSwitchLabel>Смс</HeadlessSwitchLabel>
            <InputSwitch name="promo_sms" />
          </HeadlessSwitchGroup>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])

const { handleSubmit } = useForm({})

const onSubmit = handleSubmit((vals) => {
  console.log(vals)
})
</script>
