<script setup lang="ts">
import { getSingleMovieQuotes } from "@/services/axios/quote-services";
import MovieContent from "@/components/movies/MovieContent.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuotesStore } from "@/stores/quotes";
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import { useFetchMovies } from "@/composables/useFetchMovies";

const route = useRoute();
const { fetchSingleMovie } = useFetchMovies();

const { set_movie_quotes } = useQuotesStore();
const load = async () => {
  try {
    const id = route.params.id as string;
    const response = await getSingleMovieQuotes({ id: id });
    set_movie_quotes(response.data.quotes);
    await fetchSingleMovie(id);
  } catch (err) {
    err;
  }
};

onMounted(async () => {
  // load movie quotes
  console.log("mounted movie page");
  await load();
});
watch(
  () => route.params.lang,
  async () => {
    console.log("param changed");
    await load();
  },
);
</script>

<template>
  <HeaderAuth />
  <MovieContent :id="route.params.id as string" />
</template>
