<script setup lang="ts">
import HeaderAuthNavigation from "@/components/shared/HeaderAuthNavigation.vue";
import i18n from "@/plugins/i18n";
import { useForm } from "vee-validate";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import FormInputText from "@/components/ui/form/FormInputText.vue";
import FormInputPassword from "@/components/ui/form/FormInputPassword.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";

const { auth_user_data } = useUserStore();
const { handleSubmit } = useForm({
  validationSchema: {
    new_name: "min:3",
    new_password: "min:8|max:15|low_case_and_numeric",
    new_password_confirmation: "confirmed:@new_password",
  },
  initialValues: {
    name: auth_user_data?.name,
    email: auth_user_data?.email,
    password: "********",
  },
});

const isUpdatePassword = ref<boolean>(false);
const isUpdateName = ref<boolean>(false);
const isUpdateActivated = ref<boolean>(false);
// image input
const imageRef = ref<string | undefined>(
  "data:image/jpeg;base64,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",
);
const imageFile = ref<File | null>(null);

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
  // imageRef.value = auth_user_data.image
};
const onSubmit = handleSubmit((values) => {
  //send request to store data
  console.log("send data: ", values);
});

const handleFileInput = (e: Event) => {
  const imageInp = e.target as HTMLInputElement;
  isUpdateActivated.value = true;
  if (imageInp.files && imageInp.files[0]) {
    const reader = new FileReader();
    imageFile.value = imageInp.files[0];
    reader.onload = (e) => {
      imageRef.value = e.target?.result as string;
    };
    reader.readAsDataURL(imageInp.files[0]);
  }
};

const { locale } = i18n.global;
</script>
<template>
  <div class="hidden w-full px-16 py-8 xl:flex bg-[#181724]">
    <section class="w-[14.625rem] mr-[11.5rem]">
      <HeaderAuthNavigation name="User" :lang="locale" />
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
  </div>
</template>
