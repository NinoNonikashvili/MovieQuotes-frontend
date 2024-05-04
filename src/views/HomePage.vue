<script setup lang="ts">
import AppHeader from "@/components/shared/AppHeader.vue";
import { logout } from "@/services/axios/auth-services";

const logoutFun = async () => {
  await logout();
};
</script>

<template>
  <AppHeader />
  <div>home page</div>
  <button @click="logoutFun">logout</button>

  <RouterLink :to="{ name: 'register' }">register</RouterLink>
</template>
