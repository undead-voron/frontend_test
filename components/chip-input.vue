<template>
  <div
    class="relative flex flex-wrap content-between items-center rounded-sm border border-gray-600 bg-white px-2 pb-2"
    @click="inputEl.focus()"
  >
    <slot />
    <input
      ref="inputEl"
      v-model="currentInput"
      class="mx-2 mt-2 h-[32px] w-0 min-w-0 shrink grow border border-white py-1 outline-0"
      :class="inputClasses"
    />
    <div class="absolute inset-x-0 -bottom-1 z-10 h-0 overflow-visible">
      <ul ref="list" class="max-h-[320px] overflow-auto bg-white outline-0">
        <slot name="list" />
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

// import CrossIcon from '~/components/icons/cross.vue';

// const props = defineProps<{ chips: string[] }>();
// const emit = defineEmits<{
//   (e: 'update:chips', value: string[]): void;
// }>();

const currentInput = ref<string>('');
const inputEl = ref();
// const saveChip = () => {
//   if (currentInput.value && !props.chips.includes(currentInput.value)) {
//     emit('update:chips', [...props.chips, currentInput.value]);
//   }
//   currentInput.value = '';
// };
// const deleteChip = (chipString: string) => {
//   const index = props.chips.findIndex((el) => el === chipString);
//   if (index > -1) {
//     emit('update:chips', [...props.chips.slice(0, index), ...props.chips.slice(index + 1, props.chips.length)]);
//   }
// };
// const backspaceDelete = ({ which }: KeyboardEvent) => {
//   if (which == 8 && currentInput.value === '') {
//     deleteChip(props.chips[props.chips.length - 1]);
//   }
// };

const inputClasses = computed(() => ({
  //   'h-0': !currentInput.value && props.chips.length,
  //   'py-xs/2 mt-sm/2': currentInput.value || !props.chips.length,
}));
</script>
