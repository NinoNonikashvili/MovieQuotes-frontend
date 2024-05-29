<script setup lang="ts">
import type { MoviesData } from "@/types/types";

const props = defineProps<{
  movieData: MoviesData;
}>();
</script>
<template>
  <div class="flex gap-3 w-full">
    <img
      :src="props.movieData.image"
      alt=""
      class="h-[5.125rem] xl:h-[9.875rem] rounded-[0.25rem]"
    />
    <div>
      <h3 class="fomt-helvetica-500 text-[#DDCCAA] text-2xl mt-3 mb-5">
        {{ props.movieData.title }} ({{ props.movieData.year }})
      </h3>
      <div class="w-full overflow-hidden flex gap-2 mb-5">
        <div
          v-for="(genre, index) in props.movieData.genres"
          :key="index"
          class="font-helvetica-700 text-white text-lg bg-[#6C757D] px-3 py-2 rounded-[0.25rem]"
        >
          {{ genre.title }}
        </div>
      </div>
      <p class="font-helvetica-700 text-white text-lg">
        {{ $t("quote.text_director") }}: {{ props.movieData.director }}
      </p>
    </div>
  </div>
</template>
