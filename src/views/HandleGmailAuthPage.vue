<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { google_auth_callback } from "@/services/axios/auth-services";
import { useUserStore } from "@/stores/user";
import i18n from "@/plugins/i18n";
import type { AuthUserData } from "@/types/types";

const user = useUserStore();
const { set_auth_user, set_auth_user_data } = user;

const route = useRoute();
const router = useRouter();
const { locale } = i18n.global;

onBeforeMount(async () => {
  try {
    const data = await google_auth_callback({ params: route.query });
    console.log(data);
    set_auth_user_data(data.data.user_data as AuthUserData)
    set_auth_user(true);
    router.push({name: "news-feed", params:{lang: locale.value}});
  } catch (err) {
    set_auth_user(false);
    router.push({ name: "login", params: { lang: locale.value } });
  }
});
</script>
