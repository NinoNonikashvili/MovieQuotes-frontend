<script setup lang="ts">
import IconMovie from "@/components/icons/IconMovie.vue";
import type { OnClickOutsideHandler } from "@vueuse/core";
import IconArrowFilled from "@/components/icons/IconArrowFilled.vue";
import { ref } from "vue";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";

const movieStore = useMoviesStore();
const { movies } = storeToRefs(movieStore);
// const movies = [{ name: "bla" }, { name: "ssds" }];
const emit = defineEmits<{
  (e: "send-chosen-movie", movie: string): void;
}>();
const sendChosenMovie = (e: Event) => {
  dropdown.value = false;
  const target = e.target as HTMLElement;
  console.log(target.innerText);
  emit("send-chosen-movie", target.innerText);
};
const dropdown = ref(false);
const dropdownHandler: OnClickOutsideHandler = (event) => {
  console.log(event);
  dropdown.value = false;
};
</script>
<template>
  <div class="relative inline-block rounded-[0.25rem] w-full">
    <div
      @click.stop="dropdown = !dropdown"
      class="w-full bg-black p-6 flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <IconMovie color="#ffffff" />
        <p class="font-helvetica-400 text-white text-2xl">
          {{ $t("quote.text_choose_movie") }}
        </p>
      </div>
      <div class="shrink-0">
        <IconArrowFilled :class="{ 'rotate-180': dropdown }" />
      </div>
    </div>
    <div
      v-if="dropdown"
      v-on-click-outside.bubble="dropdownHandler"
      class="w-full bg-black p-6 rounded-[0.25rem]"
    >
      <p
        v-for="(movie, index) in movies"
        :key="index"
        class="font-helvetica-400 text-white text-xl hover:text-2xl"
        @click="sendChosenMovie"
      >
        {{ movie.title }}
      </p>
    </div>
  </div>
</template>
