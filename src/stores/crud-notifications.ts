import { ref } from "vue";
import { defineStore } from "pinia";
import { crudNotifications } from "@/types/constants";

export const useNotificationStore = defineStore("notifications", () => {
  const status = ref<typeof crudNotifications[number] | null>();

  function set_status(val : typeof crudNotifications[number] | null){
    status.value = val
  }

  return { status, set_status};
});
