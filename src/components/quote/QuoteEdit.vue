<script setup lang="ts">
import LayoutCrudForm from "@/components/layouts/LayoutCrudForm.vue";
import EditDelete from "../shared/EditDelete.vue";
import { onMounted, ref } from "vue";
import { getSingleMovieQuotes, getSingleQuote, updateQuote } from "@/services/axios/quote-services";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import { useI18n } from "vue-i18n";
import { useNotificationStore } from "@/stores/crud-notifications";

import FormTextarea from "@/components/ui/form/FormTextarea.vue";
import FormDragDropLargePreview from "@/components/ui/form/FormDragDropLargePreview.vue";
import { useQuotesStore } from "@/stores/quotes";

const props = defineProps<{
  closeModal: CallableFunction;
  quote_id: string;
  movie_id: number;
}>();
const quote = ref<{
  quote_text: { en: string; ge: string };
  quote_image: string;
  comment_number: number;
  react_number: number;
  comments: {
    comment_author_name: string;
    comment_author_image: string;
    comment_text: string;
  }[];
}>();

const {set_status} = useNotificationStore();
const {set_movie_quotes} = useQuotesStore()

onMounted(async () => {
  try {
    let response = await getSingleQuote(props.quote_id);
    quote.value = response.data.data;
  } catch (err) {
    return;
  }
});

const catchText = (text: string | null, element: string) => {
  switch (element) {
    case "quote_en":
      quote_en.value = text;
      break;
    case "quote_ge":
      quote_ge.value = text;
      break;
  }
};

const emit = defineEmits<{
  (e: "triggerForm", quote_id: string, action: string): void;
}>();

const deleteQuote = () => {
  emit("triggerForm", props.quote_id, "delete");
};

const { t } = useI18n();
const img = ref<File | null | string>('default');
const quote_en = ref<string | null >('default');
const quote_ge = ref<string | null >('default');

const errors = ref<{
  img: string | null;
}>({ img: null});

const handleSelectedImg = (image: File) => {
  img.value = image;
  if (img.value) {
    errors.value.img = null;
  }
};

const handleSubmit = async () => {
  if (!img.value) {
    errors.value.img = t("validations.required");
  } else {
    errors.value.img = null;
  }

  if (img.value && quote_en.value && quote_ge.value && props.movie_id) {
    console.log("submit");
    let data = new FormData();
    if(img.value !== 'default' ){
        data.append("image", img.value);
    }
    if(quote_en.value !== 'default'){
        data.append("quote_en", quote_en.value);
    }
    if(quote_ge.value !== 'default'){
        data.append("quote_ge", quote_ge.value);
    }
    if(!(img.value!=='default' && quote_en.value !== 'default' && quote_ge.value !== 'default')) {
        data.append("movie_id", String(props.movie_id));
    }
    try {
 
      await updateQuote(data, props.quote_id);
      props.closeModal()
      set_status('QUOTE_UPDATED')
      try {
        const response = await getSingleMovieQuotes({ id: String(props.movie_id) });
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
    header_key="quote.text_edit_quote"
    :hideOnMobile="true"
  >
    <EditDelete
      location="top-8 left-8"
      bg="bg-transparent"
      :hideEdit="true"
      @delete="deleteQuote"
    />
    <form @submit.prevent="handleSubmit" v-if="quote">
      <div class="mb-6 w-full">
        <FormTextarea
          name="quote_en"
          placeholder_key="quote.placeholder_text_quote"
          lang="Eng"
          :required="true"
          :default_value="quote.quote_text.en"
          @send-text="catchText"
        />
      </div>
      <div class="mb-6 w-full">
        <FormTextarea
          name="quote_ge"
          placeholder_key="quote.placeholder_text_quote"
          lang="Geo"
          :required="true"
          :default_value="quote.quote_text.ge"
          @send-text="catchText"
        />
      </div>
      <div class="mb-6 w-full">
        <FormDragDropLargePreview @selected-img="handleSelectedImg" />
        <p
          class="font-helvetica-400 text-base text-red-400 mt-2"
          v-if="errors.img"
        >
          {{ errors.img }}
        </p>
      </div>

      <ButtonFilled text_key="quote.text_save_changes" :submit="true" />
    </form>
  </LayoutCrudForm>
</template>
