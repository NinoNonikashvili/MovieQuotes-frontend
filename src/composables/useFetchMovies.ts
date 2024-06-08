import { ref } from "vue";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { getMovies, getSingleMovie } from "@/services/axios/movie-services";
import type { MoviesData } from "@/types/types";

export function useFetchMovies() {
  const quoteStore = useMoviesStore();
  const { movie_cursor } = storeToRefs(quoteStore);
  const { set_movie_cursor, push_movies, set_movies, set_movie } =
    useMoviesStore();

  const loading = ref<boolean | null>(false);
  const error = ref(null);

  const fetch = async () => {
    if (movie_cursor.value) {
      loading.value = true;
      try {
        const response = await getMovies(movie_cursor.value, null);
        push_movies(response.data.data);
        loading.value = false;

        if (response.data.next_url) {
          const url = new URL(response.data.next_url);

          // Use URLSearchParams to get the value of the cursor parameter
          const cursor = url.searchParams.get("cursor");
          if (cursor) {
            set_movie_cursor(cursor);
          } else {
            set_movie_cursor(null);
          }
        } else {
          set_movie_cursor(null);
        }
      } catch (err: any) {
        error.value = err;
        loading.value = false;
      }
    }
  };

  const fetchSearchedMovies = async (search: string) => {
    loading.value = true;
    try {
      const response = await getMovies(null, search);
      set_movies(response.data.data);
      loading.value = false;

      if (response.data.next_url) {
        const url = new URL(response.data.next_url);

        // Use URLSearchParams to get the value of the cursor parameter
        const cursor = url.searchParams.get("cursor");
        if (cursor) {
          set_movie_cursor(cursor);
        } else {
          set_movie_cursor(null);
        }
      } else {
        set_movie_cursor(null);
      }
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchInitialMovies = async () => {
    try {
      const response = await getMovies(null, null);
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
  };

  const fetchSingleMovie = async (id: string) => {
    try {
      const response = await getSingleMovie(id);
      set_movie(response.data.data);
    } catch (err) {
      return;
    }
  };

  return {
    fetch,
    error,
    loading,
    fetchSearchedMovies,
    fetchInitialMovies,
    fetchSingleMovie,
  };
}
