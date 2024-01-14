<template>
  <HeadlessPopover
    v-slot="{ open }"
    class="relative"
  >
    <HeadlessPopoverButton
      class="relative w-full overflow-hidden rounded-xl border-2 border-transparent outline-none shadow-main transition-colors focus:border-orange-200"
      :class="{
        '!border-orange-400': open
      }"
    >
      <p
        class="w-full select-none bg-white px-4 pb-3 pt-7 text-start text-base transition-colors"
        :class="{
          '!border-red': errorMessage,
        }"
      >
        <span>
          <template v-if="value">
            {{ displayValue }}
          </template>
          &nbsp;
        </span>
      </p>
      <label
        class="pointer-events-none absolute left-4 top-3 select-none text-xs text-[#777675] transition-all"
        :class="{
          'text-red': errorMessage,
          '!top-5 !text-base': !value,
          '!top-3 !text-xs': value,
        }"
      >
        {{ errorMessage || label }}
      </label>
    </HeadlessPopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <HeadlessPopoverPanel
        v-slot="{ close }"
        class="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0"
      >
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
          <VueDatePicker
            v-model="value"
            inline
            :enable-time-picker="false"
            @update:model-value="close"
          />
        </div>
      </HeadlessPopoverPanel>
    </transition>
  </HeadlessPopover>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { DateTime } from 'luxon'

const props = defineProps<{
  name: string
  label: string
}>()
const { name } = toRefs(props)

const { value, errorMessage } = useField<Date | undefined>(name)

const displayValue = computed(() => {
  if (value.value) {
    return DateTime.fromJSDate(value.value).toLocaleString({
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  }
  return ''
})
</script>

<style>

.dp__theme_light {
    --dp-background-color: #fff;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: theme(colors.orange.200);
    --dp-primary-disabled-color: #6bacea;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595;
    --dp-danger-color: #ff6f60;
    --dp-marker-color: #ff6f60;
    --dp-tooltip-color: #fafafa;
    --dp-disabled-color-text: #8e8e8e;
    --dp-highlight-color: rgb(25 118 210 / 10%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
    --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}

</style>