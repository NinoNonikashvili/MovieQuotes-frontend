import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordPage,
    },
    // TO DO: change component
    {
      path: "/auth-gmail",
      name: "auth-gmail",
      component: ResetPasswordPage,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordPage,
    },
  ],
});

export default router;
