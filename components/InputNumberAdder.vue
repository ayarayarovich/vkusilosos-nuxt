<template>
  <div class="accent-gradient-bg h-full w-full overflow-hidden rounded-xl">
    <div
      class="outer-bg-color flex h-full w-full items-center justify-center rounded-xl border-2 border-transparent bg-clip-padding"
    >
      <button
        type="button"
        class="flex aspect-square h-full items-center justify-center rounded-full px-2 text-black"
        @click.stop="decr()"
      >
        <img
          class="aspect-square h-2"
          src="~/assets/minus.svg"
          alt=""
        />
      </button>
      <span class="mx-1 inline-block min-w-[2ch] text-center text-black lg:mx-2">{{ value }}</span>
      <button
        type="button"
        class="flex aspect-square h-full items-center justify-center rounded-full px-2 text-black"
        @click.stop="incr()"
      >
        <img
          class="aspect-square h-2"
          src="~/assets/plus.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  min?: number
  max?: number
}>()

const { name } = toRefs(props)

const { value } = useField<number>(name)

const decr = () => {
  if (props.min != null && value.value <= props.min) {
    return
  }
  value.value -= 1
}

const incr = () => {
  if (props.max != null && value.value >= props.max) {
    return
  }
  value.value += 1
}
</script>
