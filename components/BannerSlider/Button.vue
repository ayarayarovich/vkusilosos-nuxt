<template>
    <button
        :class="`
                    duration relative aspect-square h-4 rounded-full bg-gradient-to-b from-orange-200 to-orange-600
                    before:absolute before:inset-0 before:m-auto before:aspect-square before:rounded-full before:bg-white before:transition-all
                    ${active ? 'before:h-0' : 'before:h-1/2'}
                `"
        @click="emit('click')"
    ></button>
</template>

<script setup lang="ts">

const props = defineProps<{
    active: boolean
}>()
const { active } = toRefs(props)

const emit = defineEmits(['click'])
</script>
