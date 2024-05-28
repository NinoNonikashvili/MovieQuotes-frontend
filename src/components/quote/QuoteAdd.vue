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

const moviesStore = useMoviesStore();
const { movies } = storeToRefs(moviesStore);

onMounted(() => {
  //fetch movies if not fetched yet
  if (!movies) {
    console.log("fetch movies");
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
const movie = ref<string | null>(null);
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
  chosenMovieData.value = movies.value?.filter(
    (movie) => movie.name === chosenMovie,
  ) as MoviesData | undefined;
  if (!chosenMovieData.value) {
    chosenMovieData.value = {
      id: 1,
      name: "blabla",
      image: "",
      year: "1999",
      director: "Nino Richiie",
      genres: ["bla", "bla", "blue"],
    };
  }
};

const handleSubmitClick = () => {
  if (!img.value) {
    errors.value.img = t("quote.required", { element: "image" });
  }
  if (!quote_en.value) {
    errors.value.quote_en = t("quote.required", {
      element: "quote text in english",
    });
  }
  if (!quote_ge.value) {
    errors.value.quote_ge = t("quote.required", {
      element: "quote text in georgian",
    });
  }
  if (!movie.value) {
    errors.value.movie = t("quote.required", { element: "movie" });
  }
  if (img.value && quote_en.value && quote_ge.value && movie.value) {
    console.log("submit");
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
            name="quote_geo"
            placeholder_key="quote.placeholder_add_quote_content"
            lang="Geo"
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
          <FormDropDownWithIcon
            :movies="[{ name: 'Avatar' }, { name: 'blossom' }]"
            @send-chosen-movie="catchChosenMovie"
          />
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
</template>
