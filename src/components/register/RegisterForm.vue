<script setup lang="ts">
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
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
  <div
    class="w-full h-full bg-zinc-800 rounded-none xl:rounded-[10px] px-8 py-16 flex items-center justify-center"
  >
    <form
      @submit="onsubmit"
      class="flex flex-col items-center w-full max-w-[22.5rem]"
    >
      <h1
        class="text-white text-2xl font-helvetica-500 leading-7 mb-3 xl:text-[2rem]"
      >
        {{ $t("form.register_header") }}
      </h1>
      <h2 class="font-helvetica-400 text-base text-gray-500">
        {{ $t("form.register_sub_header") }}
      </h2>
      <div class="flex flex-col gap-4 my-8 w-full">
        <FormInputText name="name" />
        <FormInputText name="email" />
        <FormInputPassword name="password" />
        <FormInputPassword name="password_confirmation" />
        <ButtonFilled :submit="true" text_key="text_register" class="mt-2" />
        <ButtonOutline
          :icon="'IconGmail'"
          text_key="text_sign_up_with_google"
          link="auth-gmail"
        />
      </div>

      <p class="font-helvetica-400 text-base text-gray-500">
        {{ $t("form.register_have_an_account_question") }}
        <RouterLink
          :to="{ name: 'login' }"
          class="ml-1 font-helvetica-400 text-base text-blue-600"
          >{{ $t("form.text_login") }}</RouterLink
        >
      </p>
    </form>
  </div>
</template>
