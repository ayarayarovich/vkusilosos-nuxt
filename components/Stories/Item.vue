<template>
  <button class="group aspect-[149/167] h-40 p-2 outline-none">
    <img
      src="/storis.png"
      :draggable="false"
      style="user-drag: none"
      :class="[
        'pointer-events-none h-full w-full rounded-xl object-cover object-center ring-2 ring-orange-400 ring-offset-4 transition-shadow',
        'group-hover:ring-offset-[6px]',
        'group-focus:ring-offset-[6px]',
      ]"
      alt=""
    />
  </button>
</template>
