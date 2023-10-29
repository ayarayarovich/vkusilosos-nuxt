<template>
  <div class="h-full w-full flex flex-col items-stretch justify-between pb-8">
    <div>
      <InputText
        v-model="login"
        label="Электронная почта"
        class="mb-4"
        name="email"
        type="text"
        :is-error="true"
        :error-message="error"
      />
      <InputText
        v-model="password"
        label="Пароль"
        class="mb-6"
        name="password"
        type="password"
        :is-error="true"
        :error-message="error"
      />

      <SimpleButton
        class="py-5 px-8 mb-2 w-full uppercase font-bold"
        @click="isAuthenticated = true"
      >
        Войти
      </SimpleButton>

      <div class="flex justify-between items-center">
        <AuthDialogAuthViewQRCode />
        <button
          class="text-orange-200"
          @click="changeView('recovery')"
        >
          Забыли пароль?
        </button>
      </div>
    </div>

    <div>
      <button
        class="text-[#21A049] font-bold mb-4 uppercase text-base py-3 px-8 w-full rounded-xl border-2 border-[#21A049] flex items-center justify-center gap-3"
      >
        <IconSber class="h-6" /> Войти по сбербанк ID
      </button>
      <button
        class="text-[#6B78EE] font-bold uppercase text-base py-3 px-8 w-full rounded-xl border-2 border-[#6B78EE] flex items-center justify-center gap-3"
      >
        <IconVKBlue class="h-4" /> Войти через вконтакте
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '~/store/user'

const login = ref('')
const password = ref('')

const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)

const { changeView } = inject<any>('view')

const error = computed(() => {
  if (login.value.includes('pidor')) {
    return 'Охуел?'
  }
})
</script>
