<script setup lang="ts">
import FormTextarea from "@/components/ui/form/FormTextarea.vue";
import FormDropDownWithIcon from "@/components/ui/form/FormDropDownWithIcon.vue";
import FormDragDrop from "@/components/ui/form/FormDragDrop.vue";
import { onMounted, ref } from "vue";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import { useI18n } from "vue-i18n";
import QuoteChosenMovie from "@/components/quote/QuoteChosenMovie.vue";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import type { MoviesData } from "@/types/types";
import { createQuote } from "@/services/axios/quote-services";
import { getMovies } from "@/services/axios/movie-services";
import LayoutCrudForm from "../layouts/LayoutCrudForm.vue";
import { useNotificationStore } from "@/stores/crud-notifications";

const moviesStore = useMoviesStore();
const { set_movies } = useMoviesStore();
const { movies } = storeToRefs(moviesStore);
const { set_status } = useNotificationStore();

onMounted(async () => {
  //fetch movies if not fetched yet
  if (!movies.value) {
    try {
      const response = await getMovies(null, null);
      set_movies(response.data.data);
    } catch (err) {
      return;
    }
  }
});

const props = defineProps<{
  closeModal: CallableFunction;
  user_name?: string;
  user_avatar?: string;
}>();

const { t } = useI18n();
const img = ref<File | null>(null);
const quote_en = ref<string | null>(null);
const quote_ge = ref<string | null>(null);
const chosenMovieData = ref<MoviesData | undefined>();

const errors = ref<{
  img: string | null;
  quote_en: string | null;
  quote_ge: string | null;
  movie: string | null;
}>({ img: null, quote_en: null, quote_ge: null, movie: null });

const handleSelectedImg = (image: File) => {
  img.value = image;
};
const catchChosenMovie = (chosenMovie: string) => {
  chosenMovieData.value = movies.value?.find(
    (movie) => movie.title === chosenMovie,
  );
};
const catchQuote = (text: string | null, elementRef: string) => {
  elementRef === "quote_en" ? (quote_en.value = text) : (quote_ge.value = text);
};

const handleSubmitClick = async () => {
  if (!img.value) {
    errors.value.img = t("quote.image_label") + " " + t("quote.required");
  } else {
    errors.value.img = null;
  }
  if (!chosenMovieData.value) {
    errors.value.movie = t("quote.movie_label") + " " + t("quote.required");
  } else {
    errors.value.movie = null;
  }
  if (img.value && quote_en.value && quote_ge.value && chosenMovieData.value) {
    try {
      const data = new FormData();
      data.append("movie_id", String(chosenMovieData.value.id));
      data.append("quote_en", quote_en.value);
      data.append("quote_ge", quote_ge.value);
      data.append("image", img.value);

      await createQuote(data);
      props.closeModal();
      set_status("QUOTE_ADDED");
    } catch (err) {
      return;
    }
  }
};
</script>

<template>
  <LayoutCrudForm
    :closeModal="props.closeModal"
    header_key="quote.text_write_new_quote"
  >
    <!-- FORM -->
    <form @submit.prevent="handleSubmitClick">
      <div class="mb-6 w-full">
        <FormTextarea
          name="quote_en"
          placeholder_key="quote.placeholder_add_quote_content"
          lang="Eng"
          :required="true"
          @send-text="catchQuote"
        />
      </div>
      <div class="mb-6 w-full">
        <FormTextarea
          name="quote_ge"
          placeholder_key="quote.placeholder_add_quote_content"
          lang="Geo"
          :required="true"
          @send-text="catchQuote"
        />
      </div>
      <div class="mb-6 w-full">
        <FormDragDrop @selected-img="handleSelectedImg" />
        <p
          class="font-helvetica-400 text-base text-red-400 mt-2"
          v-if="errors.img"
        >
          {{ errors.img }}
        </p>
      </div>
      <div v-if="chosenMovieData" class="w-full mb-6">
        <QuoteChosenMovie :movieData="chosenMovieData" />
      </div>
      <div class="mb-6 w-full">
        <FormDropDownWithIcon @send-chosen-movie="catchChosenMovie" />
        <p
          class="font-helvetica-400 text-base text-red-400 mt-2"
          v-if="errors.movie"
        >
          {{ errors.movie }}
        </p>
      </div>

      <ButtonFilled text_key="quote.text_post" :submit="true" />
    </form>
  </LayoutCrudForm>
</template>
