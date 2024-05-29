<script setup lang="ts">
import IconCross from "@/components/icons/IconCross.vue";
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
import SuccessNotification from "@/components/shared/SuccessNotification.vue";
import ErrorNotification from "@/components/shared/ErrorNotification.vue";

const moviesStore = useMoviesStore();
const { set_movies } = useMoviesStore();
const { movies } = storeToRefs(moviesStore);

onMounted(async () => {
  //fetch movies if not fetched yet
  console.log("mounted", movies.value);
  if (!movies.value) {
    try {
      const response = await getMovies();
      console.log(response.data);
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
const addQuoteSuccess = ref<boolean>(false);
const addQuoteFailure = ref<boolean>(false);
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
  console.log(chosenMovie);
  chosenMovieData.value = movies.value?.find(
    (movie) => movie.title === chosenMovie,
  );
};
const catchQuote = (text: string, elementRef: string) => {
  elementRef === "quote_en" ? (quote_en.value = text) : (quote_ge.value = text);
};

const handleSubmitClick = async () => {
  if (!img.value) {
    errors.value.img = t("quote.image_label") + " " + t("quote.required");
  } else {
    errors.value.img = null;
  }
  if (!quote_en.value) {
    errors.value.quote_en =
      t("quote.quote_label") + " " + t("quote.required_in_en");
  } else if (!quote_en.value?.match(/^[a-zA-Z0-9.,?!@#$%^&*()"" -_|]+$/gm)) {
    errors.value.quote_en = t("quote.only_en");
  } else {
    errors.value.quote_en = null;
  }

  if (!quote_ge.value) {
    errors.value.quote_ge =
      t("quote.quote_label") + " " + t("quote.required_in_ge");
  } else if (!quote_ge.value?.match(/^[ა-ჰ0-9.,?!@#$%^&*()"" -_|]+$/gm)) {
    errors.value.quote_ge = t("quote.only_ge");
  } else {
    errors.value.quote_ge = null;
  }

  if (!chosenMovieData.value) {
    errors.value.movie = t("quote.movie_label") + " " + t("quote.required");
  } else {
    errors.value.movie = null;
  }
  if (img.value && quote_en.value && quote_ge.value && chosenMovieData.value) {
    console.log("submit");
    try {
      const data = new FormData();
      data.append('movie_id', String(chosenMovieData.value.id))
      data.append('quote_en', quote_en.value)
      data.append('quote_ge', quote_ge.value)
      data.append('image', img.value)

      console.log('data:', data)
      await createQuote(data);
      addQuoteSuccess.value = true;
    } catch (err) {
      addQuoteFailure.value = true;
      return;
    }
  }
};
</script>

<template>
  <div class="bg-[#11101A] rounded-xl w-full">
    <!-- HEADER -->
    <div class="px-10 py-11 border-b border-b-white flex items-center">
      <h2 class="font-helvetica-500 text-2xl text-white mx-auto">
        {{ $t("quote.text_write_new_quote") }}
      </h2>
      <IconCross @click="props.closeModal" color="#ffffff" />
    </div>
    <!-- USER -->
    <div class="flex gap-3 items-center w-fit px-10 py-11">
      <img
        :src="props.user_avatar"
        alt="quote author image"
        class="w-10 xl:w-14 rounded-full"
      />
      <p class="font-helvetica-400 text-xl text-white">
        {{ props.user_name }}
      </p>
    </div>
    <!-- FORM -->
    <div class="px-10 py-11">
      <form @submit.prevent="handleSubmitClick">
        <div class="mb-6 w-full">
          <FormTextarea
            name="quote_en"
            placeholder_key="quote.placeholder_add_quote_content"
            lang="Eng"
            @send-text="catchQuote"
          />
          <p
            class="font-helvetica-400 text-base text-red-400 mt-2"
            v-if="errors.quote_en"
          >
            {{ errors.quote_en }}
          </p>
        </div>
        <div class="mb-6 w-full">
          <FormTextarea
            name="quote_ge"
            placeholder_key="quote.placeholder_add_quote_content"
            lang="Geo"
            @send-text="catchQuote"
          />
          <p
            class="font-helvetica-400 text-base text-red-400 mt-2"
            v-if="errors.quote_ge"
          >
            {{ errors.quote_ge }}
          </p>
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
    </div>
  </div>
  <SuccessNotification
    text_key="quote.success_quote_added"
    v-if="addQuoteSuccess"
    @close-notification="addQuoteSuccess = false"
  />
  <ErrorNotification
    text_key="quote.error_quote_added"
    v-if="addQuoteFailure"
    @close-notification="addQuoteFailure = false"
  />
</template>
