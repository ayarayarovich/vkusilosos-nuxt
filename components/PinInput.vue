<template>
  <div ref="pin">
    <PinInputRoot
      :id="inputID"
      v-model="value"
      otp
      class="flex items-stretch gap-2 lg:gap-4"
      @complete="handleComplete"
    >
      <PinInputInput
        v-for="(id, index) in length"
        :key="id"
        :index="index"
        inputmode="numeric"
        class="w-full flex-1 shrink rounded-xl border-2 border-transparent p-4 text-center text-sm shadow-main outline-none transition-colors focus:border-orange-200"
      />
    </PinInputRoot>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  name: string
  length: number
}>()

const inputID = uuidv4()

const pin = ref<HTMLDivElement>()
onMounted(() => {
  setTimeout(() => {
    if (pin.value) {
      const input = pin.value.querySelector('input')
      input?.focus()
    }
  }, 100)
})

const { name, length } = toRefs(props)

const value = ref<string[]>([])

const { setValue } = useField<string>(name)

const handleComplete = (e: string[]) => setValue(e.join(''))
</script>
