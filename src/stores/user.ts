import { ref } from "vue";
import { defineStore } from "pinia";
import type { AuthUserData } from "@/types/types";

export const useUserStore = defineStore("user", () => {
  const auth_user = ref<boolean | null>(null);
  const auth_user_data = ref<AuthUserData | null>(null);
  function set_auth_user(state: boolean) {
    auth_user.value = state;
  }
  function set_auth_user_data(payload: AuthUserData) {
    auth_user_data.value = payload;
  }

  return { auth_user, auth_user_data, set_auth_user, set_auth_user_data };
});
