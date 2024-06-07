import type { Quote, QuoteNotifications } from "@/types/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuoteNotificationStore = defineStore(
  "quoteNotifications",
  () => {
    const notifications = ref<QuoteNotifications[]>([]);

    const set_notification = (payload: QuoteNotifications[]) => {
      notifications.value = payload;
    };
    const seenNotificationNum = ref<number>(0);

    const push_notification = (payload: QuoteNotifications) => {
      notifications.value.unshift(payload);
    };
    const setSeenNotCount = (notifications: QuoteNotifications[]) => {
      seenNotificationNum.value = notifications.filter(
        (not) => !not.seen,
      ).length;
    };
    const decreaseSeenNotCount = () => {
      seenNotificationNum.value--;
    };
    const increaseSeenNotCount = () => {
      seenNotificationNum.value++;
    };

    const resetSeenNotCount = () => {
      seenNotificationNum.value = 0;
    };
    return {
      notifications,
      seenNotificationNum,
      push_notification,
      set_notification,
      decreaseSeenNotCount,
      setSeenNotCount,
      increaseSeenNotCount,
      resetSeenNotCount,
    };
  },
);
