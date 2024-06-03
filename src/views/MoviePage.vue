<script setup lang="ts">
import { getSingleMovieQuotes } from "@/services/axios/quote-services";
import MovieContent from "@/components/movies/MovieContent.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuotesStore } from "@/stores/quotes";
import HeaderAuth from "@/components/shared/HeaderAuth.vue";

const route = useRoute();
const { set_movie_quotes } = useQuotesStore();

onMounted(async () => {
  // load movie quotes
  console.log('movie mounted')
  try {
    const id = route.params.id as string;
    const response = await getSingleMovieQuotes({ id: id });
    set_movie_quotes(response.data.quotes);
  } catch (err) {
    err;
  }
});
</script>

<template>
  <HeaderAuth />
  <MovieContent :id="route.params.id as string" />
</template>
