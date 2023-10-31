<template>
  <div class="h-full w-full">
    <Transition
      name="fade"
      mode="out-in"
    >
      <AuthDialogAuthViewSignUpEnterPhone
        v-if="currentStage === 'enter-phone'"
        @proceed="currentStage = 'confirm-code'"
        @set-phone="phone = $event"
      />
      <AuthDialogAuthViewSignUpEnterCode v-else-if="currentStage === 'confirm-code'" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentStage = ref<'enter-phone' | 'confirm-code'>('enter-phone')

const phone = ref('')
</script>
