import { it, expect } from 'vitest';

import menu from '../assets/menu.json';

import useMenuItemsController from './useMenuItemsController';

it('test menu items controller', () => {
  const controller = useMenuItemsController(menu);

  const menuItemName = 'Hamburger';
  const randomIngredientIndex = Math.floor(Math.random() * menu.Ingredient[menuItemName].length - 1);
  const randomIngredient = menu.Ingredient[menuItemName][randomIngredientIndex];

  expect(controller.hasMenuItem.value).toBe(false);

  controller.addMenuItem(menuItemName);

  expect(controller.hasMenuItem.value).toBe(true);
  expect(controller.receiptState.value.length).toBe(1);
  expect(controller.isLastElementComplited.value).toBe(false);
  expect(controller.receiptState.value[0].ingredients.length).toBe(0);

  controller.addIngredient(randomIngredient);

  expect(controller.hasMenuItem.value).toBe(true);
  expect(controller.receiptState.value.length).toBe(1);
  expect(controller.isLastElementComplited.value).toBe(false);
  expect(controller.receiptState.value[0].ingredients.length).toBe(1);

  controller.done();

  expect(controller.hasMenuItem.value).toBe(true);
  expect(controller.receiptState.value.length).toBe(1);
  expect(controller.isLastElementComplited.value).toBe(true);
  expect(controller.receiptState.value[0].ingredients.length).toBe(1);

  controller.removeIngredient(0, 0);

  expect(controller.hasMenuItem.value).toBe(true);
  expect(controller.receiptState.value.length).toBe(1);
  expect(controller.isLastElementComplited.value).toBe(true);
  expect(controller.receiptState.value[0].ingredients.length).toBe(0);

  controller.removeAnd(0);

  expect(controller.hasMenuItem.value).toBe(true);
  expect(controller.receiptState.value.length).toBe(1);
  expect(controller.isLastElementComplited.value).toBe(false);
  expect(controller.receiptState.value[0].ingredients.length).toBe(0);

  controller.removeMenuItem(0);

  expect(controller.hasMenuItem.value).toBe(false);
  expect(controller.receiptState.value.length).toBe(0);
  expect(controller.isLastElementComplited.value).toBe(false);
});
