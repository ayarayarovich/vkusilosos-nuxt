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
            v-model="phone"
            type="text"
            name="phone"
            label="Телефон"
            locked
          />
          <InputText
            v-model="email"
            type="text"
            name="email"
            label="Электронная почта"
          />
          <InputText
            v-model="name"
            type="text"
            name="name"
            label="Имя"
          />
          <InputText
            v-model="birthday"
            type="text"
            name="birthday"
            label="Дата рождаения"
          />
        </div>

        <div class="mb-8">
          <h3 class="mb-5 block text-xl font-medium">Привязанные карты</h3>
          <ul class="flex flex-col items-stretch gap-4">
            <li class="flex items-center rounded-xl bg-white p-4 shadow-main">
              <IconVisa class="h-6" />
              <span class="ml-4">4398 **** **** 8712</span>
              <button class="ml-auto"><IconTrashbin class="h-6" /></button>
            </li>
            <li class="flex items-center rounded-xl bg-white p-4 shadow-main">
              <IconMasterCard class="h-6" />
              <span class="ml-4">4398 **** **** 8712</span>
              <button class="ml-auto"><IconTrashbin class="h-6" /></button>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h3 class="mb-5 block text-xl font-medium">Изменить пароль</h3>
          <div class="flex gap-4">
            <InputText
              v-model="password"
              class="flex-1"
              type="password"
              name="password"
              label="Пароль"
            />
            <InputText
              v-model="passwordRepeat"
              class="flex-1"
              type="password"
              name="passwordRepeat"
              label="Повторите пароль"
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
const emit = defineEmits(['go-back'])

const phone = ref('+7 (864) 974 - 83 - 44')
const name = ref('Валентина')
const email = ref('valentina97@gmail.com')
const birthday = ref('11.07.97')

const password = ref('10jhcydhgv12')
const passwordRepeat = ref('')
</script>
