<template>
  <div class="flex flex-col">
    <div class="flex flex-row justofy-center items-center">
      <img src="/hamburger.png" class="mx-4 h-10 flex" />
      <h1 class="text-xl font-bold">YOLO</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/data');
console.log('data', data.value);
</script>
