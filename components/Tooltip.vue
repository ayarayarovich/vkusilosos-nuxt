<template>
  <div class="relative">
    <IconInfo class="peer h-4" />

    <div
      class="absolute bottom-6 left-1/2 w-max max-w-[12rem] -translate-x-1/2 rounded-xl bg-gradient-to-tr from-orange-200 to-orange-600 p-4 text-center text-xs text-white opacity-0 transition-opacity peer-hover:opacity-100"
    >
      <slot></slot>
    </div>
  </div>
</template>
