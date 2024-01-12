<template>
  <div class="relative flex h-full flex-col items-stretch bg-[#fdfdfd]">
    <div>
      <strong class="mb-8 block px-8 pt-12 text-2xl font-medium"> Восстановление пароля </strong>
      <div class="mx-4 h-px bg-gray"></div>
    </div>

    <div class="mx-8 grow">
      <Transition
        name="fade"
        mode="out-in"
      >
        <AuthDialogPasswordRecoveryViewSendLink
          v-if="stage === 'send-link'"
          @next-stage="nextStage"
        />
        <AuthDialogPasswordRecoveryViewResendLink v-else-if="stage === 'resend-link'" :email="email" />
      </Transition>
    </div>
    <div class="mx-4">
      <div class="mx-4 h-px bg-gray"></div>
      <div class="flex items-center justify-center">
        <button
          class="my-6 text-orange-200"
          @click="goBack"
        >
          Вернуться назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { changeView } = inject<any>('view')

const email = ref<string>()

const nextStage = (_email: string) => {
  email.value = _email
  stage.value = 'resend-link'
}

const goBack = () => {
  stage.value = 'send-link'
  changeView('auth')
}

const stage = ref<'send-link' | 'resend-link'>('send-link')
</script>
