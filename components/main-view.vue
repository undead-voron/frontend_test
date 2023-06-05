<template>
  <chip-input ref="inputTarget" v-model:input="inputController" class="mt-3" @click="inputClickHandler()">
    <template #default>
      <chip-element v-for="({ name, classes, remove }, index) of chips" :key="name + index" :class="classes">
        {{ name }}
        <close-button class="ml-2" :class="classes" @click="remove" />
      </chip-element>
      <chip-element v-if="currentMenuListState === 'Menu-Item'" class="border-blue-600 bg-blue-200 text-blue-600">
        Menu-Item
        <close-button class="ml-2 border-blue-600" @click="changeMenuState(false)" />
      </chip-element>
      <chip-element v-if="currentMenuListState === 'Ingredient'" class="border-pink-600 bg-pink-200 text-pink-600">
        Ingredient
        <close-button class="ml-2 border-pink-600" @click="changeMenuState(false)" />
      </chip-element>
    </template>
    <template v-if="isDropdownVisible" #list>
      <li
        v-for="{ name, handler } of filteredMenuList"
        :key="name"
        class="flex bg-white p-3"
        @click="handleListClick(handler)"
      >
        {{ name }}
      </li>
    </template>
  </chip-input>
  <div v-if="!isDropdownVisible && chips.length" class="mt-5 flex w-full flex-col bg-white p-3">
    <span v-for="{ name, price } of receiptState" :key="name + price">{{ name }}: {{ price }}</span>
    <span>total: {{ totalPrice }}</span>
  </div>
</template>
<script lang="ts" setup>
import ChipElement from '~/components/chip-element.vue';
import type { MenuList } from '~/types/MenuList';

const props = defineProps<{ menu: MenuList }>();

const {
  menuList,
  receiptState,
  currentMenuListState,
  changeMenuState,
  removeMenuItem,
  removeIngredient,
  totalPrice,
  removeAnd,
  done,
} = menuController(props.menu);

const inputTarget = ref();
const isDropdownVisible = ref(false);
const inputController = ref('');
const handleListClick = (handler: () => void) => {
  handler();
  inputController.value = '';
};

const filteredMenuList = computed(() => {
  const filter = inputController.value.toLowerCase();
  return menuList.value.filter((el) => !inputController.value || el.name.toLocaleLowerCase().includes(filter));
});

const chips = computed(() => {
  const result = [];
  for (const [menuItemIndex, menuItem] of receiptState.value.entries()) {
    result.push({
      name: `M / ${menuItem.name}`,
      classes: 'text-blue-600 bg-blue-200 border-blue-600',
      remove: () => {
        removeMenuItem(menuItemIndex);
      },
    });
    for (const [ingredientIndex, ingredient] of menuItem.ingredients.entries()) {
      result.push({
        name: `I / ${ingredient.name}`,
        classes: 'text-pink-600 bg-pink-200 border-pink-600',
        remove: () => {
          removeIngredient(menuItemIndex, ingredientIndex);
        },
      });
    }
    if (menuItem.done) {
      result.push({
        name: props.menu.And,
        classes: 'text-orange-600 bg-orange-200 border-orange-600',
        remove: () => {
          removeAnd(menuItemIndex);
        },
      });
    }
  }
  return result;
});
const clickOutside = () => {
  done();
  isDropdownVisible.value = false;
};
onClickOutside(inputTarget, () => clickOutside());
const inputClickHandler = () => {
  isDropdownVisible.value = true;
};
</script>
