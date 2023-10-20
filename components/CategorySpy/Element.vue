<template>
  <div ref="element" class="pl-4 shrink-0">
    <button class="rounded-full accent-gradient-bg" @click="onClick">
      <div
        class="border-transparent rounded-full border-2 bg-clip-padding px-8 py-2 transition-colors"
        :class="
          props.category.id == currentCategoryID
            ? 'text-white font-medium'
            : 'bg-white text-black'
        "
      >
        {{ props.category.name }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import type { Category } from "~/interfaces/dishes";
import { useCategoryStore } from "~/store/category";

const props = defineProps<{
  category: Category;
}>();

const categoryStore = useCategoryStore();
const { currentCategoryID } = storeToRefs(categoryStore);

const parent = useParentElement();
const element = ref<HTMLElement>();

const onClick = () => {
  const target = document.querySelector("#dish-category-" + props.category.id)!;
  const header = document.querySelector("#header")!;
  window.scrollTo({
    top: Math.round(
      target.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        header.getBoundingClientRect().height -
        parentBounding.height.value -
        32,
    ),
    behavior: "smooth",
  });
};

const parentBounding = useElementBounding(parent);

const elementsLeft = ref(0);
onMounted(() => {
  elementsLeft.value = element.value!.offsetLeft - parentBounding.left.value;
});

watch([currentCategoryID], () => {
  if (currentCategoryID.value === props.category.id) {
    parent.value!.scrollTo({
      behavior: "smooth",
      left: elementsLeft.value,
    });
  }
});
</script>
