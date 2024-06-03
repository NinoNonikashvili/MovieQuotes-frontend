<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import NewsFeedDesktop from "@/components/news-feed/NewsFeedDesktop.vue";
import NewsFeedMobile from "@/components/news-feed/NewsFeedMobile.vue";
import { onBeforeUnmount, onMounted } from "vue";
import { getQuotes } from "@/services/axios/quote-services";
import { useQuotesStore } from "@/stores/quotes";
import type { NewsFeedQuote } from "@/types/types";

onMounted(async () => {
  const { set_quotes } = useQuotesStore();
  try {
    const response = await getQuotes();
    set_quotes(response.data.quotes as NewsFeedQuote[]);
  } catch (err) {
    return;
  }
});

onBeforeUnmount(()=>{
  console.log('news feed unmounted')
})
</script>

<template>
  <HeaderAuth />
  <NewsFeedDesktop />
  <NewsFeedMobile />
</template>
