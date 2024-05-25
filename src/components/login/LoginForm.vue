<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import FormCheckbox from "@/components/ui/form/FormCheckbox.vue";
import AuthLayoutWrapper from "@/components/shared/AuthLayoutWrapper.vue";
import type { AuthUserData, LoginUser } from "@/types/types";
import { login } from "@/services/axios/auth-services";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useGmail } from "@/composables/google-auth";
import { useRouter } from "vue-router";
import i18n from "@/plugins/i18n";
import { useUserStore } from "@/stores/user";

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    user: "required|min:3",
    password: "required|min:8|max:15|low_case_and_numeric",
  },
});
const showNotification = ref<boolean>(false);
const router = useRouter();
const { locale } = i18n.global;
const user = useUserStore();
const { set_auth_user, set_auth_user_data } = user;

const onSubmit = handleSubmit(async (values) => {
  const credentials = ref<LoginUser>({
    password: "",
    rememberMe: false,
  });

  credentials.value.password = values.password;

  if (values.user.includes("@")) {
    credentials.value.email = values.user;
  } else {
    credentials.value.name = values.user;
  }
  if (values.rememberMe !== undefined) {
    credentials.value.rememberMe = values.rememberMe;
  }

  try {
    const data = await login(credentials.value);
    //set user data from response globally in pinia abd redirect to homepage
    console.log(data.data.user_data)
    set_auth_user(true);
    set_auth_user_data(data.data.user_data as AuthUserData)
    router.push({ name: "news-feed", params: { lang: locale.value } });
  } catch (err: any) {
    resetForm({
      errors: {
        user: err.response?.data.message,
      },
    });
  }
});
</script>

<template>
  <AuthLayoutWrapper v-if="!showNotification">
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
          <FormInputText name="user" :required="true"/>
          <FormInputPassword name="password" :required="true"/>
          <div class="flex w-full justify-between items-center">
            <FormCheckbox name="rememberMe" :checkedValue="true" :required="true"/>
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="ml-1 font-helvetica-400 text-base text-blue-600 underline"
              >{{ $t("form.text_forgot_password") }}
            </RouterLink>
          </div>

          <ButtonFilled
            :submit="true"
            text_key="form.text_sign_in"
            class="mt-2"
          />
          <ButtonOutline
            @click="useGmail"
            :icon="'IconGmail'"
            text_key="form.text_sign_in_with_google"
            link=""
          />
        </form>
      </AuthLayout>
    </template>
  </AuthLayoutWrapper>
</template>
