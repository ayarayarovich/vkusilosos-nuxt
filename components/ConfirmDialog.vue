<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      :initial-focus="cancelButton"
      @close="emit('close')"
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

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto overflow-x-hidden">
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
            <HeadlessDialogPanel class="w-full max-w-xs rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="w-full transform rounded-2xl bg-white p-8"
              >
                <strong class="!font-medium mb-8 block text-center">{{ message }}</strong>
                <div class="flex gap-4 font-medium">
                  <button
                    class="flex-1 rounded-xl bg-gray px-4 py-3 outline-none ring-gray ring-offset-2 transition-shadow focus:ring-2"
                    @click="emit('confirmed')"
                  >
                    <span class="text-black opacity-50">Да</span>
                  </button>
                  <SimpleButton
                    ref="cancelButton"
                    class="flex-1 px-4 py-3"
                    @click="emit('rejected')"
                  >
                    Нет
                  </SimpleButton>
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps<{
  show?: boolean
  message: string
}>()
const { show, message } = toRefs(props)
const emit = defineEmits(['close', 'confirmed', 'rejected'])

const dialogPanelEl = ref<HTMLElement>()
const cancelButton = ref<HTMLElement>()
</script>
