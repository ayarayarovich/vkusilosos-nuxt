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
            <HeadlessDialogPanel class="rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="flex w-full transform flex-col items-start overflow-hidden rounded-2xl bg-white p-4"
              >
                <div class="flex aspect-square h-56 items-center justify-center">
                  <Transition
                    name="fade"
                    mode="out-in"
                  >
                    <img
                      v-if="isQRReady"
                      class="aspect-square h-full"
                      :src="options.src"
                      alt=""
                    />
                    <LoadingIndicator
                      v-else
                      class="h-8 text-black"
                    />
                  </Transition>
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
import { useImage } from '@vueuse/core'

const props = defineProps<{
  show?: boolean
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref<HTMLElement>()

const { data, isSuccess } = useQRCode(show)
const token = computed(() => data.value?.data || '')
const { data: checkData } = useCheckQRData(token, isSuccess)
const { userCredentials } = useUserCredentials()

watchEffect(() => {
  if (checkData.value?.token && checkData.value.refreshToken) {
    userCredentials.value = {
      accessToken: checkData.value.token,
      refreshToken: checkData.value.refreshToken,
      isAuthenticated: true,
    }
  }
})

const options = computed(() => {
  if (data.value?.img) {
    const segments = data.value.img.split('/')
    const lastSegment = segments.pop() || segments.pop()

    return {
      src: 'https://api.losos.toolio.space/img/' + lastSegment,
    }
  }
  return {
    src: '',
  }
})
const { isReady } = useImage(options)

const isQRReady = computed(() => isSuccess.value && isReady.value)
</script>
