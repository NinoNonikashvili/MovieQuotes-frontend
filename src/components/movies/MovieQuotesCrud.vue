<script setup lang="ts">
import { ref } from "vue";
import IconDots from "../icons/IconDots.vue";
import IconShowPassword from "@/components/icons/IconShowPassword.vue";
import IconHidePassword from "@/components/icons/IconHidePassword.vue";
import IconTrash from "../icons/IconTrash.vue";
import IconEditPencil from "../icons/IconEditPencil.vue";

const dropdown = ref(false);

const props = defineProps<{
  location: string;
}>();
</script>

<template>
  <div class="absolute" :class="props.location">
    <div class="relative">
      <button
        class="bg-transparent border-0 p-4"
        @click.stop="dropdown = !dropdown"
      >
        <IconDots />
      </button>
      <div
        class="absolute xl:top-[2rem] bottom-[2rem] xl:bottom-0 right-[0.875rem] xl:left-[0.875rem] bg-[#24222F] px-10 py-8 rounded-[0.625rem] z-10 w-[14rem]"
        v-if="dropdown"
      >
        <button
          class="bg-transparent border-0 w-fit p-4 flex items-center gap-3 mb-1"
        >
          <IconShowPassword class="shrink-0" />
          <p class="font-helvetica-500 text-base text-white shrink-0">
            {{ $t("movies.text_view_quote") }}
          </p>
        </button>
        <button
          class="bg-transparent border-0 w-fit p-4 flex items-center gap-3 mb-1"
        >
          <IconEditPencil class="shrink-0" />
          <p class="font-helvetica-500 text-base text-white">
            {{ $t("movies.text_edit") }}
          </p>
        </button>
        <button
          class="bg-transparent border-0 w-fit p-4 flex items-center gap-3"
        >
          <IconTrash class="shrink-0" />
          <p class="font-helvetica-500 text-base text-white">
            {{ $t("movies.text_delete") }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>
