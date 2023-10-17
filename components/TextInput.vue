<template>
    <div class="relative border-via-padding bg-gradient-to-br from-orange-200 to-orange-600">
        <label class="absolute left-5 top-5 max-w-full text-sm leading-none break-words text-[#777675]"
            >
                {{ props.label }}
        </label>
        <input
            type="text"
            class="w-full bg-white px-5 py-10 pb-5 text-black shadow-xl"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event as any).target.value)"
        />
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['modelValue', 'label', 'name'])
const emit = defineEmits(['update:modelValue'])

</script>
