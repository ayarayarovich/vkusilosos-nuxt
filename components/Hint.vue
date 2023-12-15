<template>
  <div class="relative inline-block text-sm font-normal text-white">
    <img
      class="peer opacity-60"
      src="~/assets/icon/icon-info-circle.svg"
      alt=""
    />
    <div
      class="accent-gradient-bg absolute z-20 left-1/2 mt-2 w-max max-w-[18rem] -translate-x-1/2 rounded-lg p-4 opacity-0 scale-95 shadow-xl transition-all peer-hover:opacity-100 peer-hover:scale-100"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
