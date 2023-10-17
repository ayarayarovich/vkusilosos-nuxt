<template>
    <div class="overflow-hidden rounded-xl accent-gradient-bg">
        <div class="outer-bg-color rounded-xl flex h-full w-full items-center justify-center border-transparent border-2 bg-clip-padding">
            <button
                @click.stop="emit('decrement')"
                class="rounded-full px-2 text-black"
            >
                -
            </button>
            <span class="mx-1 inline-block min-w-[2ch] text-center text-black lg:mx-2">{{ props.value || 0 }}</span>
            <button
                @click.stop="emit('increment')"
                class="rounded-full px-2 text-black"
            >
                +
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    value?: number
}>()

const emit = defineEmits(['increment', 'decrement'])
</script>
