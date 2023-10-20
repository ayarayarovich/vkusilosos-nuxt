<template>
  <div
    ref="mouseFollowerEl"
    class="fixed left-0 top-0 z-50 -my-4 -ml-4 aspect-square h-8 rounded-full"
  >
    <IconCloseGray class="h-8" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  top: number;
  bottom: number;
  left: number;
  right: number;
}>();

const { top, bottom, left, right } = toRefs(props);

const mouseFollowerEl = ref();

const { apply } = useMotion(mouseFollowerEl, {
  initial: {
    scale: 0,
  },
});

const { x, y } = useMouse({
  type: "client",
  initialValue: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
  window,
});

const isOutside = computed(
  () =>
    !(
      left.value <= x.value &&
      x.value <= right.value &&
      top.value <= y.value &&
      y.value <= bottom.value
    ),
);

watch([x, y, isOutside], () => {
  if (isOutside.value) {
    apply({
      x: x.value,
      y: y.value,
      scale: 1,
    });
  } else {
    apply({
      x: x.value,
      y: y.value,
      scale: 0,
    });
  }
});
</script>
