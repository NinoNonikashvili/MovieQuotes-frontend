<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import AuthNotifiaction from "@/components/shared/AuthNotifiaction.vue";
import { forgot_password } from "@/services/axios/auth-services";
import { useForm } from "vee-validate";
import type { EmailArgument } from "@/types/types";
import axios, { type AxiosError } from "axios";
import { ref } from "vue";

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: {
    email: "required|email",
  },
});

const showNotification = ref<boolean>(false);
const emailLink = ref<string>("");

const onSubmit = handleSubmit(async (values) => {
  const emailArgument = values as EmailArgument;
  try {
    await forgot_password(emailArgument);

    emailLink.value = emailArgument.email.includes("gmail.com") || emailArgument.email.includes("redberry.ge") 
      ? "https://gmail.com"
      : "";

    showNotification.value = true;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        resetForm({
          errors: {
            email: "User not found",
          },
        });
      }
    }
  }
});
</script>

<template>
  <AuthLayoutWrapper>
    <template #form v-if="!showNotification">
      <AuthLayout
        header_key="form.forgot_password_header"
        sub_header_key="form.forgot_password_sub_header"
        footer_text_key="form.forgot_password_footer_text"
        footer_link="register"
        :go_back="true"
      >
        <form class="flex flex-col gap-4 my-8 w-full" @submit="onSubmit">
          <FormInputText name="email" :required="true"/>
          <ButtonFilled
            :submit="true"
            text_key="form.text_send_instructions"
            class="mt-2"
          />
        </form>
      </AuthLayout>
    </template>
    <template #notification v-if="showNotification">
      <!-- reset link was sent notification -->
      <AuthNotifiaction
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
