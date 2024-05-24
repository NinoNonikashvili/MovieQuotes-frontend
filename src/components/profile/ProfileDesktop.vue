<script setup lang="ts">
import HeaderAuthNavigation from "@/components/shared/HeaderAuthNavigation.vue";
import i18n from "@/plugins/i18n";
import { useForm } from "vee-validate";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import IconCross from "@/components/icons/IconCross.vue";
import IconCheckpoint from "@/components/icons/IconCheckpoint.vue";
import type { AuthUserData } from "@/types/types";
import { getUpdatedUser, updateProfile } from "@/services/axios/user-services";
import { storeToRefs } from "pinia";

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
  console.log(
    values.new_name,
    values.new_password,
    values.new_password_confirmation,
  );
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

const { locale } = i18n.global;
</script>
<template>
  <div class="hidden w-full px-16 pt-8 pb-[15rem] xl:flex bg-[#181724]">
    <section class="w-[14.625rem] mr-[11.5rem]">
      <HeaderAuthNavigation
        :name="auth_user_data?.name"
        :lang="locale"
        :image="auth_user_data?.image"
      />
    </section>
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
          <FormInputText name="name" :disabled="true" class="w-[33rem]" />
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
        />
        <FormInputText
          name="email"
          :disabled="true"
          class="w-[33rem] mb-[3.5rem]"
        />
        <div v-if="!auth_user_data?.google_id">
          <div class="flex items-center gap-4 mb-[3.5rem]">
            <FormInputPassword
              name="password"
              :disabled="true"
              class="w-[33rem]"
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
            <div></div>
            <FormInputPassword
              name="new_password"
              class="w-[33rem] mb-[3.5rem]"
            />
            <FormInputPassword
              name="new_password_confirmation"
              class="w-[33rem] mb-[3.5rem]"
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
    <!-- SUCCESS NOTIFICATION -->
    <div
      v-if="isSuccessNotificationVisible"
      class="bg-[#BADBCC] rounded-[0.25rem] p-4 flex items-center justify-between absolute top-[10rem] right-[12rem] w-[25rem]"
    >
      <div class="flex items-center gap-2">
        <IconCheckpoint />
        <p class="text-[#0F5132] text-base font-helvetica-400">
          Changes updated succsessfully
        </p>
      </div>
      <IconCross
        @click="isSuccessNotificationVisible = false"
        class="cursor-pointer"
      />
    </div>
    <!-- ERROR NOTIFICATION -->
    <div
      v-if="isErrorNotification"
      class="bg-red-200 rounded-[0.25rem] p-4 flex items-center justify-between absolute right-[12rem] mx-auto w-[25rem]"
    >
      <div class="flex items-center gap-2">
        <p class="text-red-500 text-base font-helvetica-400">
          Profile could not be updated.
        </p>
      </div>
      <IconCross @click="isErrorNotification = false" class="cursor-pointer" />
    </div>
  </div>
</template>
