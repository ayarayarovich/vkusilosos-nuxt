<template>
  <div class="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-main">
    <DesktopEditAddressDialog
      v-if="isLargeScreen"
      :show="showEditAddressDialog"
      :address="props.address"
      @close="showEditAddressDialog = false"
    />
    <MobileEditAddressDialog
      v-else
      :show="showEditAddressDialog"
      :address="props.address"
      @close="showEditAddressDialog = false"
    />

    <div>
      <div class="text-sm opacity-50">{{ city }}</div>
      <div>{{ addr }}</div>
    </div>
    <div class="flex h-6 shrink-0 items-center gap-1 md:gap-4">
      <button
        class="rounded-lg p-1 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
        @click="showEditAddressDialog = true"
      >
        <IconEditPen class="h-full" />
      </button>
      <button
        class="rounded-lg p-1 outline-none ring-orange-200 ring-offset-2 transition-shadow focus:ring-2"
        @click="deleteAddress(props.address.id)"
      >
        <IconTrashbin class="h-full" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '~/interfaces/main'
import { nthIndex } from '~/utils'

const props = defineProps<{
  address: Address
}>()

const showEditAddressDialog = ref(false)

const city = computed(() => props.address.adres.slice(0, nthIndex(props.address.adres, ',', 2)).trim())
const addr = computed(() => props.address.full.slice(nthIndex(props.address.adres, ',', 2) + 1).trim())

const { mutate } = useDeleteAddress()

const deleteAddress = (addressID: number) => {
  mutate(addressID)
}

const isLargeScreen = useTailwindBreakpoint('lg')
</script>
