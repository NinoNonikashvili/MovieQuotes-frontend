<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  console.log(route.params.id);
// load movie quotes
});
</script>

<template>
  <div>single movie</div>
</template>
