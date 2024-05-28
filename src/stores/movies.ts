import { ref } from "vue";
import { defineStore } from "pinia";
import type { MoviesData } from "@/types/types";

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<MoviesData[] | undefined>(undefined);
  function set_movies(state: MoviesData[]) {
    movies.value = state;
  }

  return { movies, set_movies };
});
