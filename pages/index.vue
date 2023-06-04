<template>
  <div class="flex flex-col">
    <div class="flex w-full flex-col">
      <div class="flex flex-row items-center justify-center">
        <img src="/hamburger.png" class="mx-4 flex h-10" />
        <h1 class="text-xl font-bold">YOLO</h1>
      </div>
      <main-view v-if="data?.body" :menu="data.body" />
    </div>
  </div>
</template>
<script setup lang="ts">
import MainView from '~/components/main-view.vue';

const { data } = await useFetch('/api/data');
</script>
