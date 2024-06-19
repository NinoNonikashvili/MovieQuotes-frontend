<script setup lang="ts">
import { useForm } from "vee-validate";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import type { AuthUserData } from "@/types/types";
import { getUpdatedUser, updateProfile } from "@/services/axios/user-services";
import { storeToRefs } from "pinia";
import LayoutUsersPages from "@/components/layouts/LayoutUserPages.vue";
import ErrorNotification from "@/components/shared/ErrorNotification.vue";
import SuccessNotification from "@/components/shared/SuccessNotification.vue";
import QuoteView from "../quote/QuoteView.vue";
import { useQuotesStore } from "@/stores/quotes";

const user = useUserStore();

const { set_auth_user_data } = user;
const { auth_user_data } = storeToRefs(user);
const { handleSubmit } = useForm({
  validationSchema: {
    new_name: "min:3",
    new_password: "min:8|max:15|low_case_and_numeric",
    new_password_confirmation: "confirmed:@new_password",
  },
  initialValues: {
    name: auth_user_data?.value?.name,
    email: auth_user_data?.value?.email,
    password: "********",
    new_name: "",
    new_password: "",
    new_password_confirmation: "",
  },
});

const isUpdatePassword = ref<boolean>(false);
const isUpdateName = ref<boolean>(false);
const isUpdateActivated = ref<boolean>(false);
const isSuccessNotificationVisible = ref<boolean>(false);
const isErrorNotification = ref<boolean>(false);
// image input initialize with auth_user_data.image
const imageRef = ref<string | undefined>(auth_user_data?.value?.image);
const imageFile = ref<File | undefined>();


const quoteStore = useQuotesStore();
const {set_view_quote_id} = useQuotesStore();
const {  view_quote_id } = storeToRefs(quoteStore);
const closeViewQuote = () => {
  set_view_quote_id(null);
};

const openUpdateName = () => {
  isUpdateName.value = true;
  isUpdateActivated.value = true;
};
const openUpdatePassword = () => {
  isUpdatePassword.value = true;
  isUpdateActivated.value = true;
};
const cancelChanges = () => {
  isUpdatePassword.value = false;
  isUpdateName.value = false;
  isUpdateActivated.value = false;
  imageRef.value = auth_user_data?.value?.image;
};
const onSubmit = handleSubmit(async (values) => {
  //send request to store data
  let updatedValues = new FormData();
  if (values.new_name) {
    updatedValues.append("name", values.new_name);
  }

  if (values.new_password) {
    updatedValues.append("password", values.new_password);
  }
  if (values.new_password_confirmation) {
    updatedValues.append(
      "password_confirmation",
      values.new_password_confirmation,
    );
  }
  // add later imageRef.value !== auth_user_data.image

  if (imageFile.value) {
    updatedValues.append("image", imageFile.value);
  }
  //if password is not updated send false
  try {
    await updateProfile(updatedValues);

    //update user store
    try {
      let data = await getUpdatedUser();
      set_auth_user_data(data.data.user_data as AuthUserData);
    } catch (err) {
      return;
    }

    isSuccessNotificationVisible.value = true;
    isUpdateActivated.value = false;
    isUpdateName.value = false;
    isUpdatePassword.value = false;
  } catch (err) {
    isUpdateActivated.value = false;
    isUpdateName.value = false;
    isUpdatePassword.value = false;
    isErrorNotification.value = true;
  }
});

