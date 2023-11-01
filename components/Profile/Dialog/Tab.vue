<template>
  <HeadlessTab
    v-slot="{ selected }"
    as="template"
  >
    <button
      class="px-6 py-3 text-start text-lg font-medium outline-none transition-colors"
      :class="{
        'bg-gray': !selected,
        'bg-white': selected,
      }"
    >
      <slot></slot>
    </button>
  </HeadlessTab>
</template>
