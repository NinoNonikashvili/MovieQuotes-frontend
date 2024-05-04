<script setup lang="ts">
import { onMounted } from "vue";
import getCsrfToken from "@/services/axios/getCsrfService";
import { checkAuthState } from "./services/axios/auth-services";

onMounted(async () => {
  try {
    await getCsrfToken();
  } catch (err) {
    console.log(err);
  }
  try {
    const response = await checkAuthState();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});

</script>

<template>
  <RouterView> </RouterView>
</template>
