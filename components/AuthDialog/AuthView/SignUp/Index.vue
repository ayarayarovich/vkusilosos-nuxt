<template>
  <div class="h-full w-full">
    <Transition
      name="fade"
      mode="out-in"
    >
      <AuthDialogAuthViewSignUpEnterPhone
        v-if="currentStage === 'enter-phone'"
        @next-stage="nextStage"
      />
      <AuthDialogAuthViewSignUpEnterCode
        v-else-if="currentStage === 'confirm-code'"
        :phone="phone"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentStage = ref<'enter-phone' | 'confirm-code'>('enter-phone')
const phone = ref('')

const nextStage = (_phone: string) => {
  phone.value = _phone
  currentStage.value = 'confirm-code'
}
</script>
