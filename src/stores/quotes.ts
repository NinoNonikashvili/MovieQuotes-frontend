import { ref } from "vue";
import { defineStore } from "pinia";
import type { NewsFeedQuote, SingleMovieQuote } from "@/types/types";

export const useQuotesStore = defineStore("quotes", () => {
  const quotes = ref<NewsFeedQuote[] | undefined>(undefined);
  const movie_quotes = ref<SingleMovieQuote[] | undefined>(undefined);
  const quote_cursor = ref<string | null>(null);

  function set_quotes(state: NewsFeedQuote[]) {
    quotes.value = state;
  }
  function push_quotes(state: NewsFeedQuote[]) {
    state.forEach((quote) => quotes.value?.push(quote));
  }

  function set_movie_quotes(state: SingleMovieQuote[]) {
    movie_quotes.value = state;
  }

  function set_quote_cursor(cursor: string | null) {
    quote_cursor.value = cursor;
  }

  return {
    quotes,
    movie_quotes,
    quote_cursor,
    set_quotes,
    set_movie_quotes,
    set_quote_cursor,
    push_quotes,
  };
});