const handleFileInput = (e: Event) => {
  const imageInp = e.target as HTMLInputElement;
  isUpdateActivated.value = true;
  if (imageInp.files && imageInp.files[0]) {
    imageFile.value = imageInp.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      imageRef.value = e.target?.result as string;
    };
    reader.readAsDataURL(imageInp.files[0]);
  }
};
</script>
<template>
  <div class="w-full px-10 py-4 xl:px-16 xl:pt-8 pb-[15rem] flex bg-[#181724]">
    <LayoutUsersPages
      class="hidden xl:flex"
      :name="auth_user_data?.name"
      :image="auth_user_data?.image"
    />
    <section>
      <h1 class="mb-[7.5rem] font-helvetica-500 text-2xl text-white">
        {{ $t("profile.text_my_profile") }}
      </h1>
      <form
        class="max-w-[62.5rem] relative p-[12.125rem] bg-[#11101A] rounded-md"
      >
        <div
          class="mb-16 w-[13rem] absolute left-0 right-0 mx-auto -top-12 flex flex-col items-center"
        >
          <img :src="imageRef" alt="" class="w-full rounded-full mb-2" />
          <p class="font-helvetica-400 text-xl text-white">
            {{ $t("profile.text_upload_photo") }}
          </p>
          <input
            @input="handleFileInput"
            type="file"
            class="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
          />
        </div>
        <div class="flex items-center gap-4 mb-[3.5rem]">
          <FormInputText
            name="name"
            :value="auth_user_data?.name"
            :disabled="true"
            class="w-[33rem]"
            :required="false"
          />
          <button
            class="border-0 bg-transparent font-helvetica-400 text-base text-[#CED4DA] mt-4"
            type="button"
            @click="openUpdateName"
          >
            {{ $t("profile.text_edit") }}
          </button>
        </div>

        <FormInputText
          name="new_name"
          v-if="isUpdateName"
          class="w-[33rem] mb-[3.5rem]"
          :required="false"
        />
        <FormInputText
          name="email"
          :disabled="true"
          :value="auth_user_data?.email"
          class="w-[33rem] mb-[3.5rem]"
          :required="false"
        />
        <div v-if="!auth_user_data?.google_id">
          <div class="flex items-center gap-4 mb-8">
            <FormInputPassword
              name="password"
              :disabled="true"
              class="w-[33rem]"
              :required="false"
            />
            <button
              class="border-0 bg-transparent font-helvetica-400 text-base text-[#CED4DA] mt-4"
              @click="openUpdatePassword"
              type="button"
            >
              {{ $t("profile.text_edit") }}
            </button>
          </div>

          <div v-if="isUpdatePassword">
            <div
              class="p-6 rounded-[0.25rem] border border-[#CED4DA] w-[33rem] mb-8"
            >
              <h3 class="font-helvetica-400 text-base text-white mb-4">
                {{ $t("profile.password_hint_header") }}
              </h3>
              <div>
                <li class="font-helvetica-400 text-sm text-white">
                  {{ $t("profile.password_hint_1") }}
                </li>

                <li class="font-helvetica-400 text-sm text-white">
                  {{ $t("profile.password_hint_2") }}
                </li>

                <li class="font-helvetica-400 text-sm text-white">
                  {{ $t("profile.password_hint_3") }}
                </li>
              </div>
            </div>
            <FormInputPassword
              name="new_password"
              class="w-[33rem] mb-[3.5rem]"
              :required="false"
            />
            <FormInputPassword
              name="new_password_confirmation"
              class="w-[33rem] mb-[3.5rem]"
              :required="false"
            />
          </div>
        </div>
      </form>
      <div
        class="ml-auto mt-[4rem] flex items-center justify-end gap-4 py-4 px-5"
        v-if="isUpdateActivated"
      >
        <button
          class="border-0 bg-transparent font-helvetica-400 text-base text-[#CED4DA]"
          @click="cancelChanges"
        >
          {{ $t("profile.text_cancel") }}
        </button>
        <div class="w-[9rem]">
          <ButtonFilled
            :submit="true"
            text_key="profile.text_save_changes"
            @click="onSubmit"
          />
        </div>
      </div>
    </section>
  </div>
  <!-- SUCCESS NOTIFICATION -->

  <SuccessNotification
    text_key="profile.success_general_update"
    v-if="isSuccessNotificationVisible"
    @close-notification="isSuccessNotificationVisible = false"
  />

  <!-- ERROR NOTIFICATION -->

  <ErrorNotification
    text_key="profile.error_profile_update"
    v-if="isErrorNotification"
    @close-notification="isErrorNotification = false"
  />
  <QuoteView
    :closeModal="closeViewQuote"
    :quote_id="view_quote_id"
    :doNotShowCrud="true"
    v-if="view_quote_id"
  />
</template>
