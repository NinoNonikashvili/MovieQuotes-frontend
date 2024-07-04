<script setup lang="ts">
import EditMovieContent from "@/components/movies/EditMovieContent.vue";
import { getBilingualMovie } from "@/services/axios/movie-services";
import type { MoviesDataBilingual } from "@/types/types";
import { onMounted } from "vue";
import { ref } from "vue";

const movie = ref<MoviesDataBilingual>();
const props = defineProps<{
  closeModal: CallableFunction;
  user_id: number;
  movie_id: number;
}>();

onMounted(async () => {
  try {
    //load multilingual data
    let response = await getBilingualMovie(props.movie_id);
    movie.value = response.data.data;
    console.log("movie:", movie.value);
  } catch (err) {
    return;
  }
});
</script>

<template>
  <EditMovieContent
    v-if="movie"
    :closeModal="props.closeModal"
    :user_id="props.user_id"
    :movie="movie"
  />
</template>
