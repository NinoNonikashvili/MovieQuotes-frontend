<script setup lang="ts">
import FormTextarea from "@/components/ui/form/FormTextarea.vue";
import FormDragDrop from "@/components/ui/form/FormDragDrop.vue";
import {  ref } from "vue";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import { useI18n } from "vue-i18n";
import QuoteChosenMovie from "@/components/quote/QuoteChosenMovie.vue";
import type { MoviesData } from "@/types/types";
import { createQuote, getSingleMovieQuotes } from "@/services/axios/quote-services";
import LayoutCrudForm from "../layouts/LayoutCrudForm.vue";
import { useNotificationStore } from "@/stores/crud-notifications";
import { useQuotesStore } from "@/stores/quotes";


const props = defineProps<{
  closeModal: CallableFunction;
  movie: MoviesData;
}>();

const { t } = useI18n();
const img = ref<File | null>(null);
const quote_en = ref<string | null>(null);
const quote_ge = ref<string | null>(null);

const {set_status} = useNotificationStore();
const {set_movie_quotes} = useQuotesStore();

const errors = ref<{
  img: string | null;
  quote_en: string | null;
  quote_ge: string | null;
  movie: string | null;
}>({ img: null, quote_en: null, quote_ge: null, movie: null });

const handleSelectedImg = (image: File) => {
  img.value = image;
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

  if (img.value && quote_en.value && quote_ge.value) {
    console.log("submit");
    try {
      const data = new FormData();
      data.append("movie_id", String(props.movie.id));
      data.append("quote_en", quote_en.value);
      data.append("quote_ge", quote_ge.value);
      data.append("image", img.value);

      console.log("data:", data);
        await createQuote(data);
        set_status('QUOTE_ADDED')
        props.closeModal();
        try {
        const response = await getSingleMovieQuotes({ id: String(props.movie.id) });
        set_movie_quotes(response.data.quotes);
      } catch (err) {
        err;
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
    header_key="quote.text_write_new_quote"
  >
    <!-- FORM -->
    <form @submit.prevent="handleSubmitClick">
      <div class="w-full mb-6">
        <QuoteChosenMovie :movieData="props.movie" />
      </div>
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

      <ButtonFilled text_key="quote.text_post" :submit="true" />
    </form>
  </LayoutCrudForm>
</template>
