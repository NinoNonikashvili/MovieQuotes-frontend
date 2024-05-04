import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const auth_user = ref<boolean | null>(null);
  function set_auth_user(state: boolean) {
    auth_user.value = state;
  }

  return { auth_user, set_auth_user };
});
