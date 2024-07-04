<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import NewsFeedDesktop from "@/components/news-feed/NewsFeedDesktop.vue";
import NewsFeedMobile from "@/components/news-feed/NewsFeedMobile.vue";
import { onMounted } from "vue";
import { getQuotes } from "@/services/axios/quote-services";
import { useQuotesStore } from "@/stores/quotes";
import type { NewsFeedQuote } from "@/types/types";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { set_quotes, set_quote_cursor } = useQuotesStore();

const load = async () => {
  try {
    const response = await getQuotes(null, null);
    set_quotes(response.data.quotes as NewsFeedQuote[]);
    if (response.data.next_url) {
      const url = new URL(response.data.next_url);
      const cursor = url.searchParams.get("cursor");
      if (cursor) {
        set_quote_cursor(cursor);
      } else {
        set_quote_cursor(null);
      }
    } else {
      set_quote_cursor(null);
    }
  } catch (err) {
    return;
  }
};

onMounted(async () => {
  await load();
});

watch(
  () => route.params.lang,
  async () => {
    await load();
  },
);
</script>

<template>
  <HeaderAuth />
  <NewsFeedDesktop />
  <NewsFeedMobile />
</template>
