<template>
  <HeadlessTransitionRoot
    :show="props.show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="close()"
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

      <div class="fixed bottom-0 left-0 top-0 w-screen overflow-y-auto">
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
            <HeadlessDialogPanel class="w-full max-w-4xl rounded-2xl shadow-xl transition-all">
              <div
                ref="dialogPanelEl"
                class="document w-full rounded-2xl bg-whitegray pb-8 text-start"
              >
                <HeadlessDialogTitle
                  class="mb-4 flex items-start justify-between border-b border-gray pb-4 pt-8 text-xl font-bold"
                >
                  <span>Политика конфиденциальности в отношении обработки персональных данных</span>
                  <button
                    class="shrink-0"
                    @click="close()"
                  >
                    <IconClose class="h-8" />
                  </button>
                </HeadlessDialogTitle>
                <div
                  class="grid grid-rows-[0fr] overflow-hidden transition-all duration-1000"
                  :class="{
                    '!grid-rows-[1fr]': isSuccess,
                  }"
                >
                  <div class="min-h-0">
                    <div
                      v-if="isSuccess"
                      class="px-8"
                      v-html="data"
                    ></div>
                  </div>
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
import { useQuery } from '@tanstack/vue-query'
import { usePublicAxiosInstance } from '#imports'
const dialogPanelEl = ref<HTMLElement>()
// const isModalOpen = ref(false)

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'close', closed: Promise<void>): void
}>()

const close = () => {
  emit('close', new Promise((resolve) => setTimeout(resolve, 200)))
}

const publicAxios = usePublicAxiosInstance()
const { data, isSuccess } = useQuery({
  queryKey: ['privacyPolicy'],
  queryFn: async () => {
    const response = await publicAxios.get('api/policy')
    return response.data
  },
})
</script>

<style scoped>
.document > h3 {
  @apply mb-2 text-base font-bold;
}
.document > p {
  @apply mb-4 text-sm;
}

.document > ul {
  @apply mb-8 ml-4 text-sm;
}

.document > ul > li {
  @apply mb-2;
}

.document > * {
  @apply px-8;
}
</style>
