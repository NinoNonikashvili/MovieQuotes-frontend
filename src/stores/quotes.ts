import { ref } from "vue";
import { defineStore } from "pinia";
import type { NewsFeedQuote, SingleMovieQuote } from "@/types/types";

export const useQuotesStore = defineStore("quotes", () => {
  const quotes = ref<NewsFeedQuote[] | undefined>(undefined);
  const movie_quotes = ref<SingleMovieQuote[] | undefined>(undefined);
  function set_quotes(state: NewsFeedQuote[]) {
    quotes.value = state;
  }

  function set_movie_quotes(state: SingleMovieQuote[]) {
    movie_quotes.value = state;
  }

  return { quotes, movie_quotes, set_quotes, set_movie_quotes };
});
