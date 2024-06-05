<script setup lang="ts">
import { onMounted } from "vue";
import getCsrfToken from "@/services/axios/getCsrfService";
import { checkAuthState } from "./services/axios/auth-services";
import { useUserStore } from "./stores/user";
import { storeToRefs } from "pinia";

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);
const { set_auth_user } = user;

onMounted(async () => {
  try {
    await getCsrfToken();
  } catch (err) {
    console.log(err);
  }
  try {
    const response = await checkAuthState();
    console.log(!!response.data.user);
    if (response.data.user) {
      set_auth_user(true);
    } else {
      set_auth_user(false);
    }
  } catch (err) {
    set_auth_user(false);
  }

  if (auth_user_data.value?.id) {
    console.log("inside nmbb", auth_user_data.value);
    window.Echo.private(`notification.${auth_user_data.value.id}`)
      .subscribed(() => console.log("subscribed"))
      .listen(".notification-update", (e: any) =>
        console.log("event fired:", e),
      )
      .error((error: any) => {
        console.error("Error subscribing to channel:", error);
      });
  }
});
</script>

<template>
  <RouterView> </RouterView>
</template>
