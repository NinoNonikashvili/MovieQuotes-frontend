<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import MoviesContent from "@/components/movies/MoviesContent.vue";
import { useMoviesStore } from "@/stores/movies";
import type { MoviesData } from "@/types/types";
import { onMounted } from "vue";
import { getMovies } from "@/services/axios/movie-services";
import { storeToRefs } from "pinia";

onMounted(async () => {
  const movieStore = useMoviesStore();
  const { movies } = storeToRefs(movieStore);
  const { set_movies } = useMoviesStore();
  if (!movies.value) {
    try {
      const response = await getMovies();
      set_movies(response.data.data as MoviesData[]);
    } catch (err) {
      return;
    }
  }
});
</script>

<template>
  <HeaderAuth />
  <MoviesContent />
</template>
