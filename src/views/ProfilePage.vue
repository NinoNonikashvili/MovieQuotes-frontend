<script setup lang="ts">
import { logout } from "@/services/axios/auth-services";
import {  useRouter } from "vue-router";

const logoutFun = async () => {
  await logout();
  const router = useRouter();
  router.push({ name: "home" });
};
</script>

<template>
  <button @click="logoutFun">logout</button>

  <div>profile</div>
</template>
