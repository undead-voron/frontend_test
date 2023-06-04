import { Ref } from 'vue';

import ingredientsController from '~/composables/ingredientsController';
import type { Ingredient } from '~/types/Ingredient';
import type { MenuList } from '~/types/MenuList';

export default (
  name: keyof MenuList['Menu-Item'],
  price: number
): {
  name: keyof MenuList['Menu-Item'];
  ingredients: Ref<{ name: Ingredient<typeof name>; remove: () => void }[]>;
  addIngredient: (ingredient: Ingredient<typeof name>) => void;
  removeIngredient: (index: number) => void;
  price: number;
  done: boolean;
} => {
  const { values, removeIngredient, addIngredient } = ingredientsController(name);
  return {
    name,
    ingredients: values,
    price,
    done: false,
    addIngredient,
    removeIngredient,
  };
};
