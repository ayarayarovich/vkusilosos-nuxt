<template>
  <div class="flex flex-col items-stretch h-full">
    <button
      class="flex items-center mt-10 mx-8 mb-4 gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="h-8 md:hidden invert rotate-180" />
      <h2 class="block text-xl font-medium leading-none">Данные</h2>
    </button>

    <div class="h-px bg-black opacity-10 mx-4 mb-4"></div>

    <div class="grow h-0 mb-4 mx-8 relative">
      <div class="h-full overflow-y-auto py-4 scrollbar-hide scroll-smooth">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
          <InputText v-model="name" type="text" name="name" label="Имя" />
          <InputText
            v-model="birthday"
            type="text"
            name="birthday"
            label="Дата рождаения"
          />
        </div>

        <div class="mb-8">
          <h3 class="block text-xl font-medium mb-5">Привязанные карты</h3>
          <ul class="flex flex-col items-stretch gap-4">
            <li class="flex items-center p-4 bg-white rounded-xl shadow-main">
              <IconVisa class="h-6" />
              <span class="ml-4">4398 **** **** 8712</span>
              <button class="ml-auto"><IconTrashbin class="h-6" /></button>
            </li>
            <li class="flex items-center p-4 bg-white rounded-xl shadow-main">
              <IconMasterCard class="h-6" />
              <span class="ml-4">4398 **** **** 8712</span>
              <button class="ml-auto"><IconTrashbin class="h-6" /></button>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h3 class="block text-xl font-medium mb-5">Изменить пароль</h3>
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
          <h3 class="block text-xl font-medium mb-5">Подписки</h3>
          <div class="flex items-center gap-2">
            <input id="personal-recomendations-checkbox" type="checkbox" />

            <label for="personal-recomendations-checkbox">
              Получать персональные предложения и акции
            </label>
            <Tooltip>
              Согласен на получение от ООО “Вкуси Лосось” рекламных предложений
            </Tooltip>
          </div>
        </div>
      </div>

      <div
        class="absolute h-4 top-0 left-0 right-0 bg-gradient-to-b from-whitegray to-transparent"
      ></div>
      <div
        class="absolute h-4 bottom-0 left-0 right-0 bg-gradient-to-t from-whitegray to-transparent"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["go-back"]);

const phone = ref("+7 (864) 974 - 83 - 44");
const name = ref("Валентина");
const email = ref("valentina97@gmail.com");
const birthday = ref("11.07.97");

const password = ref("10jhcydhgv12");
const passwordRepeat = ref("");
</script>
