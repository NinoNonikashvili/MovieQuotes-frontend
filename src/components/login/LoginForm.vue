<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import FormCheckbox from "@/components/ui/form/FormCheckbox.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import AuthNotifiaction from "@/components/shared/AuthNotifiaction.vue";
import { useForm } from "vee-validate";

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    user: "required|min:3",
    password: "required|min:8|max:15|low_case_and_numeric",
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
        header_key="form.login_header"
        sub_header_key="form.login_sub_header"
        footer_text_key="form.login_footer_text"
        footer_link="register"
        footer_link_text_key="form.login_footer_link_text"
        :go_back="false"
      >
        <form class="flex flex-col gap-4 my-8 w-full" @submit="onSubmit">
          <FormInputText name="user" />
          <FormInputPassword name="password" />
          <div class="flex w-full justify-between items-center">
            <FormCheckbox name="rememberMe" :checkedValue="true" />
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="ml-1 font-helvetica-400 text-base text-blue-600 underline"
              >{{ $t("form.text_forgot_password") }}
            </RouterLink>
          </div>

          <ButtonFilled :submit="true" text_key="text_sign_in" class="mt-2" />
          <ButtonOutline
            :icon="'IconGmail'"
            text_key="form.text_sign_in_with_google"
            link="auth-gmail"
          />
        </form>
      </AuthLayout>
    </template>
    <template #notification>
      <!-- Email needs to be verified  || link expired notification -->
    </template>
  </AuthLayoutWrapper>
</template>
