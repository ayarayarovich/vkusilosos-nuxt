<template>
  <HeadlessRadioGroup
    v-model="value"
    class="flex flex-wrap gap-4 font-normal"
  >
    <HeadlessRadioGroupOption
      v-slot="{ checked }"
      as="template"
      value="soon"
    >
      <button
        type="button"
        class="select-none rounded-xl border-2 border-transparent bg-white px-4 py-2 shadow-main outline-none transition-colors hover:border-orange-100 focus-visible:border-orange-100"
        :class="{
          '!border-orange-200': checked,
        }"
      >
        Через <span class="text-[#999700]">~ 30 мин</span>
      </button>
    </HeadlessRadioGroupOption>
    <HeadlessRadioGroupOption
      v-for="(step, i) in firstPart"
      :key="i"
      v-slot="{ checked }"
      as="template"
      :value="step.value"
    >
      <button
        type="button"
        class="select-none rounded-xl border-2 border-transparent bg-white px-4 py-2 shadow-main outline-none transition-colors hover:border-orange-100 focus-visible:border-orange-100"
        :class="{
          '!border-orange-200': checked,
        }"
      >
        {{ step.displayValue }}
      </button>
    </HeadlessRadioGroupOption>

    <!-- <button
      type="button"
      class="rounded-xl border-2 border-transparent bg-white px-4 py-2 shadow-main outline-none transition-colors hover:border-orange-100 focus:border-orange-100"
    >
      11:00
    </button>
    <button
      type="button"
      class="rounded-xl border-2 border-transparent bg-white px-4 py-2 shadow-main outline-none transition-colors hover:border-orange-100 focus:border-orange-100"
    >
      11:30
    </button> -->
    <button
      v-if="secondPart.length"
      type="button"
      class="grow rounded-xl border-2 border-transparent bg-white px-4 py-2 shadow-main outline-none transition-colors hover:border-orange-100 focus:border-orange-100"
      :class="{
        '!border-orange-200': isChoosedTimeFromSecondPart,
      }"
      @click="showModal = true"
    >
      Выбрать другое время
    </button>
    <HeadlessTransitionRoot
      appear
      :show="showModal"
      as="template"
    >
      <HeadlessDialog
        as="div"
        class="relative z-50"
        @close="showModal = false"
      >
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25">
            <MouseFollower :hide-when-over-el="dialogPanelEl" />
          </div>
        </HeadlessTransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <HeadlessTransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <HeadlessDialogPanel
                class="w-fit max-w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
              >
                <div
                  class="h-full w-full p-6"
                  ref="dialogPanelEl"
                >
                  <div class="grid grid-cols-3 gap-4">
                    <HeadlessRadioGroupOption
                      v-for="(step, i) in secondPart"
                      :key="i"
                      v-slot="{ checked }"
                      as="template"
                      :value="step.value"
                    >
                      <button
                        type="button"
                        class="select-none rounded-xl border-2 border-transparent bg-white px-4 py-2 shadow-main outline-none transition-colors hover:border-orange-100 focus-visible:border-orange-100"
                        :class="{
                          '!border-orange-200': checked,
                        }"
                      >
                        {{ step.displayValue }}
                      </button>
                    </HeadlessRadioGroupOption>
                  </div>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </HeadlessRadioGroup>
</template>

<script setup lang="ts">
import { DateTime, Duration, Settings } from 'luxon'
import { getFirstNItems } from '~/utils'

const dialogPanelEl = ref()

Settings.defaultZone = 'Europe/Moscow'

const timeSteps = computed(() => {
  const step = Duration.fromObject({ minutes: 30 })

  const steps: {
    value: string
    displayValue: string
  }[] = []

  for (
    let t = DateTime.fromObject({ ...DateTime.now().toObject(), hour: 11, minute: 0, second: 0, millisecond: 0 });
    t <= DateTime.fromObject({ ...DateTime.now().toObject(), hour: 22, minute: 30, second: 0, millisecond: 0 });
    t = t.plus(step)
  ) {
    if (DateTime.now().plus({ hours: 2 }) <= t)
      steps.push({
        value: t.toISO() || '',
        displayValue: t.toFormat('HH:mm'),
      })
  }

  return steps
})

const { value } = useField<string | undefined>('time_deliver')

const firstPart = computed(() => {
  const steps = getFirstNItems(timeSteps.value, 3)
  return steps
})
const secondPart = computed(() => timeSteps.value.slice(3))

const isChoosedTimeFromSecondPart = computed(() => {
  if (value.value) {
    return !!secondPart.value.find((t) => t.value === value.value)
  }
  return false
})

const showModal = ref(false)
</script>
