import { ref } from 'vue';

import type { Ingredient } from '~/types/Ingredient';
import { MenuList } from '~/types/MenuList';

export default (
  name: keyof MenuList['Menu-Item']
): {
  values: Ref<{ name: Ingredient<typeof name>; remove: () => void }[]>;
  addIngredient: (ingredient: Ingredient<typeof name>) => void;
  removeIngredient: (index: number) => void;
} => {
  const ingredients = ref<{ name: Ingredient<typeof name>; remove: () => void }[]>([]);
  return {
    values: ingredients,
    addIngredient: (ingredient: Ingredient<typeof name>): void => {
      const ingredientEl = {
        name: ingredient,
        remove: (): void => {
          const elIndex = ingredients.value.findIndex((el) => el === ingredientEl);
          ingredients.value = ingredients.value = [
            ...ingredients.value.slice(0, elIndex),
            ...ingredients.value.slice(elIndex + 1, ingredients.value.length),
          ];
        },
      };
      ingredients.value = [...ingredients.value, ingredientEl];
    },
    removeIngredient: (index: number): void => {
      ingredients.value = [
        ...ingredients.value.slice(0, index),
        ...ingredients.value.slice(index + 1, ingredients.value.length),
      ];
    },
  };
};
