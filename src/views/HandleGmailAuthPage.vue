<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { google_auth_callback } from "@/services/axios/auth-services";
import { useUserStore } from "@/stores/user";
import i18n from "@/plugins/i18n";

const user = useUserStore();
const { set_auth_user } = user;

const route = useRoute();
const router = useRouter();
const { locale } = i18n.global;

onBeforeMount(async () => {
  try {
    const resp = await google_auth_callback({ params: route.query });
    console.log(resp);
    set_auth_user(true);
    router.push("profile");
  } catch (err) {
    set_auth_user(false);
    router.push({ name: "login", params: { lang: locale.value } });
  }
});
</script>
