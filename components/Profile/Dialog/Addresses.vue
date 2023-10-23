<template>
  <div class="flex flex-col items-stretch h-full">
    <div class="flex items-start flex-col mt-10 mx-8 mb-4">
      <h2 class="block text-xl font-medium mb-2">
        Адреса <input v-model="isEmpty" type="checkbox" />
      </h2>
    </div>

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
                v-for="index in 13"
                :key="index"
                class="p-4 bg-white shadow-main rounded-xl flex justify-between items-center gap-4"
              >
                <div>
                  <div class="opacity-50 text-sm">Москва</div>
                  <div>проспект Строителей 29, под 5, эт 2, кв 55</div>
                </div>
                <div class="flex h-6 items-center gap-4">
                  <button
                    class="focus:ring-2 ring-offset-2 transition-shadow ring-orange-200 rounded-lg p-1 outline-none"
                  >
                    <IconEditPen class="h-full" />
                  </button>
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
          <SimpleButton class="px-8 py-4 w-full">
            Добавить адресс
          </SimpleButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isEmpty = ref(false);
</script>
