<template>
  <HeadlessTransitionRoot appear :show="show" as="template">
    <HeadlessDialog as="div" class="relative z-50" @close="emit('close')">
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

      <MouseFollower :top="top" :bottom="bottom" :right="right" :left="left" />

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
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
            <HeadlessDialogPanel
              class="w-full max-w-sm rounded-2xl shadow-xl transition-all"
            >
              <div
                ref="dialogPanelEl"
                class="flex flex-col w-full transform items-stretch justify-between overflow-hidden gap-4 rounded-2xl p-8 bg-whitegray"
              >
                <h1 class="text-center font-medium w-full text-lg mb-2">
                  Напишите нам
                </h1>

                <InputText v-model="name" label="Имя" name="name" type="text" />
                <InputText
                  v-model="email"
                  label="Электронная почта"
                  name="email"
                  type="text"
                />
                <InputText
                  v-model="phone"
                  label="Телефон"
                  name="phone"
                  type="text"
                />
                <InputText
                  v-model="comment"
                  label="Коментарий"
                  name="comment"
                  type="text"
                />

                <SimpleButton class="w-full py-4 px-4">
                  Отправить
                </SimpleButton>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps<{
  show?: boolean;
}>();
const { show } = toRefs(props);
const emit = defineEmits(["close"]);

const dialogPanelEl = ref<HTMLElement>();

const { top, bottom, right, left } = useElementBounding(dialogPanelEl);

const name = ref("");
const email = ref("");
const phone = ref("");
const comment = ref("");
</script>
