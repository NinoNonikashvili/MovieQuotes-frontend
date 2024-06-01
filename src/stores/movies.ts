import { ref } from "vue";
import { defineStore } from "pinia";
import type { MoviesData } from "@/types/types";

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<MoviesData[] | undefined>(undefined);
  const genres = ref<{ title: string; id: string }[] | undefined>(undefined);
  function set_movies(state: MoviesData[]) {
    movies.value = state;
  }
  function set_genres(state: {title: string; id: string }[] ){
    genres.value = state
  }

  return { movies, set_movies, genres, set_genres };
});
