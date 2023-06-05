import { it, expect } from 'vitest';

import menu from '../assets/menu.json';

import useIngredientsController from './useIngredientsController';

it('test ingredients controller', () => {
  const menuItem = 'Hamburger';
  const controller = useIngredientsController(menuItem);

  expect(controller.values.value.length).toBe(0);

  const randomIngredientIndex = Math.floor(Math.random() * menu.Ingredient[menuItem].length - 1);
  const randomIngredient = menu.Ingredient[menuItem][randomIngredientIndex];

  controller.addIngredient(randomIngredient);

  expect(controller.values.value[0].name).toEqual(randomIngredient);

  controller.removeIngredient(0);

  expect(controller.values.value.length).toBe(0);
});
