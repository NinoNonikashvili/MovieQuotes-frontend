<script setup lang="ts">
import LayoutUserPages from "@/components/layouts/LayoutUserPages.vue";
import { useUserStore } from "@/stores/user";
import { useMoviesStore } from "@/stores/movies";
import { useQuotesStore } from "@/stores/quotes";
import { storeToRefs } from "pinia";
import EditDelete from "@/components/shared/EditDelete.vue";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import MovieQuotesComponent from "./MovieQuotesComponent.vue";
import { computed, ref } from "vue";

const user = useUserStore();
const movieStore = useMoviesStore();
const quoteStore = useQuotesStore();
const { movie_quotes } = storeToRefs(quoteStore);
const { auth_user_data } = storeToRefs(user);
const { movies } = storeToRefs(movieStore);
const editMovie = () => {};
const deleteMovie = () => {};
const props = defineProps<{
  id: string;
}>();

const movie = movies.value?.find((movie) => movie.id === parseInt(props.id));
// display form variables

const isEditMovie = ref<boolean>(false);
const isDeleteMovie = ref<boolean>(false);
const isAddQuote = ref<boolean>(false);
const isEditQuote = ref<boolean>(false);
const isViewQuote = ref<boolean>(false);
const isDeleteQuote = ref<boolean>(false);
const isFormVIsible = computed(() => {
  return (
    isEditQuote.value ||
    isViewQuote.value ||
    isAddQuote.value ||
    isEditMovie.value ||
    isDeleteMovie.value ||
    isDeleteQuote.value
  );
});

const handleTriggerForm = (id: String, action: string) => {
  console.log("id and action", id, action);
  switch (action) {
    case "edit":
      isEditQuote.value = true;
      break;
    case "view":
      isViewQuote.value = true;
      break;
    case "delete":
      isDeleteQuote.value = true;
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
            @editMovie="isEditMovie=true"
            @deleteMovie="isDeleteMovie= true"
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
  <!-- VIEW QUOTE FORM -->
  <!-- ADD QUOTE FORM -->
  <!-- EDIT QUOTE FORM -->
</template>
