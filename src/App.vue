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
    console.log(!!response.data.user);
    if (response.data.user) {
      set_auth_user(true);
      window.Echo.channel(`notification.${response.data.user.id}`)
        .listen(".test", () => console.log("catching event"))
        .subscribed(() => console.log("subscribed"))
        .listen(".notification-update", (e: any) => {
          console.log("event fired:", e);
        })
        .error((error: any) => {
          console.error("Error subscribing to channel:", error);
        });
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
