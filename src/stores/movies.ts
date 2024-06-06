import { ref } from "vue";
import { defineStore } from "pinia";
import type { MoviesData } from "@/types/types";

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<MoviesData[] | undefined>(undefined);
  const genres = ref<{ title: string; id: string }[] | undefined>(undefined);
  const movie_cursor = ref<string | null>(null);

  function set_movies(state: MoviesData[]) {
    movies.value = state;
  }
  function set_genres(state: { title: string; id: string }[]) {
    genres.value = state;
  }

  function push_movies(state: MoviesData[]) {
    state.forEach((movie) => movies.value?.push(movie));
  }
  function set_movie_cursor(cursor: string | null) {
    movie_cursor.value = cursor;
  }

  return {
    movies,
    genres,
    movie_cursor,
    set_movies,
    set_movie_cursor,
    push_movies,
    set_genres,
  };
});
