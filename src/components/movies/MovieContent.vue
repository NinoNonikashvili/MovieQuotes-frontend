<script setup lang="ts">
import LayoutUserPages from "@/components/layouts/LayoutUserPages.vue";
import { useUserStore } from "@/stores/user";
import { useMoviesStore } from "@/stores/movies";
import { useQuotesStore } from "@/stores/quotes";
import { useNotificationStore } from "@/stores/crud-notifications";
import { storeToRefs } from "pinia";
import EditDelete from "@/components/shared/EditDelete.vue";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import MovieQuotesComponent from "./MovieQuotesComponent.vue";
import type { MoviesData } from "@/types/types";
import { computed, ref } from "vue";
import { deleteMovie } from "@/services/axios/movie-services";
import { useRouter, useRoute } from "vue-router";
import EditMovie from "./EditMovie.vue";
import {
  deleteQuote,
  getSingleMovieQuotes,
} from "@/services/axios/quote-services";
import SuccessNotification from "../shared/SuccessNotification.vue";
import QuoteView from "../quote/QuoteView.vue";
import QuoteEdit from "../quote/QuoteEdit.vue";
import QuoteAddFromMovie from "../quote/QuoteAddFromMovie.vue";

const notificationsStore = useNotificationStore();
const { status } = storeToRefs(notificationsStore);
const user = useUserStore();
const movieStore = useMoviesStore();
const quoteStore = useQuotesStore();
const { set_movie_quotes } = useQuotesStore();
const { movie_quotes } = storeToRefs(quoteStore);
const { auth_user_data } = storeToRefs(user);
const { movies } = storeToRefs(movieStore);

const router = useRouter();
const route = useRoute();
const props = defineProps<{
  id: string;
}>();

const current_movie = movies.value?.find(
  (movie) => movie.id === parseInt(props.id),
);
const movie = ref<MoviesData | undefined>(current_movie);
const { set_status } = useNotificationStore();

const handleEditMovie = () => {
  isEditMovie.value = true;
  console.log("edit movie");
};
const handleDeleteMovie = async () => {
  isDeleteMovie.value = true;
  console.log("delete movie", movie.value?.id);
  if (movie.value) {
    let id = movie.value.id;
    try {
      await deleteMovie(id);
      console.log("delelted successfully");
      set_status("MOVIE_DELETED");
      router.push({ name: "movies" });
    } catch (err) {
      return;
    }
  }
};
const handleDeleteQuote = async () => {
  if (selectedQuoteId.value) {
    try {
      await deleteQuote(selectedQuoteId.value);
      //close all the forsm from where delte can be triggered and reload quotes
      isViewQuote.value = false;
      isEditQuote.value = false;
      try {
        const id = route.params.id as string;
        const response = await getSingleMovieQuotes({ id: id });
        set_movie_quotes(response.data.quotes);
        set_status("QUOTE_DELETED");
      } catch (err) {
        err;
      }
    } catch (err) {
      return;
    }
  }
};
const closeEditMovie = () => {
  isEditMovie.value = false;
};
const closeViewQuote = () => {
  selectedQuoteId.value = null;
  isViewQuote.value = false;
};
const closeAddQuote = () => {
  selectedQuoteId.value = null;
  isAddQuote.value = false;
};
const closeEditQuote = () => {
  selectedQuoteId.value = null;
  isEditQuote.value = false;
};

// display form variables

const isEditMovie = ref<boolean>(false);
const isDeleteMovie = ref<boolean>(false);
const isAddQuote = ref<boolean>(false);
const isEditQuote = ref<boolean>(false);
const isViewQuote = ref<boolean>(false);
const selectedQuoteId = ref<string | null>(null);
const isFormVIsible = computed(() => {
  return (
    isEditQuote.value ||
    isViewQuote.value ||
    isAddQuote.value ||
    isEditMovie.value ||
    isDeleteMovie.value
  );
});

const handleTriggerForm = async (id: string, action: string) => {
  console.log("id and action", id, action);
  selectedQuoteId.value = id;
  switch (action) {
    case "edit":
      isViewQuote.value = false;
      isEditQuote.value = true;
      break;
    case "view":
      isViewQuote.value = true;
      break;
    case "delete":
      handleDeleteQuote();
      break;
  }
};
</script>

