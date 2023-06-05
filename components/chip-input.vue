<template>
  <div
    class="relative flex flex-wrap content-between items-center rounded-sm border border-gray-600 bg-white px-2 pb-2"
    @click="inputEl.focus()"
  >
    <slot />
    <input
      ref="inputEl"
      :value="input"
      class="mx-2 mt-2 h-[32px] w-0 min-w-0 shrink grow border border-white py-1 outline-0"
      @input="$emit('update:input', $event.target.value)"
    />
    <div class="absolute inset-x-0 -bottom-1 z-10 h-0 overflow-visible">
      <ul ref="list" class="max-h-[320px] overflow-auto bg-white outline-0">
        <slot name="list" />
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const inputEl = ref();
defineProps<{ input: string }>();
defineEmits<{
  (e: 'update:input', value: string): void;
}>();
</script>
