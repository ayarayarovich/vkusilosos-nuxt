<template>
  <div class="flex h-full flex-col items-stretch justify-between py-6">
    <div>
      <p class="mb-4">
        Мы отправили вам ссылку для восстановления пароля на почту. Если вы не получили ссылку, то нажмите на кнопку
        “Отправить повторно”
      </p>
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
const props = defineProps<{
  email: string
}>()

const { mutateAsync } = useSendRecovery()

const send = () => {
  mutateAsync({ email: props.email })
}
</script>
