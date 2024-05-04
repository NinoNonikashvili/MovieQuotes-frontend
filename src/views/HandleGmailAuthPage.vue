<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { google_auth_callback } from "@/services/axios/auth-services";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const { set_auth_user } = user;

const route = useRoute();
const router = useRouter();
console.log(route.query.code);

onBeforeMount(async () => {
  try {
    await google_auth_callback({ params: route.query });
    set_auth_user(true);
    router.push("profile");
  } catch (err) {
    set_auth_user(false);
    router.push("login");
  }
});
</script>
