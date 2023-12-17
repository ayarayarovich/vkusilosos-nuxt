<template>
  <HeadlessCombobox
    v-model="value"
    class="relative"
  >
    <div class="relative">
      <HeadlessComboboxInput
        :id="inputID"
        v-model="value"
        class="peer w-full select-none rounded-xl border-2 border-transparent bg-white px-4 pb-3 pt-7 text-base placeholder-transparent shadow-main outline-none transition-colors focus:border-orange-200"
        :class="{
          '!border-red': errorMessage,
        }"
        type="text"
        :name="name"
        :display-value="props.displayValue"
        placeholder="Введите"
        @change="emit('update:query', $event.target.value)"
      />
      <label
        :for="inputID"
        class="pointer-events-none absolute left-4 top-3 select-none text-xs text-[#777675] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs"
        :class="{
          'text-red': errorMessage,
        }"
      >
        {{ errorMessage || label }}
      </label>

      <HeadlessTransitionRoot
        enter="transition ease-out duration-100"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition ease-in duration-100"
        leave-to="opacity-0"
        leave-from="opacity-100"
        @after-leave="emit('update:query', '')"
      >
        <HeadlessComboboxOptions
          class="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl bg-white shadow-main"
        >
          <div
            v-if="props.options.length === 0"
            class="p-4 text-center"
          >
            Ничего не найдено
          </div>
          <template v-else>
            <div class="flex flex-col py-2">
              <HeadlessComboboxOption
                v-for="(option, index) in props.options"
                :key="index"
                v-slot="{ active, selected }"
                :value="option"
                class="cursor-pointer"
              >
                <div
                  class="py-2 transition-colors"
                  :class="{
                    '!bg-orange-100': active,
                    '!bg-orange-200': selected,
                  }"
                >
                  {{ props.displayValue ? props.displayValue(option) : option }}
                </div>
              </HeadlessComboboxOption>
            </div>
          </template>
        </HeadlessComboboxOptions>
      </HeadlessTransitionRoot>
    </div>
  </HeadlessCombobox>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  name: string
  label: string
  options: string[]
  displayValue?: (option: any) => any
  isLoading?: boolean
  query: string
}>()

const emit = defineEmits(['update:query'])

const inputID = uuidv4()

const { value, errorMessage } = useField(() => props.name)
</script>
