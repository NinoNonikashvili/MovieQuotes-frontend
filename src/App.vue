<script setup lang="ts">
import { onMounted } from "vue";
import getCsrfToken from "@/services/axios/getCsrfService";
import { checkAuthState } from "./services/axios/auth-services";
import { useUserStore } from "./stores/user";
import { useQuoteNotificationStore } from "./stores/quote-notifications";
import type { QuoteNotifications } from "./types/types";
import { getNotifications } from "./services/axios/quote-services";

const user = useUserStore();
const { set_auth_user } = user;
const {
  push_notification,
  set_notification,
  setSeenNotCount,
  increaseSeenNotCount,
} = useQuoteNotificationStore();

onMounted(async () => {
  try {
    await getCsrfToken();
  } catch (err) {
    return;
  }
  try {
    const response = await checkAuthState();
    if (response.data.user) {
      set_auth_user(true);
      //fetch notifications
      try {
        const response = await getNotifications();
        set_notification(response.data.data);
        setSeenNotCount(response.data.data);
      } catch (err) {
        return;
      }
      window.Echo.channel(`notification${response.data.user.id}`)
        .listen(".notification-update", (e: QuoteNotifications) => {
          push_notification(e);
          increaseSeenNotCount();
        })
        .error((error: any) => {
          return
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
