<script setup lang="ts">
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import AuthNotifiaction from "@/components/shared/AuthNotifiaction.vue";
import { useForm } from "vee-validate";


const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    name: "required|min:3|max:15|low_case_and_numeric",
    email: "required|email",
    password: "required|min:8|max:15|low_case_and_numeric",
    password_confirmation: "required|confirmed:@password",
  },
});

const onsubmit = handleSubmit((values) => {
  console.log(values);

  //send request
  //if email already exists
  resetForm({
    errors: {
      email: "email already taken",
    },
  });
});

</script>

<template>

  <AuthLayoutWrapper>
    <template #form v-if="true">
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
          <ButtonFilled :submit="true" text_key="form.text_register" class="mt-2" />
          <ButtonOutline
            :icon="'IconGmail'"
            text_key="form.text_sign_up_with_google"
            link="auth-gmail"
          />
        </form>
      </AuthLayout>
    </template>

    <template #notification v-if="false">
      <!-- check email notification -->

      <AuthNotifiaction
        :icon="'IconEmailSent'"
        header_key="form.notification_success_header"
        paragraph_key="form.notification_success_email_sent_p"
        link="login"
        link_text_key="form.text_go_to_email"
        :go_back="false"
      />
      <!-- email successfully verified notification -->
      <AuthNotifiaction
        :icon="'IconEmailVerified'"
        header_key="form.notification_success_header"
        paragraph_key="form.notification_success_email_verified_p"
        link="login"
        link_text_key="form.text_go_to_login"
      />
    </template>
  </AuthLayoutWrapper>
</template>
