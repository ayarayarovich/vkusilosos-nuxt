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
                <strong class="mb-8 block text-center">Вы уверены, что хотите выйти?</strong>
                <div class="flex gap-4 font-medium">
                  <button
                    class="flex-1 rounded-xl bg-gray px-4 py-3 outline-none ring-gray ring-offset-2 transition-shadow focus:ring-2"
                    @click="signOut()"
                  >
                    <span class="text-black opacity-50">Да</span>
                  </button>
                  <SimpleButton
                    class="flex-1 px-4 py-3"
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
import { useProfileDialogStore } from '~/store/profileDialog'
import { useUserStore } from '~/store/user'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const userStore = useUserStore()
const profileDialogStore = useProfileDialogStore()

const signOut = () => {
  emit('close')
  profileDialogStore.close()
  userStore.signOut()
}

const dialogPanelEl = ref<HTMLElement>()
const cancelButton = ref<HTMLElement>()
</script>
