import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
import EmailVerifiedPage from "@/views/EmailVerifiedPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import i18n from "@/plugins/i18n";
import type { Locales } from "@/types/types";
import { setLocale } from "@vee-validate/i18n";
import HandleGmailAuthPage from "@/views/HandleGmailAuthPage.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { checkAuthState } from "@/services/axios/auth-services";

const { locale } = i18n.global;

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "home", params: { lang: locale.value } },
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/home/:lang",
      name: "home",
      component: HomePage,
      meta: {
        requiresAuth: false,
      },
    },

    {
      path: "/register/:lang",
      name: "register",
      component: RegisterPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/email/verify/:lang/:id/:hash",
      name: "email-verified",
      component: EmailVerifiedPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login/:lang",
      name: "login",
      component: LoginPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/forgot-password/:lang",
      name: "forgot-password",
      component: ForgotPasswordPage,
      meta: {
        requiresAuth: false,
      },
    },
    // TO DO: change component

    {
      path: "/reset-password/:lang",
      name: "reset-password",
      component: ResetPasswordPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/callback",
      name: "gmail-callback",
      component: HandleGmailAuthPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const user = useUserStore();
  const { auth_user } = storeToRefs(user);
  const { set_auth_user } = user;
  //set language from url
  if (to.params.lang) {
    locale.value = to.params.lang as Locales;
    if (locale.value === "ge") {
      setLocale("ka");
    } else {
      setLocale(locale.value);
    }
  }

  //check auth
  if (auth_user.value === null) {
    try {
      const response = await checkAuthState();
      if (response.data.user) {
        set_auth_user(true);
      } else [set_auth_user(false)];
    } catch (err) {
      return;
    }
  }

  if (to.meta.requiresAuth) {
    if (auth_user.value) {
      //allow
      return;
    } else {
      if (from.name !== "login") {
        return {
          path: "/login/en",
        };
      }
    }
  } else {
    if (auth_user.value && from.name !== "profile") {
      //to profile
      return {
        name: "profile",
      };
    } else {
      return;
    }
  }
});

export default router;
