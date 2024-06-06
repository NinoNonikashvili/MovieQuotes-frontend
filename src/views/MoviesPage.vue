<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import MoviesContent from "@/components/movies/MoviesContent.vue";
import { useMoviesStore } from "@/stores/movies";
import type { MoviesData } from "@/types/types";
import {  onMounted } from "vue";
import { getMovies } from "@/services/axios/movie-services";

onMounted(async () => {
  const { set_movies, set_movie_cursor } = useMoviesStore();

  try {
    const response = await getMovies(null);
    set_movies(response.data.data as MoviesData[]);
    if (response.data.next_url) {
        const url = new URL(response.data.next_url);
        const cursor = url.searchParams.get("cursor");
        if (cursor) {
          set_movie_cursor(cursor);
        } else {
          set_movie_cursor(null);
        }
      } else {
        set_movie_cursor(null);
      }
  } catch (err) {
    return;
  }
});

</script>

<template>
  <HeaderAuth />
  <MoviesContent />
</template>
