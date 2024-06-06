import { ref } from "vue";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { getMovies } from "@/services/axios/movie-services";

export function useFetchMovies() {
  const quoteStore = useMoviesStore();
  const { movie_cursor, } = storeToRefs(quoteStore);
  const { set_movie_cursor, push_movies } = useMoviesStore();

  const loading = ref<boolean | null>(false);
  const error = ref(null);

  const fetch = async () => {
    if (movie_cursor.value) {
      loading.value = true;
      try {
        const response = await getMovies(movie_cursor.value);
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

  return { fetch, error, loading };
}
