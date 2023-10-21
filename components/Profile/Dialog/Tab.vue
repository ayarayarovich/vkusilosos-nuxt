<template>
  <HeadlessTab v-slot="{ selected }" as="template">
    <button
      class="py-3 px-6 outline-none font-medium transition-colors text-start text-lg"
      :class="{
        'bg-gray': !selected,
        'bg-white': selected,
      }"
    >
      <slot></slot>
    </button>
  </HeadlessTab>
</template>
