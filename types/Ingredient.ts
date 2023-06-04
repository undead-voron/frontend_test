import type { MenuList } from '~/types/MenuList';

export type Ingredient<T extends keyof MenuList['Ingredient']> = MenuList['Ingredient'][T] extends Array<
  infer IngredientElement
>
  ? IngredientElement
  : never;
