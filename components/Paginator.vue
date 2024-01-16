<template>
  <PaginationRoot
    v-model:page="pageModel"
    :total="props.total"
    :sibling-count="1"
    show-edges
    :default-page="1"
    :items-per-page="props.itemsPerPage"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-2 text-black"
    >
      <PaginationPrev
        class="flex h-12 w-12 items-center justify-center rounded-lg border border-transparent text-orange-200 shadow-elevated outline-none transition-colors focus-within:border-orange-100 disabled:text-black/40"
      >
        <IconArrowRight class="h-5 rotate-180" />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="flex h-12 w-12 items-center justify-center rounded-lg border border-transparent shadow-elevated outline-none transition-colors focus-within:border-orange-100 disabled:text-black/50"
          :class="{
            '!border-orange-200': page.value === pageModel,
          }"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="flex h-12 w-12 items-center justify-center rounded-lg border border-transparent shadow-elevated outline-none transition-colors focus-within:border-orange-100 disabled:text-black/50"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext
        class="flex h-12 w-12 items-center justify-center rounded-lg border border-transparent text-orange-200 shadow-elevated outline-none transition-colors focus-within:border-orange-100 disabled:text-black/40"
      >
        <IconArrowRight class="h-5" />
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>

<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'radix-vue'

const props = defineProps<{
  total?: number
  itemsPerPage?: number
}>()

const pageModel = defineModel<number>('page')

</script>
