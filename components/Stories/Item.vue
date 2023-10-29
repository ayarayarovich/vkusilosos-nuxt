<template>
  <button class="h-40 aspect-[149/167] p-2 group outline-none">
    <img
      src="/storis.png"
      :draggable="false"
      style="user-drag: none"
      :class="[
        'h-full w-full rounded-xl object-cover object-center ring-2 ring-orange-400 ring-offset-4 transition-shadow pointer-events-none',
        'group-hover:ring-offset-[6px]',
        'group-focus:ring-offset-[6px]',
      ]"
      alt=""
    />
  </button>
</template>
