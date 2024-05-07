<script setup lang="ts">
import type { VerificationMessageProps } from "@/types/types";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import AuthNotifiaction from "@/components/shared/AuthNotifiaction.vue";
import type { EmailArgument } from "@/types/types";
import { resendEmailVerification } from "@/services/axios/auth-services";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const props = defineProps<VerificationMessageProps>();
const linkIsResent = ref<boolean>(false);
const router = useRouter();

const argument: EmailArgument = {
  email: props.email,
};

const handleSendAgainBtn = async () => {
  try {
    await resendEmailVerification(argument);
    linkIsResent.value = true;
  } catch (err: any) {
    // user was not found with email
    if (err?.response.status === 404) {
      router.push({ name: "register" });
    }
  }
};

const emailLink = computed(() => {
  if (props.email.includes("gmail.com")) {
    return "https://gmail.com";
  }
  return "";
});
</script>
<template>
  <AuthLayoutWrapper>
    <template #notification>
      <!-- email successfully verified notification -->
      <AuthNotifiaction
        v-if="props.isVerified"
        :icon="'IconEmailVerified'"
        header_key="form.notification_success_header"
        paragraph_key="form.notification_success_email_verified_p"
        link="login"
        link_text_key="form.text_go_to_login"
        :redirect="false"
      />

      <!-- link expired send again -->
      <AuthNotifiaction
        @click="handleSendAgainBtn"
        v-if="!props.isVerified && !linkIsResent"
        :icon="'IconLinkExpired'"
        header_key="form.notification_link_expired_header"
        paragraph_key="form.notification_link_expired_p"
        link=""
        link_text_key="form.notification_link_expired_button_text"
        :redirect="false"
      />
      <!-- link is resent -->
      <AuthNotifiaction
        v-if="linkIsResent"
        :icon="'IconEmailSent'"
        header_key="form.notification_success_header"
        paragraph_key="form.notification_success_email_sent_p"
        :link="emailLink"
        link_text_key="form.text_go_to_email"
        :go_back="false"
        :redirect="true"
      />
    </template>
  </AuthLayoutWrapper>
</template>
