<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="closeDialog()"
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

      <div class="fixed inset-0 overflow-x-hidden overflow-y-hidden">
        <div class="min-h-full">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-full"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-full"
          >
            <HeadlessDialogPanel
              class="absolute bottom-0 h-full w-full max-w-xl shadow-xl transition-all"
              @click="emit('close')"
            >
              <TestMenu
                v-if="currentView === 'menu'"
                @close="emit('close')"
                @change-view="currentView = $event"
              />
              <TestInfo
                v-else-if="currentView === 'info'"
                @go-back="currentView = 'menu'"
              />
              <TestAddresses
                v-else-if="currentView === 'addresses'"
                @go-back="currentView = 'menu'"
              />
              <TestBonuses
                v-else-if="currentView === 'bonus'"
                @go-back="currentView = 'menu'"
              />
              <TestOrdersHistory
                v-else-if="currentView === 'orders-history'"
                @go-back="currentView = 'menu'"
              />
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
const props = defineProps<{
  show?: boolean
}>()

const currentView = ref<'menu' | 'info' | 'orders-history' | 'addresses' | 'bonus'>('menu')

const closeDialog = () => {
  emit('close')
  currentView.value = 'menu'
}

const { show } = toRefs(props)
const emit = defineEmits(['close'])
</script>