<template>
  <div
    class="w-full px-10 py-4 xl:px-16 xl:pt-8 pb-[15rem] flex bg-[#181724]"
    :class="{ 'pointer-events-none blur-sm': isFormVIsible }"
  >
    <LayoutUserPages
      class="hidden xl:flex"
      :name="auth_user_data?.name"
      :image="auth_user_data?.image"
    />

    <section class="w-full">
      <h1 class="font-helvetica-500 text-2xl text-white mb-5">
        {{ $t("movies.text_movie_description") }}
      </h1>
      <!-- DIV MOVIE DATA -->
      <div class="flex flex-col xl:flex-row gap-6 xl:gap-5 w-fit" v-if="movie">
        <img
          :src="movie.image"
          alt=""
          class="h-[18.875rem] w-[22.375rem] xl:w-[50.625rem] xl:h-[27.5rem] object-fit rounded-[0.25rem]"
        />
        <div class="relative">
          <h3 class="fomt-helvetica-500 text-[#DDCCAA] text-2xl mt-3 mb-5">
            {{ movie.title }} ({{ movie.year }})
          </h3>
          <div class="w-full overflow-hidden flex gap-2 mb-5">
            <div
              v-for="(genre, index) in movie.genres"
              :key="index"
              class="font-helvetica-700 text-white text-lg bg-[#6C757D] px-3 py-2 rounded-[0.25rem]"
            >
              {{ genre.title }}
            </div>
          </div>
          <p class="font-helvetica-700 text-white text-lg mb-5">
            {{ $t("quote.text_director") }}: {{ movie.director }}
          </p>
          <p class="font-helvetica-400 text-lg text-[#CED4DA]">
            {{ movie.description }}
          </p>
          <EditDelete
            @edit="handleEditMovie"
            @delete="handleDeleteMovie"
            location="top-0 right-0"
          />
        </div>
      </div>
      <!-- ADD MOVIE BTN -->
      <div
        class="flex flex-col xl:flex-row items-start xl:items-center gap-8 xl:gap-4 w-full xl:w-fit mt-10 mb-[3.75rem]"
      >
        <div class="flex gap-2 flex-col xl:flex-row w-fit shrink-0">
          <h1 class="font-helvetica-500 text-2xl text-white">
            {{ $t("movies.text_all_quotes") }}
          </h1>
          <p class="font-helvetica-500 text-2xl text-white">
            ({{ $t("movies.text_total") }} {{ movie_quotes?.length }})
          </p>
        </div>
        <div
          class="w-full h-[0.0625rem] xl:w-[0.0625rem] xl:h-4 bg-white"
        ></div>
        <div class="max-w-[9.5rem]">
          <ButtonFilled
            text_key="movies.text_add_quote"
            icon="IconPlusBoardered"
            @click="isAddQuote = true"
          />
        </div>
      </div>
      <!-- QUOTES LIST -->
      <div v-if="movie_quotes" class="max-w-[50.625rem]">
        <MovieQuotesComponent
          v-for="(quote, index) in movie_quotes"
          :key="index"
          :quote="quote"
          @triggerForm="handleTriggerForm"
        />
      </div>
    </section>
  </div>

  <!-- EDIT MOVIE FORM -->
  <EditMovie
    v-if="isEditMovie && auth_user_data && movie"
    :user_id="auth_user_data.id"
    :closeModal="closeEditMovie"
    :movie_id="movie.id"
  />
  <!-- VIEW QUOTE FORM -->

  <QuoteView
    :closeModal="closeViewQuote"
    :quote_id="selectedQuoteId"
    v-if="isViewQuote && selectedQuoteId"
    @triggerForm="handleTriggerForm"
  />
  <!-- ADD QUOTE FORM -->
  <QuoteAddFromMovie
    v-if="movie && isAddQuote"
    :close-modal="closeAddQuote"
    :movie="movie"
  />
  <!-- EDIT QUOTE FORM -->
  <QuoteEdit
    v-if="isEditQuote && selectedQuoteId && movie"
    :close-modal="closeEditQuote"
    :quote_id="selectedQuoteId"
    :movie_id="movie.id"
    @triggerForm="handleTriggerForm"
  />

  <SuccessNotification
    v-if="status"
    :text_key="'quote.' + status"
    @close-notification="set_status(null)"
  />
</template>
