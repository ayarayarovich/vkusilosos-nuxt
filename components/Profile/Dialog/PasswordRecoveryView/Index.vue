import { ProfileDialogPasswordRecoveryViewSendLink } from '#build/components';
<template>
  <div class="relative bg-[#fdfdfd] h-full flex flex-col items-stretch">
    <div>
      <strong class="block px-8 pt-12 mb-8 text-2xl font-medium">
        Восстановление пароля
      </strong>
      <div class="h-px mx-4 bg-gray"></div>
    </div>

    <div class="grow mx-8">
      <Transition name="fade" mode="out-in">
        <ProfileDialogPasswordRecoveryViewSendLink
          v-if="stage === 'send-link'"
          @next-stage="stage = 'resend-link'"
        />
        <ProfileDialogPasswordRecoveryViewResendLink
          v-else-if="stage === 'resend-link'"
        />
      </Transition>
    </div>
    <div class="mx-4">
      <div class="h-px mx-4 bg-gray"></div>
      <div class="flex items-center justify-center">
        <button class="my-6 text-orange-200" @click="goBack">
          Вернуться назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { changeView } = inject<any>("view");

const goBack = () => {
  stage.value = "send-link";
  changeView("auth");
};

const stage = ref<"send-link" | "resend-link">("send-link");
</script>
