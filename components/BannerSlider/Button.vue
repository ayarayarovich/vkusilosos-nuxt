<template>
  <button
    class="relative aspect-square h-4 rounded-full"
    @click="emit('click')"
  >
    <Transition name="fade">
      <img
        v-if="active"
        class="absolute inset-0 h-full w-full"
        src="~/assets/active-slider-button.svg"
        alt=""
      />
      <img
        v-else
        class="absolute inset-0 h-full w-full"
        src="~/assets/inactive-slider-button.svg"
        alt=""
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  active: boolean
}>()
const { active } = toRefs(props)

const emit = defineEmits(['click'])
</script>
