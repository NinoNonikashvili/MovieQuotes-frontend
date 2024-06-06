import { ref } from "vue";
import { useQuotesStore } from "@/stores/quotes";
import { storeToRefs } from "pinia";
import { getQuotes } from "@/services/axios/quote-services";

export function useFetchQuotes() {
  const quoteStore = useQuotesStore();
  const { quote_cursor, quotes } = storeToRefs(quoteStore);
  const { set_quotes, set_quote_cursor, push_quotes } = useQuotesStore();

  const loading = ref<boolean | null>(false);
  const error = ref(null);

  const fetch = async () => {
    console.log(quote_cursor.value, "value");
    if (quote_cursor.value) {
      loading.value = true;
      try {
        const response = await getQuotes(quote_cursor.value);
        push_quotes(response.data.quotes);
        console.log(quotes.value);
        loading.value = false;
        if (response.data.next_url) {
          const url = new URL(response.data.next_url);

          // Use URLSearchParams to get the value of the cursor parameter
          const cursor = url.searchParams.get("cursor");
          if (cursor) {
            set_quote_cursor(cursor);
          } else {
            set_quote_cursor(null);
          }
        } else {
          set_quote_cursor(null);
        }
      } catch (err: any) {
        error.value = err;
        loading.value = false;
      }
    }
  };

  return { fetch, error, loading };
}
