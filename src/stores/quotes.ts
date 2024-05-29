import { ref } from "vue";
import { defineStore } from "pinia";
import type { NewsFeedQuote } from "@/types/types";

export const useQuotesStore = defineStore("quotes", () => {
  const quotes = ref<NewsFeedQuote[] | undefined>(undefined);
  function set_quotes(state: NewsFeedQuote[]) {
    quotes.value = state;
  }

  return { quotes, set_quotes };
});
