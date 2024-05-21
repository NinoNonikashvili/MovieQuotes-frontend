<script setup lang="ts">
import AuthBackground from "@/components/layouts/AuthBackground.vue";
import VerificationMessages from "@/components/shared/VerificationMessages.vue";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import { verifyEmail } from "@/services/axios/auth-services";

const route = useRoute();
const isVerified = ref<boolean>(false);
const email = ref<string>("");
const loading = ref<boolean>(true);

const verifyUser = async () => {
  let payload =
    route.params.id +
    "/" +
    route.params.hash +
    "?expires=" +
    route.query.expires +
    "&signature=" +
    route.query.signature;
  try {
    const resp = await verifyEmail(payload);
    loading.value = false;
    isVerified.value = true;
    console.log(resp);
  } catch (err: any) {
    loading.value = false;
    isVerified.value = false;
    email.value = err?.response.data.email;
    console.log(err);
  }
};

watch(() => route.params.id, verifyUser, { immediate: true });
</script>

<template>
  <AuthBackground>
    <div v-if="loading">loader</div>
    <VerificationMessages
      v-if="!loading"
      :isVerified="isVerified"
      :email="email"
      handler="handleSendAgainEmailVerification"
    />
  </AuthBackground>
</template>
