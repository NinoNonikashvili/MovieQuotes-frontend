<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";

import { useForm } from "vee-validate";

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    password: "required|min:8|max:15|low_case_and_numeric",
    password_confirmation: "required|confirmed:@password",
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
<AuthLayoutWrapper>
  <template #form>
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
      <ButtonFilled :submit="true" text_key="form.text_reset_password" class="mt-2" />
    </form>
  </AuthLayout>
  </template>
  <template #notification>
<!-- password was changed notification -->
  </template>
</AuthLayoutWrapper>

</template>
