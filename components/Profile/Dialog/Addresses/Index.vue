<template>
  <div class="flex flex-col items-stretch h-full">
    <button
      class="flex items-center mt-10 mx-8 mb-4 gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="h-8 md:hidden invert rotate-180" />
      <h2 class="block text-xl font-medium leading-none">Адреса</h2>
    </button>

    <div class="h-px bg-black opacity-10 mx-4 mb-4"></div>

    <Transition name="fade" mode="out-in">
      <div v-if="isEmpty" class="grow h-0 flex items-center justify-center">
        <div>
          <img
            src="~/assets/add-new-address.svg"
            alt=""
            class="h-48 w-full object-contain object-center mb-6"
          />
          <strong class="font-medium text-2xl block text-center mb-2">
            Самое время добавить <br />
            новый адрес
          </strong>
          <p class="text-center mb-8">
            Сохраните адрес, чтобы еще удобнее делать покупки
          </p>
          <SimpleButton class="uppercase font-medium py-4 px-8 w-full">
            Добавить адрес
          </SimpleButton>
        </div>
      </div>

      <div v-else class="grow h-0 flex items-stretch flex-col">
        <div class="grow h-0 relative mb-4 mx-8">
          <div class="h-full overflow-y-auto py-4 scrollbar-hide">
            <ul class="flex flex-col items-stretch gap-4">
              <li
                v-for="index in 3"
                :key="index"
                class="p-4 bg-white shadow-main rounded-xl flex justify-between items-center gap-4"
              >
                <div>
                  <div class="opacity-50 text-sm">Москва</div>
                  <div>проспект Строителей 29, под 5, эт 2, кв 55</div>
                </div>
                <div class="flex h-6 items-center shrink-0 gap-1 md:gap-4">
                  <ProfileDialogAddressesEditAddress/>
                  <button
                    class="focus:ring-2 ring-offset-2 transition-shadow ring-orange-200 rounded-lg p-1 outline-none"
                  >
                    <IconTrashbin class="h-full" />
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div
            class="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-whitegray to-transparent"
          ></div>
          <div
            class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-whitegray to-transparent"
          ></div>
        </div>

        <div class="mx-8 mb-8">
          <ProfileDialogAddressesAddAddress />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["go-back"]);

const isEmpty = ref(false);
</script>
