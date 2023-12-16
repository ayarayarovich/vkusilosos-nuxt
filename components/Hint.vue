<template>
  <div class="relative inline-block text-sm font-normal text-white">
    <img
      class="peer opacity-60"
      src="~/assets/icon/icon-info-circle.svg"
      alt=""
    />
    <div
      class="accent-gradient-bg absolute left-1/2 z-20 mt-2 w-max max-w-[18rem] -translate-x-1/2 scale-95 rounded-lg p-4 opacity-0 shadow-xl transition-all peer-hover:scale-100 peer-hover:opacity-100"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
