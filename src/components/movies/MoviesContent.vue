<script setup lang="ts">
import LayoutUsersPages from "@/components/layouts/LayoutUserPages.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { useUserStore } from "@/stores/user";
import { useMoviesStore } from "@/stores/movies";
import { useNotificationStore } from "@/stores/crud-notifications";
import { storeToRefs } from "pinia";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import MoviesListComponent from "@/components/movies/MoviesListComponent.vue";
import AddMovie from "./AddMovie.vue";
import SuccessNotification from "../shared/SuccessNotification.vue";

import { onMounted, ref } from "vue";
import { useFetchMovies } from "@/composables/useFetchMovies";

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);
const movieStore = useMoviesStore();
const { movies } = storeToRefs(movieStore);
const notificationsStore = useNotificationStore();
const { status } = storeToRefs(notificationsStore);
const { set_status } = useNotificationStore();
const loadMoreMovies = ref<HTMLElement | null>(null);

const isAddMovie = ref<boolean>(false);
const closeAddMovie = () => {
  isAddMovie.value = false;
};

const { fetch, loading, fetchSearchedMovies } = useFetchMovies();

const search = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  console.log("search");
  if (target.value) {
    try {
      await fetchSearchedMovies(target.value);
    } catch (err) {
      return;
    }
  }
};

onMounted(() => {
  const options = {
    root: null, // Relative to the viewport
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(async (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await fetch();
      }
    });
  }, options);
  console.log(loadMoreMovies.value);
  if (loadMoreMovies.value) {
    observer.observe(loadMoreMovies.value);
    console.log("attach");
  }
});
</script>
<template>
  <div
    class="w-full px-10 py-4 xl:px-16 xl:pt-8 pb-[15rem] flex bg-[#181724]"
    :class="{ 'pointer-events-none blur-sm': isAddMovie }"
  >
    <LayoutUsersPages
      class="hidden xl:flex"
      :name="auth_user_data?.name"
      :image="auth_user_data?.image"
    />

    <section class="w-full min-h-screen">
      <header class="flex items-center justify-between w-full">
        <div class="flex gap-2 flex-col xl:flex-row w-fit">
          <h1 class="font-helvetica-500 text-2xl text-white">
            {{ $t("movies.page_header") }}
          </h1>
          <p class="font-helvetica-500 text-2xl text-white">
            {{ $t("movies.text_total") }}
            ({{ movies?.length }})
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex items-center gap-3">
            <div
              class="items-center gap-2 py-3 pl-0 pr-4 hidden xl:flex border-b border-transparent w-[14rem] has-[:focus]:w-[18rem] has-[:focus]:border-b-white"
            >
              <IconSearch class="shrink-0" />

              <input
                :placeholder="$t('general.text_search_by')"
                @keydown.enter="search"
                class="font-helvetica-400 text-xl text-[#CED4DA] bg-transparent focus:outline-none w-full"
              />
            </div>
          </div>
          <ButtonFilled
            text_key="movies.text_add_movie"
            icon="IconPlusBoardered"
            @click="isAddMovie = true"
          />
        </div>
      </header>
      <div class="mt-8 flex flex-wrap gap-12" v-if="movies">
        <MoviesListComponent
          v-for="(movie, index) in movies"
          :id="movie.id"
          :key="index"
          :title="movie.title"
          :image="movie.image"
          :year="movie.year"
          :quotes_num="movie.quote_num"
        />
      </div>
      <div
        ref="loadMoreMovies"
        :class="loading ? 'opacity-100' : 'opacity-0'"
        class="font-helvetica-500 text-white text-2xl"
      >
        Loading more...
      </div>
    </section>
  </div>

  <!-- ADD MOVIE FORM -->
  <AddMovie
    :closeModal="closeAddMovie"
    v-if="isAddMovie"
    :user_id="auth_user_data?.id"
  />
  <SuccessNotification
    v-if="status"
    :text_key="'movies.' + status"
    @close-notification="set_status(null)"
  />
</template>
