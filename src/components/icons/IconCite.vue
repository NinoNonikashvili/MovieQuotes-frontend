<script setup lang="ts">
const props = defineProps<{ width: string; height: string }>();
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 53 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="-8.74228e-08"
      y1="1"
      x2="53"
      y2="0.999995"
      stroke="white"
      stroke-width="2"
    />
  </svg>
</template>
