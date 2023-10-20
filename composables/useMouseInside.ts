import { useEventListener, type MaybeRefOrGetter } from "@vueuse/core";
import { ref } from "vue";

export default (el: MaybeRefOrGetter<EventTarget | null | undefined>) => {
  const mouseInside = ref(false);
  useEventListener(el, "mouseover", () => {
    mouseInside.value = true;
  });
  useEventListener(el, "mouseout", () => {
    mouseInside.value = false;
  });

  return mouseInside;
};
