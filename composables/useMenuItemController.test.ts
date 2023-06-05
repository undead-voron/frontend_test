import { it, expect } from 'vitest';

import menu from '../assets/menu.json';

import useMenuItemController from './useMenuItemController';

it('check menu item controller', () => {
  const menuItemName = 'Hamburger';
  const price = 20;
  const itemController = useMenuItemController(menuItemName, price);

  const randomIngredientIndex = Math.floor(Math.random() * menu.Ingredient[menuItemName].length - 1);
  const randomIngredient = menu.Ingredient[menuItemName][randomIngredientIndex];

  expect(itemController.name).toBe(menuItemName);
  expect(itemController.price).toBe(price);
  expect(itemController.ingredients.value).toEqual([]);
  itemController.addIngredient(randomIngredient);

  expect(itemController.ingredients.value[0].name).toEqual(randomIngredient);

  itemController.removeIngredient(0);

  expect(itemController.ingredients.value).toEqual([]);
});
