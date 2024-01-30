<template>
  <Tippy
    placement="top"
    animation="scale"
  >
    <button><IconInfo class="peer h-4" /></button>

    <template #content>
      <div
        class="w-fit max-w-64 rounded-xl bg-gradient-to-tr from-orange-200 to-orange-600 p-4 text-center text-xs text-white"
      >
        <slot></slot>
      </div>
    </template>
  </Tippy>
</template>

<script setup lang="ts">
import { Tippy } from 'vue-tippy'
</script>
