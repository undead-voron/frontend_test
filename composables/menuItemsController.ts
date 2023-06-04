import { ref, computed, unref, Ref, UnwrapRef } from 'vue';

import menuItemController from '~/composables/menuItemController';
import { MenuList } from '~/types/MenuList';

export default (
  menu: MenuList
): {
  receiptState: Ref<UnwrapRef<ReturnType<typeof menuItemController>>[]>;
  hasMenuItem: ComputedRef<boolean>;
  isLastElementComplited: ComputedRef<boolean>;
  removeMenuItem: (index: number) => void;
  removeIngredient: (menuItemIndex: number, ingredientIndex: number) => void;
  removeAnd: (index: number) => void;
  done: () => void;
  addIngredient: (name: string) => void;
  addMenuItem: (itemName: keyof MenuList['Menu-Item']) => void;
} => {
  const items = ref<ReturnType<typeof menuItemController>[]>([]);
  const hasMenuItem = computed(() => !!items.value.length);
  const lastMenuItem = computed(() => items.value[items.value.length - 1]);
  const isLastElementComplited = computed(() => lastMenuItem.value?.done);

  const addMenuItem = (itemName: keyof MenuList['Menu-Item']): void => {
    const item = menuItemController(itemName, menu['Menu-Item'][itemName]);
    if (lastMenuItem.value) {
      lastMenuItem.value.done = true;
    }
    items.value = [...items.value, unref(ref(item))];
  };
  const removeMenuItem = (index: number): void => {
    items.value = [...items.value.slice(0, index), ...items.value.slice(index + 1, items.value.length)];
  };
  const addIngredient = (name: string): void => {
    if (lastMenuItem.value) {
      lastMenuItem.value.addIngredient(name);
    }
  };
  const removeIngredient = (menuItemIndex: number, ingredientIndex: number): void => {
    const item = items.value[menuItemIndex];
    if (item) {
      item.removeIngredient(ingredientIndex);
    }
  };

  const removeAnd = (index: number): void => {
    if (index !== items.value.length - 1 && lastMenuItem.value) {
      // need to stop editing current entry
      lastMenuItem.value.done = true;
    }
    const entryToEdit = items.value[index];
    // move entry to the end for editing
    entryToEdit.done = false;
    items.value = [...items.value.slice(0, index), ...items.value.slice(index + 1, items.value.length), entryToEdit];
  };

  const done = (): void => {
    if (lastMenuItem.value) {
      lastMenuItem.value.done = true;
    }
  };

  return {
    receiptState: items,
    removeMenuItem,
    addIngredient,
    removeIngredient,
    removeAnd,
    done,
    addMenuItem,
    hasMenuItem,
    isLastElementComplited,
  };
};
