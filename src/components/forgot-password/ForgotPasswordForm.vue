<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import { forgot_password } from "@/services/axios/auth-services";

import { useForm } from "vee-validate";
import type { EmailArgument } from "@/types/types";

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    email: "required|email",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const emailArgument = values as EmailArgument;
  try {
    await forgot_password(emailArgument);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <AuthLayoutWrapper>
    <template #form>
      <AuthLayout
        header_key="form.forgot_password_header"
        sub_header_key="form.forgot_password_sub_header"
        footer_text_key="form.forgot_password_footer_text"
        footer_link="register"
        :go_back="true"
      >
        <form class="flex flex-col gap-4 my-8 w-full" @submit="onSubmit">
          <FormInputText name="email" />
          <ButtonFilled
            :submit="true"
            text_key="form.text_send_instructions"
            class="mt-2"
          />
        </form>
      </AuthLayout>
    </template>
    <template #notification>
      <!-- reset link was sent notification -->
    </template>
  </AuthLayoutWrapper>
</template>
