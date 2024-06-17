<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import i18n from "@/plugins/i18n";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import { ref } from "vue";
import ProfileMobileUserDatum from "@/components/profile/ProfileMobileUserDatum.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import { useForm } from "vee-validate";
import FormInputText from "../ui/form/FormInputText.vue";
import FormInputPassword from "../ui/form/FormInputPassword.vue";
import { updateProfile } from "@/services/axios/user-services";
import { getUpdatedUser } from "@/services/axios/user-services";
import type { AuthUserData } from "@/types/types";
import { storeToRefs } from "pinia";
import ErrorNotification from "@/components/shared/ErrorNotification.vue";
import SuccessNotification from "@/components/shared/SuccessNotification.vue";

const { locale } = i18n.global;
const user = useUserStore();
const { set_auth_user_data } = user;
const { auth_user_data } = storeToRefs(user);
const isProfileInfo = ref<boolean>(true);
const isEditName = ref<boolean>(false);
const isEditPassword = ref<boolean>(false);
const isConfirmChanges = ref<boolean>(false);
const isSuccessNotification = ref<boolean>(false);
const isErrorNotification = ref<boolean>(false);

const { values } = useForm({
  validationSchema: {
    name: "min:3",
    password: "min:8|max:15|low_case_and_numeric",
    password_confirmation: "confirmed:@password",
  },
  initialValues: {
    name: "",
    password: "",
    password_confirmation: "",
  },
});

const imageRef = ref<string | undefined>(auth_user_data?.value?.image);
const imageFile = ref<File | null>(null);

const showEditUsernameModal = () => {
  isEditName.value = true;
  isProfileInfo.value = false;
};

const showEditPasswordModal = () => {
  isEditPassword.value = true;
  isProfileInfo.value = false;
};

const handleFileInput = (e: Event) => {
  const imageInp = e.target as HTMLInputElement;
  if (imageInp.files && imageInp.files[0]) {
    const reader = new FileReader();
    imageFile.value = imageInp.files[0];
    reader.onload = (e) => {
      imageRef.value = e.target?.result as string;
    };
    reader.readAsDataURL(imageInp.files[0]);
    isConfirmChanges.value = true;
  }
};
const editChanges = () => {
  isEditName.value = false;
  isEditPassword.value = false;
  isConfirmChanges.value = true;
};

const saveChanges = async () => {
  isConfirmChanges.value = false;
  isProfileInfo.value = true;
  let updatedValues = new FormData();
  if (imageFile.value) {
    updatedValues.append("image", imageFile.value);
  }
  if (values.name) {
    updatedValues.append("name", values.name);
  }
  if (values.password) {
    updatedValues.append("password", values.password);
  }
  if (values.password_confirmation) {
    updatedValues.append("password_confirmation", values.password_confirmation);
  }
  try {
    await updateProfile(updatedValues);
    try {
      let data = await getUpdatedUser();
      set_auth_user_data(data.data.user_data as AuthUserData);
    } catch (err) {
      return;
    }
    isSuccessNotification.value = true;
  } catch (err) {
    isErrorNotification.value = true;
  }
};

const cancelChanges = () => {
  isConfirmChanges.value = false;
  isProfileInfo.value = true;
  isEditName.value = false;
  isEditPassword.value = false;
  imageRef.value = auth_user_data?.value?.image;
};
</script>

<template>
  <div class="bg-[#11101A] w-full">
    <div
      class="xl:hidden bg-[#11101A] h-screen"
      :class="{ 'blur-sm -m-2': isSuccessNotification }"
    >
      <!-- BACK TO NEWS FEED -->
      <div class="px-10 py-6 bg-[#11101A] w-full">
        <RouterLink
          :to="{ name: 'news-feed', params: { lang: locale } }"
          class="block w-fit"
        >
          <IconLeftArrow />
        </RouterLink>
      </div>
      <!-- PROFILE INFO -->
      <div
        v-if="isProfileInfo"
        class="bg-[#24222F] rounded-xl px-8 py-6 pb-[10rem] flex flex-col items-center"
      >
        <div class="mb-16 w-[13rem] relative flex flex-col items-center z-10">
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

        <ProfileMobileUserDatum
          :title="$t('profile.text_username')"
          :value="auth_user_data?.name ?? 'Nino'"
          :callback="showEditUsernameModal"
        />
        <ProfileMobileUserDatum
          :title="$t('profile.text_email')"
          :value="auth_user_data?.email ?? 'email.gmail.com'"
        />
        <ProfileMobileUserDatum
          v-if="!auth_user_data?.google_id"
          :title="$t('profile.text_password')"
          value="********"
          :callback="showEditPasswordModal"
        />
      </div>
      <!-- EDIT DATA -->
      <div
        :class="{ hide: !isEditName && !isEditPassword }"
        class="absolute top-[15rem] left-0 right-0 mx-auto max-w-[26.75rem]"
      >
        <form class="rounded-xl bg-[#24222F] px-8 py-16">
          <FormInputText
            name="name"
            :class="{ hide: !isEditName }"
            :required="false"
          />
          <div class="flex flex-col gap-2" :class="{ hide: !isEditPassword }">
            <FormInputPassword name="password" :required="false" />
            <FormInputPassword name="password_confirmation" :required="false" />
          </div>
        </form>
        <div
          class="w-full flex items-center justify-between py-4 px-5 bg-transparent"
        >
          <button
            class="border-0 bg-transparent font-helvetica-400 text-base text-[#CED4DA]"
            @click="cancelChanges"
          >
            {{ $t("profile.text_cancel") }}
          </button>
          <div class="w-[4.2rem]">
            <ButtonFilled @click="editChanges" text_key="profile.text_edit" />
          </div>
        </div>
      </div>
      <!-- CONFIRM CHANGES -->
      <div
        v-if="isConfirmChanges"
        class="z-20 w-[22rem] rounded-[0.625rem] bg-gradient-to-r shadow-sm from-zinc-800 to-zinc-700 absolute top-[15rem] left-0 right-0 mx-auto"
      >
        <div
          class="w-full flex justify-center pt-[4rem] pb-[3rem] border-b border-b-white"
        >
          <p class="font-helvetica-400 text-base text-white">
            Are you sure to make changes ?
          </p>
        </div>
        <div class="w-full flex items-center justify-between py-4 px-5">
          <button
            class="border-0 bg-transparent font-helvetica-400 text-base text-[#CED4DA]"
            @click="cancelChanges"
          >
            {{ $t("profile.text_cancel") }}
          </button>
          <div class="w-[4.2rem] pointer-events-auto">
            <ButtonFilled
              @click="saveChanges"
              text_key="profile.text_confirm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SUCCESS NOTIFICATION -->

  <SuccessNotification
    text_key="profile.success_general_update"
    v-if="isSuccessNotification"
    @close-notification="isSuccessNotification = false"
  />

  <!-- ERROR NOTIFICATION -->

  <ErrorNotification
    text_key="profile.error_profile_update"
    v-if="isErrorNotification"
    @close-notification="isErrorNotification = false"
  />
</template>
<style scoped>
.hide * {
  opacity: 0;
  height: 0;
}
</style>
