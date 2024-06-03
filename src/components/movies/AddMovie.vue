<script setup lang="ts">
import LayoutCrudForm from "@/components/layouts/LayoutCrudForm.vue";
import { onMounted, ref } from "vue";
import FormInputTextCustom from "../ui/form/FormInputTextCustom.vue";
import FormTextarea from "../ui/form/FormTextarea.vue";
import FormDropDown from "../ui/form/FormDropDown.vue";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { addMovie, getGenres, getMovies } from "@/services/axios/movie-services";
import FormDragDrop from "../ui/form/FormDragDrop.vue";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import { useNotificationStore } from "@/stores/crud-notifications";
import type { MoviesData } from "@/types/types";

const { set_status } = useNotificationStore();
const movieStores = useMoviesStore();
const { set_genres,set_movies } = useMoviesStore();
const { genres } = storeToRefs(movieStores);

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
}>();
// form inputs
// user id
const name_en = ref<string | null>(null);
const name_ge = ref<string | null>(null);
const genre = ref<number[] | null>(null);
const year = ref<string | null>(null);
const image = ref<File | null>(null);
const director_en = ref<string | null>(null);
const director_ge = ref<string | null>(null);
const description_en = ref<string | null>(null);
const description_ge = ref<string | null>(null);

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
    data.append("user_id", String(props.user_id));
    data.append("name_en", name_en.value);
    data.append("name_ge", name_ge.value);
    genre.value.forEach((element) => {
      data.append("genre[]", String(element));
    });
    data.append("year", year.value);
    data.append("image", image.value);
    data.append("director_en", director_en.value);
    data.append("director_ge", director_ge.value);
    data.append("description_en", description_en.value);
    data.append("description_ge", description_ge.value);
    console.log(props.user_id);
    try {
      await addMovie(data);
      set_status("MOVIE_ADDED");
      props.closeModal()
      try {
        const response = await getMovies();
        set_movies(response.data.data as MoviesData[]);
      } catch (err) {
        return;
      }
    } catch (err) {
      return;
    }
  }
};
</script>

<template>
  <LayoutCrudForm
    :closeModal="props.closeModal"
    header_key="movies.text_add_movie"
  >
    <form @submit.prevent="handleSubmit">
      <!-- NAME EN -->
      <div class="w-full mb-6">
        <FormInputTextCustom
          name="name_en"
          lang="Eng"
          label="Movie name"
          :required="true"
          @send-text="catchText"
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
        />
      </div>
      <!-- GENRE DROPDOWN-->
      <div class="w-full mb-6">
        <FormDropDown
          v-if="genres"
          :options="genres"
          label_key="movies.text_genres"
          @send-chosen-values="catchGenres"
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
        />
      </div>
      <!-- IMAGE -->
      <div class="mb-6 w-ful">
        <FormDragDrop @selected-img="catchImg" />
      </div>
      <ButtonFilled text_key="movies.text_add_movie" :submit="true" />
    </form>
  </LayoutCrudForm>
</template>
