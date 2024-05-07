<script setup lang="ts">
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import AuthNotifiaction from "@/components/shared/AuthNotifiaction.vue";
import { useForm } from "vee-validate";
import type { RegisterUser } from "@/types/types";
import { register } from "@/services/axios/auth-services";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { computed, ref } from "vue";
import { useGmail } from "@/composables/google-auth";

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    name: "required|min:3|max:15|low_case_and_numeric",
    email: "required|email",
    password: "required|min:8|max:15|low_case_and_numeric",
    password_confirmation: "required|confirmed:@password",
  },
});
const showNotification = ref<boolean>(false);
const data = ref<AxiosResponse | null>(null);

const emailLink = computed(() => {
  if (data?.value?.data.data.email.includes("gmail.com")) {
    return "https://gmail.com";
  }
  return "";
});

const onsubmit = handleSubmit(async (values) => {
  const formValues = values as RegisterUser;
  try {
    data.value = await register(formValues);
    console.log(data.value?.data.data.email);
    showNotification.value = true;
  } catch (error) {
    const err = error as Error | AxiosError;
    console.log();
    if (axios.isAxiosError(err)) {
      const errors = err.response?.data.errors;
      Object.keys(errors).forEach((key) => {
        errors[key] = errors[key][0];
      });
      resetForm({
        errors,
      });
    } else {
      console.log("unexpected error");
    }
  }
});
</script>

<template>
  <AuthLayoutWrapper>
    <template #form v-if="!showNotification">
      <AuthLayout
        header_key="form.register_header"
        sub_header_key="form.register_sub_header"
        footer_text_key="form.register_have_an_account_question"
        footer_link="login"
        footer_link_text_key="form.text_login"
      >
        <form class="flex flex-col gap-4 my-8 w-full" @submit="onsubmit">
          <FormInputText name="name" />
          <FormInputText name="email" />
          <FormInputPassword name="password" />
          <FormInputPassword name="password_confirmation" />
          <ButtonFilled
            :submit="true"
            text_key="form.text_register"
            class="mt-2"
          />
          <ButtonOutline
            @click="useGmail"
            :icon="'IconGmail'"
            text_key="form.text_sign_up_with_google"
            link=""
          />
        </form>
      </AuthLayout>
    </template>

    <template #notification v-if="showNotification">
      <!-- check email notification -->

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
