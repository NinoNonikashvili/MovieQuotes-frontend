<script setup lang="ts">
import IconCross from "@/components/icons/IconCross.vue";
import IconCamera from "@/components/icons/IconCamera.vue";
import { ref } from "vue";

const props = defineProps<{
  default_value?: string;
}>();

const imgPreview = ref<string | undefined | null>();
if (props.default_value) {
  imgPreview.value = props.default_value;
}
const imgFile = ref<File | null>(null);
const inpufFileEl = ref<HTMLInputElement | null>(null);

const allowedTypes = ["image/webp", "image/jpeg", "image/jpg", "image/png"];

const emit = defineEmits<{
  (e: "selected-img", image: File): void;
}>();

const onDrop = (e: DragEvent) => {
  deleteSelectedImg();
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
  imgFile.value = null;
  imgPreview.value = null;
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

const deleteSelectedImg = () => {
  imgPreview.value = null;
  imgFile.value = null;
};
</script>

<template>
  <div
    class="w-full min-h-[5.25rem] h-auto border border-white flex"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="onDrop"
  >
    <div v-if="imgPreview" class="flex items-center gap-3 px-4 py-6 w-1/2">
      <img :src="imgPreview" alt="" class="w-full h-full rounded-sm" />
    </div>
    <div
      class="flex gap-3 items-center px-4 py-6"
      :class="
        imgPreview
          ? 'w-1/2 flex-col justify-evenly items-center'
          : 'w-full flex-row'
      "
   
    >
      <p
        v-if="imgPreview"
        class="text-base font-helvetica-700 text-[#DDCCAA] uppercase"
      >
        {{ $t("quote.text_replace_image") }}
      </p>
      <div class="flex gap-3 items-center">
        <IconCamera />
        <p class="font-helvetica-400 text-xl text-white">
          {{ $t("quote.drag_n_drop_file") }}
        </p>
      </div>

      <div class="relative">
        <input
          ref="inpufFileEl"
          type="file"
          class="opacity-0 w-[11rem] h-12"
          @input="onFileInput"
        />
        <button
          type="button"
          class="absolute w-full top-0 left-0 cursor-pointer pointer-events-none focus:outline-none bg-[#9747FF] p-[0.625rem] font-helvetica-400 text-xl text-white"
        >
          {{ $t("quote.text_choose_file") }}
        </button>
      </div>
    </div>
  </div>
</template>
