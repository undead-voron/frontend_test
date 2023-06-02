<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/data');
console.log('data', data.value);
</script>
