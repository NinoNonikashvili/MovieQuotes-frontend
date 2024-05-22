import { logout } from "@/services/axios/auth-services";
import { useRouter } from "vue-router";
import i18n from "@/plugins/i18n";
import { useUserStore } from "@/stores/user";

export const useLogout = () => {
    const userStore = useUserStore();
    const { set_auth_user } = userStore;
    const router = useRouter();
    const { locale } = i18n.global;
  
    const logoutFun = async () => {
      await logout();
      set_auth_user(false);
      router.push({ name: "home", params: { lang: locale.value } });
    };
  
    return { logoutFun };
  };
