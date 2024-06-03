<script setup lang="ts">
import LayoutCrudForm from "@/components/layouts/LayoutCrudForm.vue";
import { onMounted, ref } from "vue";
import FormInputTextCustom from "../ui/form/FormInputTextCustom.vue";
import FormTextarea from "../ui/form/FormTextarea.vue";
import FormDropDown from "../ui/form/FormDropDown.vue";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { editMovie, getGenres } from "@/services/axios/movie-services";
import FormDragDrop from "../ui/form/FormDragDrop.vue";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import type { MoviesDataBilingual } from "@/types/types";
import { useRouter } from "vue-router";
import { useNotificationStore } from "@/stores/crud-notifications";

const movieStores = useMoviesStore();
const { set_genres } = useMoviesStore();
const { genres } = storeToRefs(movieStores);
const router = useRouter();
const {set_status} = useNotificationStore()

onMounted(async () => {
  if (!genres.value) {
    try {
      let response = await getGenres();
      set_genres(response.data.data);
    } catch (err) {
      return;
    }
  }
});

const props = defineProps<{
  closeModal: CallableFunction;
  user_id?: number;
  movie?: MoviesDataBilingual;
}>();
// form inputs
const name_en = ref<string | null>("default");
const name_ge = ref<string | null>("default");
const genre = ref<number[] | string | null>("default");
const year = ref<string | null>("default");
const image = ref<File | string | null>("default");
const director_en = ref<string | null>("default");
const director_ge = ref<string | null>("default");
const description_en = ref<string | null>("default");
const description_ge = ref<string | null>("default");

const catchText = (text: string | null, element: string) => {
  switch (element) {
    case "name_en":
      name_en.value = text;
      break;
    case "name_ge":
      name_ge.value = text;
      break;
    case "year":
      year.value = text;
      break;
    case "director_en":
      director_en.value = text;
      break;
    case "director_ge":
      director_ge.value = text;
      break;
    case "description_en":
      description_en.value = text;
      break;
    case "description_ge":
      description_ge.value = text;
      break;
  }
};

const catchGenres = (values: number[]) => {
  genre.value = values;
  console.log("genres:", genre.value);
};

const catchImg = (img: File) => {
  image.value = img;
};
/**
 * 1.if user does not touch the inputs
 */
const handleSubmit = async () => {
  console.log(
    name_en.value,
    name_ge.value,
    genre.value,
    year.value,
    image.value,
    director_en.value,
    director_ge.value,
    description_en.value,
    description_ge.value,
  );
  if (
    name_en.value &&
    name_ge.value &&
    genre.value &&
    genre.value.length !== 0 &&
    year.value &&
    image.value &&
    director_en.value &&
    director_ge.value &&
    description_en.value &&
    description_ge.value
  ) {
    let data = new FormData();

    if (name_en.value !== "default") {
      data.append("name_en", name_en.value);
    }
    if (name_ge.value !== "default") {
      data.append("name_ge", name_ge.value);
    }

    if (genre.value !== "default" && typeof genre.value !== "string") {
      genre.value.forEach((element) => {
        data.append("genre[]", String(element));
      });
    }
    if (year.value !== "default") {
      data.append("year", year.value);
    }
    if (image.value !== "default") {
      data.append("image", image.value);
    }
    if (director_en.value !== "default") {
      data.append("director_en", director_en.value);
    }
    if (director_ge.value !== "default") {
      data.append("director_ge", director_ge.value);
    }
    if (description_en.value !== "default") {
      data.append("description_en", description_en.value);
    }
    if (description_ge.value !== "default") {
      data.append("description_ge", description_ge.value);
    }

    if (
      !(
        name_en.value === "default" &&
        name_ge.value === "default" &&
        genre.value === "default" &&
        genre.value === "default" &&
        year.value === "default" &&
        image.value === "default" &&
        director_en.value === "default" &&
        director_ge.value === "default" &&
        description_en.value === "default" &&
        description_ge.value === "default"
      )
    ) {
      data.append("user_id", String(props.user_id));
      if (props.movie?.id) {
        try {
          await editMovie(data, String(props.movie.id));
          props.closeModal();
          set_status("MOVIE_UPDATED")
          router.push({ name: "movies" });
        } catch (err) {
          return;
        }
      }
    }
  }
};
</script>

<template>
  <LayoutCrudForm
    :closeModal="props.closeModal"
    header_key="movies.text_edit_movie"
  >
    <form @submit.prevent="handleSubmit" v-if="movie">
      <!-- NAME EN -->
      <div class="w-full mb-6">
        <FormInputTextCustom
          name="name_en"
          lang="Eng"
          label="Movie name"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.title.en"
        />
      </div>
      <!-- NAME GEO -->
      <div class="w-full mb-6">
        <FormInputTextCustom
          name="name_ge"
          lang="Geo"
          label="ფილმის სახელი"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.title.ge"
        />
      </div>
      <!-- GENRE DROPDOWN-->
      <div class="w-full mb-6">
        <FormDropDown
          v-if="genres"
          :options="genres"
          label_key="movies.text_genres"
          @send-chosen-values="catchGenres"
          :default_value="props.movie?.genres"
        />
      </div>

      <!-- YEAR -->
      <div class="w-full mb-6">
        <FormInputTextCustom
          name="year"
          label="Year/წელი"
          :validate_year="true"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.year"
        />
      </div>

      <!-- DIRECTOR EN -->
      <div class="w-full mb-6">
        <FormInputTextCustom
          name="director_en"
          lang="Eng"
          label="Director"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.director.en"
        />
      </div>
      <!-- DIRECTOR GEO -->
      <div class="w-full mb-6">
        <FormInputTextCustom
          name="director_ge"
          lang="Geo"
          label="რეჟისორი"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.director.ge"
        />
      </div>
      <!-- DESC EN -->
      <div class="w-full mb-6">
        <FormTextarea
          name="description_en"
          lang="Eng"
          label="Description"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.description.en"
        />
      </div>

      <!-- DESC GEO -->
      <div class="w-full mb-6">
        <FormTextarea
          name="description_ge"
          lang="Geo"
          label="აღწერა"
          :required="true"
          @send-text="catchText"
          :default_value="props.movie?.description.ge"
        />
      </div>
      <!-- IMAGE -->
      <div class="mb-6 w-ful">
        <FormDragDrop
          @selected-img="catchImg"
          :default_value="props.movie?.image"
        />
      </div>
      <ButtonFilled text_key="movies.text_edit_movie" :submit="true" />
    </form>
  </LayoutCrudForm>
</template>
