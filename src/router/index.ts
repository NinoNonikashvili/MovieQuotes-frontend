import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
import EmailVerifiedPage from "@/views/EmailVerifiedPage.vue";
import i18n from "@/plugins/i18n";
import type { Locales } from "@/types/types";
import { setLocale } from "@vee-validate/i18n";

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
      path: "/email/verify/:lang/:id/:hash",
      name: "email-verified",
      component: EmailVerifiedPage,
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
    if (locale.value === "ge") {
      setLocale("ka");
    } else {
      setLocale(locale.value);
    }
    return;
  }
});

export default router;
