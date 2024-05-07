<script setup lang="ts">
import { onMounted } from "vue";
import getCsrfToken from "@/services/axios/getCsrfService";
import { checkAuthState } from "./services/axios/auth-services";
import { useUserStore } from "./stores/user";

const user = useUserStore();
const { set_auth_user } = user;
onMounted(async () => {
  try {
    await getCsrfToken();
  } catch (err) {
    console.log(err);
  }
  try {
    const response = await checkAuthState();
    console.log(!!response.data.user)
    if (response.data.user) {
      set_auth_user(true);
    } else {
      set_auth_user(false);
    }
  } catch (err) {
    set_auth_user(false);
  }
});
</script>

<template>
  <RouterView> </RouterView>
</template>
