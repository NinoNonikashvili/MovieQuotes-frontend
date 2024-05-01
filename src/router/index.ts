import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
import i18n from "@/plugins/i18n";
import type { Locales } from "@/types/types";

const { locale } = i18n.global;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "home", params: { lang: locale.value } },
    },
    {
      path: "/home/:lang",
      name: "home",
      component: HomePage,
    },

    {
      path: "/register/:lang",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/login/:lang",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/forgot-password/:lang",
      name: "forgot-password",
      component: ForgotPasswordPage,
    },
    // TO DO: change component
    {
      path: "/auth-gmail/:lang",
      name: "auth-gmail",
      component: ResetPasswordPage,
    },
    {
      path: "/reset-password/:lang",
      name: "reset-password",
      component: ResetPasswordPage,
    },
  ],
});

router.beforeEach((from, to) => {
  //handle refresh and initial redirect
  if (to.fullPath === "/" && from.params.lang) {
    locale.value = from.params.lang as Locales;
    return;
  }
});

export default router;
