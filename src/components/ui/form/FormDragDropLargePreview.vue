<script setup lang="ts">
import IconCamera from "@/components/icons/IconCamera.vue";
import { ref } from "vue";

const props = defineProps<{
  default_value?: string;
}>();

const imgPreview = ref<string | undefined | null>('https://tse4.mm.bing.net/th?id=OIP.1b-GpcCf6-Nm3xvKeO8w4AHaEl&pid=Api&P=0&h=220');
if (props.default_value) {
  imgPreview.value = props.default_value;
}
const imgFile = ref<File | null>(null);
const dropZone = ref<HTMLElement | null>(null);
const allowedTypes = ["image/webp", "image/jpeg", "image/jpg", "image/png"];

const emit = defineEmits<{
  (e: "selected-img", image: File): void;
}>();

const onDrop = (e: DragEvent) => {
  console.log(e);

  const data = e.dataTransfer?.files;
  if (data && data[0] && allowedTypes.includes(data[0].type)) {
    imgFile.value = data[0];
    emit("selected-img", imgFile.value);
    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(data[0]);
  }
};
const onFileInput = (e: Event) => {
  console.log("file chosen manually");

  const target = e.target as HTMLInputElement;
  if (
    target.files &&
    target.files[0] &&
    allowedTypes.includes(target.files[0].type)
  ) {
    imgFile.value = target.files[0];
    emit("selected-img", imgFile.value);
    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
};


</script>

<template>
  <div class="w-fit ">
    <div v-if="imgPreview" class="relative">
      <img
        :src="imgPreview"
        alt=""
        class="object-cover w-[22.375rem] h-[18.875rem] xl:w-[56rem] xl:h-[32rem] rounded-[0.25rem]"
      />
      <div class="absolute top-0 left-0 right-0 bottom-0 m-auto w-fit h-fit">
        <div class="relative">
          <input
            type="file"
            class="opacity-0 w-[12rem] h-[5.35rem]"
            @input="onFileInput"
          />
          <div
            class="pointer-events-none cursor-pointer absolute top-0 left-0 flex flex-col gap-3 items-center justify-center bg-[#181623]/70 p-4 rounded-md w-full"
            ref="dropZone"
            @dragover.prevent
            @dragenter.prevent
            @drop.prevent.stop="onDrop"
          >
            <IconCamera />
            <p class="font-helvetica-400 text-xl text-white text-center">
              {{ $t("quote.text_change_photo") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
