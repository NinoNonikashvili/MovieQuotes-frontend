<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import MoviesContent from "@/components/movies/MoviesContent.vue";
import { useMoviesStore } from "@/stores/movies";
import type { MoviesData } from "@/types/types";
import { onBeforeUnmount, onMounted } from "vue";
import { getMovies } from "@/services/axios/movie-services";

onMounted(async () => {
  const { set_movies } = useMoviesStore();

  try {
    const response = await getMovies();
    set_movies(response.data.data as MoviesData[]);
  } catch (err) {
    return;
  }
});
onBeforeUnmount(() => {
  console.log("movies unmouned");
});
</script>

<template>
  <HeaderAuth />
  <MoviesContent />
</template>
