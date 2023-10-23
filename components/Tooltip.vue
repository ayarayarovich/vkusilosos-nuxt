<template>
  <div class="relative">
    <IconInfo class="peer h-4" />

    <div
      class="opacity-0 peer-hover:opacity-100 transition-opacity absolute p-4 bg-gradient-to-tr text-white text-xs max-w-[12rem] text-center w-max rounded-xl bottom-6 left-1/2 -translate-x-1/2 from-orange-200 to-orange-600"
    >
      <slot></slot>
    </div>
  </div>
</template>
