<template>
  <div class="flex h-full flex-col items-stretch">
    <DesktopAddAddressDialog
      v-if="isLargeScreen"
      :show="showAddAddressDialog"
      @close="showAddAddressDialog = false"
    />
    <MobileAddAddressDialog
      v-else
      :show="showAddAddressDialog"
      @close="showAddAddressDialog = false"
    />

    <button
      class="mx-8 mb-4 mt-10 flex items-center gap-2"
      @click="emit('go-back')"
    >
      <IconArrowRight class="size-8 rotate-180 md:hidden" />
      <h2 class="block text-xl font-medium leading-none">Адреса</h2>
    </button>

    <div class="mx-4 h-px bg-black opacity-10"></div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="data?.total === 0"
        class="flex h-0 grow items-center justify-center"
      >
        <div class="p-8">
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
          <SimpleButton
            class="w-full px-8 py-4 font-medium uppercase"
            @click="showAddAddressDialog = true"
          >
            Добавить адрес
          </SimpleButton>
        </div>
      </div>

      <div
        v-else
        class="mt-4 flex h-0 grow flex-col items-stretch"
      >
        <div class="relative mx-8 mb-4 h-0 grow">
          <div class="scrollbar-hide h-full overflow-y-auto py-4">
            <ul class="flex flex-col items-stretch gap-4">
              <li
                v-for="address in data?.list"
                :key="address.id"
              >
                <ProfileAddress :address="address" />
              </li>
            </ul>
          </div>

          <div class="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-whitegray to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-whitegray to-transparent"></div>
        </div>

        <div class="mx-8 mb-8">
          <SimpleButton
            class="w-full px-8 py-4"
            @click="showAddAddressDialog = true"
          >
            Добавить адресс
          </SimpleButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['go-back'])

const { data } = useAddresses((v) => v)

const showAddAddressDialog = ref(false)

const isLargeScreen = useTailwindBreakpoint('lg')
</script>
