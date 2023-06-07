<template>
  <div class="flex h-screen flex-col items-center justify-center bg-brand-primary bg-cover">
    <header class="flex w-full shrink-0 items-center justify-center bg-gray-900 p-2 text-center">
      <img src="/hamburger.png" class="mx-4 flex h-4" />
      <span class="text-white">YOLO</span>
    </header>
    <div class="flex h-full w-full flex-row justify-center bg-white/75 md:items-center">
      <nuxt-page class="mx-2 mt-5 max-w-6xl grow md:items-center md:justify-center" />
    </div>
  </div>
</template>
