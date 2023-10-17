<template>
    <HeadlessTransitionRoot
        appear
        :show="show"
        as="template"
    >
        <HeadlessDialog
            as="div"
            @close="emit('close')"
            class="relative z-50"
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
                <div
                    class="fixed inset-0 bg-black bg-opacity-25"
                />
            </HeadlessTransitionChild>

            <MouseFollower :top="top" :bottom="bottom" :right="window.width.value" :left="window.width.value - width"/>

            <div class="fixed inset-0 overflow-y-auto overflow-x-hidden">
                <div class="min-h-full">
                    <HeadlessTransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 translate-x-full"
                        enter-to="opacity-100 translate-x-0"
                        leave="duration-200 -mr-[17px] ease-in"
                        leave-from="opacity-100 translate-x-0"
                        leave-to="opacity-0 translate-x-full"
                    >
                        <HeadlessDialogPanel class="absolute bg-white right-0 h-full w-full max-w-xl shadow-xl transition-all">
                            <div ref="dialogPanelEl" class="h-full w-full">
                                <Transition name="fade" mode="out-in">
                                    <OrderCartDialogCart v-if="stage == 'cart'"  @procced-to-payment="stage = 'payment'"/>
                                    <OrderCartDialogPayment v-else-if="stage == 'payment'" @back-to-cart="stage = 'cart'"/>
                                </Transition>
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
}>()
const { show } = toRefs(props)
const emit = defineEmits(['close'])

const dialogPanelEl = ref()
const {top, bottom, right, left, width} = useElementBounding(dialogPanelEl, {
    immediate: true,
    windowScroll: false,
})

const window = useWindowSize()

const stage = ref<'cart' | 'payment'>('cart')

useSwipe(dialogPanelEl, {
    onSwipeEnd(e, direction) {
        if (direction == 'right') {
            emit('close')
        }
    },
})
</script>
