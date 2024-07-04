<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import MoviesContent from "@/components/movies/MoviesContent.vue";
import { onMounted, watch } from "vue";
import { useFetchMovies } from "@/composables/useFetchMovies";
import { useRoute } from "vue-router";

const route = useRoute()
const { fetchInitialMovies } = useFetchMovies();

onMounted(async () => {
  fetchInitialMovies();
});
watch(
  () => route.params.lang,
  async () => {
    console.log("param changed");
    fetchInitialMovies();
  },
);
</script>

<template>
  <HeaderAuth />
  <MoviesContent />
</template>
