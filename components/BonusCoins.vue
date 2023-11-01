<template>
  <RouterLink
    class="group relative flex h-6 items-center rounded-xl bg-gradient-to-bl from-orange-600 to-orange-200 pl-2.5 pr-9 text-sm"
    to="/bonus"
  >
    <span class="font-medium leading-none text-white">{{ amount }}</span>
    <div class="absolute bottom-0 left-0 right-0 h-9 overflow-hidden rounded-xl">
      <img
        class="absolute -bottom-2.5 right-0.5 h-6 transition-transform group-hover:-translate-y-0.5"
        src="~/assets/bottom-coin.png"
        alt=""
      />
      <img
        class="absolute bottom-2 right-2 h-5 drop-shadow-md transition-transform group-hover:-translate-y-1"
        src="~/assets/top-coin.png"
        alt=""
      />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const amount = ref(47)
</script>
