<template>
  <div class="flex h-full flex-col items-stretch pt-2">
    <div class="relative h-0 grow">
      <HeadlessRadioGroup
        v-model="selectedAddress"
        class="scrollbar-hide flex h-full flex-col items-stretch gap-2 overflow-y-auto py-2"
        :by="compareAddresses"
      >
        <HeadlessRadioGroupOption
          v-for="address in data?.list"
          :key="address.id"
          v-slot="{ active, checked }"
          as="template"
          :value="address"
        >
          <div
            class="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-transparent bg-white p-4 shadow-main outline-none transition-colors"
            :class="{
              '!border-orange-200': checked,
              'border-orange-100': active,
            }"
          >
            <IconMapPoint class="h-5 shrink-0" />
            <div class="text-left text-sm">{{ transformAddress(address.adres) }}</div>
            <button
              class="ml-auto shrink-0 rounded-full p-1 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
              type="button"
              @click="emit('edit', address)"
            >
              <IconEditPen class="h-4" />
            </button>
          </div>
        </HeadlessRadioGroupOption>
      </HeadlessRadioGroup>

      <div class="absolute left-0 right-0 top-0 h-2 bg-gradient-to-b from-whitegray to-transparent"></div>

      <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-whitegray to-transparent"></div>
    </div>

    <div class="mt-2 flex gap-2">
      <button
        class="flex-1 rounded-xl bg-gray px-4 py-3 font-medium outline-none ring-gray ring-offset-2 transition-shadow focus:ring-2"
        type="button"
        @click="emit('new')"
      >
        <span class="text-black opacity-70"> Добавить адрес </span>
      </button>
      <SimpleButton
        class="flex-1 px-4 py-3 font-medium"
        type="button"
        :disabled="!selectedAddress"
        @click="selectDeliveryAddress()"
      >
        Выбрать
      </SimpleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '~/interfaces/main'
import { nthIndex } from '~/utils'

const emit = defineEmits(['edit', 'new', 'updateCoords', 'close'])

const { data } = useAddresses((v) => v)

const transformAddress = (address: string) => {
  return address.slice(nthIndex(address, ',', 1) + 1).trim()
}

const compareAddresses = (a?: Address, b?: Address) => a?.id === b?.id

const selectedAddress = ref<Address>()

watchEffect(() => {
  if (selectedAddress.value) {
    emit('updateCoords', [selectedAddress.value.longitude, selectedAddress.value.latitude])
  }
})

const {data: currentReceptionWay} = useCurrentReceptionWay()
watch(
  [currentReceptionWay],
  () => {
    if (currentReceptionWay.value && currentReceptionWay.value.type === 'delivery') {
      selectedAddress.value = currentReceptionWay.value
    }
  },
  {
    immediate: true,
  }
)

const setCurrentReceptionWay = useSetCurrentReceptionWay()

const selectDeliveryAddress = () => {
  if (selectedAddress.value) {
    setCurrentReceptionWay({
      type: 'delivery',
      ...selectedAddress.value,
    })
    emit('close')
  }
}
</script>
