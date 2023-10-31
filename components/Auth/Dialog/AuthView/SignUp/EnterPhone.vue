<template>
  <div class="h-full w-full flex flex-col items-stretch justify-between">
    <div class="grow flex flex-col items-stretch justify-between pb-6">
      <div>
        <p class="mb-4">Напишите свой номер телефона, чтобы получить код по СМС для входа</p>
        <InputMasked
          v-model="phone"
          mask="+{7} (000) 000-00-00"
          class="mb-4"
          name="phone"
          @update="phone = $event"
        />
      </div>

      <SimpleButton
        class="py-5 px-8 mb-2 w-full uppercase font-bold"
        @click="emit('proceed')"
        >Получить код</SimpleButton
      >
    </div>

    <div class="text-xs">
      <div class="h-px bg-gray"></div>
      <div class="py-8 text-center">
        Авторизуясь на сайте, я соглашаюсь с
        <RouterLink
          to="#"
          class="text-orange-200"
        >
          условиями использования
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'set-phone', phone: string): void
  (e: 'proceed'): void
}>()

const phone = ref('')

watch([phone], () => emit('set-phone', phone.value))
</script>
