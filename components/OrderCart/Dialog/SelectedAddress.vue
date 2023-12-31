<template>
  <div class="relative">
    <MyLocationDialog
      :show="showChangeReciptionWayDialog"
      @close="showChangeReciptionWayDialog = false"
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
      <template v-if="reciptionWay?.type === 'restaurant'"> Ресторан </template>
      <template v-else-if="reciptionWay?.type === 'delivery'"> Адрес </template>
      <template v-else> Выберите способ получения </template>
    </label>

    <button
      v-if="!locked"
      class="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-2 outline-none transition-shadow focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
      type="button"
      @click="showChangeReciptionWayDialog = true"
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

const inputID = uuidv4()

const { name, locked } = toRefs(props)

const { setValue } = useField(name)

const showChangeReciptionWayDialog = ref(false)

const reciptionWay = useCurrentReciptionWay()

const displayValue = computed(() => {
  if (reciptionWay.value?.type === 'delivery') {
    return transformAddress(reciptionWay.value.full)
  } else if (reciptionWay.value?.type === 'restaurant') {
    return reciptionWay.value.adres
  }
})

watch(
  [reciptionWay],
  () => {
    if (reciptionWay.value) {
      setValue(reciptionWay.value)
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
