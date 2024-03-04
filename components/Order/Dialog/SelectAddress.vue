<template>
  <div class="relative">
    <MyLocationDialog
      :show="showChangeReceptionWayDialog"
      @close="showChangeReceptionWayDialog = false"
      @location-changed="emit('locationChanged')"
    />

    <div
      :id="inputID"
      class="peer w-full rounded-xl border-2 border-transparent bg-white px-4 pb-3 pt-7 text-base placeholder-transparent shadow-main outline-none transition-colors focus:border-orange-200"
      :class="{
        '!pr-14': !locked,
      }"
      placeholder="Введите"
    >
      {{ displayValue }}
    </div>
    <label
      :for="inputID"
      class="pointer-events-none absolute left-4 top-3 select-none text-xs text-[#777675] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs"
    >
      <template v-if="receptionWay?.type === 'restaurant'"> Ресторан </template>
      <template v-else-if="receptionWay?.type === 'delivery'"> Адрес </template>
      <template v-else> Выберите способ получения </template>
    </label>

    <button
      v-if="!locked"
      class="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-2 outline-none transition-shadow focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
      type="button"
      @click="showChangeReceptionWayDialog = true"
    >
      <IconEditPen class="aspect-square h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { nthIndex } from '~/utils'

const props = defineProps<{
  name: string
  locked?: boolean
}>()

const emit = defineEmits(['locationChanged'])

const inputID = uuidv4()

const { name, locked } = toRefs(props)

const { setValue } = useField(name)

const showChangeReceptionWayDialog = ref(false)

const { data: receptionWay } = useCurrentReceptionWay()

const displayValue = computed(() => {
  if (receptionWay.value?.type === 'delivery') {
    return transformAddress(receptionWay.value.full)
  } else if (receptionWay.value?.type === 'restaurant') {
    return receptionWay.value.adres
  }
})

watch(
  [receptionWay],
  () => {
    if (receptionWay.value) {
      setValue(receptionWay.value)
    }
  },
  {
    immediate: true,
  }
)

const transformAddress = (address: string) => {
  return address.slice(nthIndex(address, ',', 1) + 1).trim()
}
</script>
