<template>
  <div class="flex h-full flex-col items-stretch">
    <button
      class="mx-8 mb-4 mt-10 flex items-center gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="h-8 rotate-180 invert md:hidden" />
      <h2 class="block text-xl font-medium leading-none">Адреса</h2>
    </button>

    <div class="mx-4 mb-4 h-px bg-black opacity-10"></div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="isEmpty"
        class="flex h-0 grow items-center justify-center"
      >
        <div>
          <img
            src="~/assets/add-new-address.svg"
            alt=""
            class="mb-6 h-48 w-full object-contain object-center"
          />
          <strong class="mb-2 block text-center text-2xl font-medium">
            Самое время добавить <br />
            новый адрес
          </strong>
          <p class="mb-8 text-center">Сохраните адрес, чтобы еще удобнее делать покупки</p>
          <SimpleButton class="w-full px-8 py-4 font-medium uppercase"> Добавить адрес </SimpleButton>
        </div>
      </div>

      <div
        v-else
        class="flex h-0 grow flex-col items-stretch"
      >
        <div class="relative mx-8 mb-4 h-0 grow">
          <div class="scrollbar-hide h-full overflow-y-auto py-4">
            <ul class="flex flex-col items-stretch gap-4">
              <li
                v-for="index in 3"
                :key="index"
                class="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-main"
              >
                <div>
                  <div class="text-sm opacity-50">Москва</div>
                  <div>проспект Строителей 29, под 5, эт 2, кв 55</div>
                </div>
                <div class="flex h-6 shrink-0 items-center gap-1 md:gap-4">
                  <ProfileDialogAddressesEditAddress />
                  <button
                    class="rounded-lg p-1 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
                  >
                    <IconTrashbin class="h-full" />
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
        </div>

        <div class="mx-8 mb-8">
          <ProfileDialogAddressesAddAddress />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])

const isEmpty = ref(false)
</script>
