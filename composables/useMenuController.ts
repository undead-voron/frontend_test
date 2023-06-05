import { ref, computed, Ref, unref, UnwrapRef } from 'vue';

import menuItemController from '~/composables/useMenuItemController';
import menuItemsController from '~/composables/useMenuItemsController';
import type { MenuList } from '~/types/MenuList';

export default (
  menu: MenuList
): {
  receiptState: Ref<UnwrapRef<ReturnType<typeof menuItemController>>[]>;
  currentMenuListState: Ref<'Menu-Item' | 'Ingredient' | false>;
  addMenuItem: (itemName: keyof MenuList['Menu-Item']) => void;
  addIngredient: (name: string) => void;
  changeMenuState: (state: 'Menu-Item' | 'Ingredient' | false) => void;
  menuList: ComputedRef<{ name: string; handler: () => void }[]>;
  removeMenuItem: (index: number) => void;
  removeIngredient: (menuItemIndex: number, ingredientIndex: number) => void;
  totalPrice: ComputedRef<number>;
  removeAnd: (index: number) => void;
  done: () => void;
} => {
  const currentMenuListState = ref<'Menu-Item' | 'Ingredient' | false>(false);

  const { done, removeAnd, receiptState, hasMenuItem, isLastElementComplited, ...menuController } =
    menuItemsController(menu);

  const allowIngredients = computed(() => hasMenuItem.value && !isLastElementComplited.value);
  const allowAnd = computed(() => hasMenuItem.value && !isLastElementComplited.value);

  const changeMenuState = (state: 'Menu-Item' | 'Ingredient' | false): void => {
    currentMenuListState.value = state;
  };
  const menuList = computed(() => {
    if (currentMenuListState.value === 'Ingredient') {
      return menu.Ingredient[receiptState.value[receiptState.value.length - 1].name].map((ingredientName) => {
        return {
          name: ingredientName,
          handler: (): void => {
            menuController.addIngredient(ingredientName);
            changeMenuState(false);
          },
        };
      });
    }
    if (currentMenuListState.value === 'Menu-Item') {
      return Object.keys(menu['Menu-Item']).map((name) => {
        return {
          name,
          handler: (): void => {
            menuController.addMenuItem(name as keyof MenuList['Menu-Item']);
            changeMenuState(false);
          },
        };
      });
    }
    const defaultItems = ['Menu-Item'];
    if (allowIngredients.value) {
      defaultItems.push('Ingredient');
    }
    const result = defaultItems.map((name) => ({
      name,
      handler: (): void => {
        changeMenuState(name as 'Menu-Item' | 'Ingredient');
      },
    }));
    if (allowAnd.value) {
      result.push({
        name: menu.And,
        handler: () => {
          receiptState.value[receiptState.value.length - 1].done = true;
          changeMenuState(false);
        },
      });
    }
    return result;
  });

  const handleRemoveAnd = (index: number): void => {
    removeAnd(index);
    currentMenuListState.value = false;
  };

  const handleDone = (): void => {
    // handle input blur
    changeMenuState(false);
    done();
  };

  return {
    ...menuController,
    receiptState,
    currentMenuListState,
    changeMenuState,
    menuList,
    totalPrice: computed(() => receiptState.value.reduce<number>((acc, value) => acc + value.price, 0)),
    removeAnd: handleRemoveAnd,
    done: handleDone,
  };
};
