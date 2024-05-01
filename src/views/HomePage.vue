<script setup lang="ts">
import AppHeader from "@/components/shared/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <div>home page</div>
  <RouterLink :to="{ name: 'register' }">register</RouterLink>
</template>
