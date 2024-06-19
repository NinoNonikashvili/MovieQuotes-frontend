import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/plugins/i18n";
import type { Locales } from "@/types/types";
import { setLocale } from "@vee-validate/i18n";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { checkAuthState } from "@/services/axios/auth-services";


const HandleGmailAuthPage = () => import("@/views/HandleGmailAuthPage.vue")
const ErrorFrontPage = () => import("@/views/ErrorFrontPage.vue")
const ErrorServerpage = () => import("@/views/ErrorServerpage.vue")
const HomePage = () => import("@/views/HomePage.vue");
const RegisterPage = () => import("@/views/RegisterPage.vue");
const LoginPage = () => import("@/views/LoginPage.vue");
const ResetPasswordPage = () => import("@/views/ResetPasswordPage.vue");
const ForgotPasswordPage = () => import("@/views/ForgotPasswordPage.vue");
const EmailVerifiedPage = () => import("@/views/EmailVerifiedPage.vue");
const NewsFeedPage = () => import("@/views/NewsFeedPage.vue");
const ProfilePage = () => import("@/views/ProfilePage.vue");
const MoviesPage = () => import("@/views/MoviesPage.vue");
const MoviePage = () => import("@/views/MoviePage.vue");
const MovieContainer = () => import("@/views/MovieContainer.vue");

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
      path: "/news-feed/:lang",
      name: "news-feed",
      component: NewsFeedPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile/:lang",
      name: "profile",
      component: ProfilePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/movies/",
      name: "movies",
      // beforeEnter: [loadMovies],
      redirect: (to) => {
        // the function receives the target route as the argument
        // we return a redirect path/location here.
        return { name: "movies-all", params: { lang: to.params.lang } };
      },
      component: MovieContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/movies/:lang/all",
          name: "movies-all",
          component: MoviesPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/movies/:lang/single/:id",
          name: "movie",
          component: MoviePage,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },

    {
      path: "/:wrongUrl",
      name: "not-found",
      component: ErrorFrontPage,
    },
    {
      path: "/server-error",
      name: "server-error",
      component: ErrorServerpage,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const user = useUserStore();
  const { auth_user } = storeToRefs(user);
  const { set_auth_user, set_auth_user_data } = user;
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
        set_auth_user_data(response.data.user);
      } else {
        set_auth_user(false);
      }
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
          name: "login",
          params: { lang: locale.value },
        };
      }
    }
  } else {
    if (auth_user.value && from.name !== "news-feed") {
      //to profile
      return {
        name: "news-feed",
        params: { lang: locale.value },
      };
    } else {
      return;
    }
  }
});

export default router;
