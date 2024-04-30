<script setup lang="ts"></script>

<template>
  <div>
    <!-- this div will be blured version of landing page served as background -->
    <div class="w-screen h-screen fixed hidden xl:block bg-red-100"></div>
    <div
      class="w-screen h-screen xl:w-[37.5rem] xl:h-fit xl:absolute top-[9.375rem] inset-x-0 mx-auto"
    >
      <slot></slot>
    </div>
  </div>
</template>
