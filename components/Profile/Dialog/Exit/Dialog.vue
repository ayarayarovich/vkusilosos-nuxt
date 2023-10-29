<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
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
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <MouseFollower
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
      />

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
            <HeadlessDialogPanel class="rounded-2xl shadow-xl w-full max-w-xs transition-all">
              <div
                ref="dialogPanelEl"
                class="w-full transform rounded-2xl bg-white p-8"
              >
                <strong class="block text-center mb-8">Вы уверены, что хотите выйти?</strong>
                <div class="flex gap-4 font-medium">
                  <button
                    class="bg-gray px-4 py-3 rounded-xl flex-1 focus:ring-2 ring-gray ring-offset-2 outline-none transition-shadow"
                    @click="signOut()"
                  >
                    <span class="text-black opacity-50">Да</span>
                  </button>
                  <SimpleButton
                    class="px-4 py-3 flex-1"
                    @click="emit('close')"
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
import { useUserStore } from '~/store/user'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const userStore = useUserStore()

const signOut = () => {
  emit('close')
  userStore.signOut()
}

const dialogPanelEl = ref<HTMLElement>()

const { top, bottom, right, left } = useElementBounding(dialogPanelEl)
</script>
