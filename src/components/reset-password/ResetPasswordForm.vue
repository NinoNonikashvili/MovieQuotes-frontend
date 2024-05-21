<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
import type { ResetPasswordConfig } from "@/types/types";
import { reset_password } from "@/services/axios/auth-services";
import { ref } from "vue";
import VerificationMessages from "@/components/shared/VerificationMessages.vue";

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    password: "required|min:8|max:15|low_case_and_numeric",
    password_confirmation: "required|confirmed:@password",
  },
});

const route = useRoute();
const showNotification = ref<boolean>(false);
const isVerified = ref<boolean>(false);
const email = route.query.email as string;

const onSubmit = handleSubmit(async (values) => {
  let resetPasswordConfig: ResetPasswordConfig = {
    password: values.password,
    password_confirmation: values.password_confirmation,
    email: email,
    token: route.query.token as string,
  };
  try {
    const response = await reset_password(resetPasswordConfig);
    console.log(response);
    showNotification.value = true;
    isVerified.value = true;
  } catch (err) {
    showNotification.value = true;
    isVerified.value = false;
    console.log(err);
  }
});
</script>

<template>
  <AuthLayoutWrapper>
    <template #form v-if="!showNotification">
      <AuthLayout
        header_key="form.reset_password_header"
        sub_header_key="form.reset_password_sub_header"
        footer_text_key="form.reset_password_footer_text"
        footer_link="register"
        :go_back="true"
      >
        <form class="flex flex-col gap-4 my-8 w-full" @submit="onSubmit">
          <FormInputPassword name="password" />
          <FormInputPassword name="password_confirmation" />
          <ButtonFilled
            :submit="true"
            text_key="form.text_reset_password"
            class="mt-2"
          />
        </form>
      </AuthLayout>
    </template>
    <template #notification v-if="showNotification">

      <VerificationMessages
        :isVerified="isVerified"
        :email="email"
        handler="handleSendAgainPasswordResset"
      />
    </template>
  </AuthLayoutWrapper>
</template>
