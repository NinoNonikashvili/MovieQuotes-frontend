<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import NewsFeedQuote from "@/components/news-feed/NewFeedQuote.vue";
import IconWrite from "../icons/IconWrite.vue";
import { ref } from "vue";
import QuoteAdd from "@/components/quote/QuoteAdd.vue";
import { useQuotesStore } from "@/stores/quotes";

// QUOTES
const quoteStore = useQuotesStore();
const { quotes } = storeToRefs(quoteStore);

const longBtn = ref<string>("writeQuote");
const isAddQuoteModal = ref<boolean>(false);

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);


/**
 * 1. display write quote modal and save on click
 * 2. add search functionality and send request on enter click
 */
const closeAddQuote = () => {
  isAddQuoteModal.value = false;
};
const handleWriteQuoteClick = () => {
  longBtn.value = "writeQuote";
  isAddQuoteModal.value = true;
};
</script>

<template>
  <section class="bg-[#181724] pt-8 xl:hidden" :class="{'blur-sm pointer-events-none': isAddQuoteModal}">
    <!-- WRITE QUOTE BTN  -->
    <button
      class="flex items-center gap-2 py-3 px-4 mb-6 ml-9 w-fit"
      @click="handleWriteQuoteClick"
    >
      <IconWrite />
      <p class="font-helvetica-400 text-xl text-white">
        {{ $t("general.text_write_new_quote") }}
      </p>
    </button>

    <!-- QUOTES LIST -->
    <div>
      <NewsFeedQuote
        v-for="(quote, index) in quotes"
        :key="index"
        :quote="quote"
      />
    </div>
  </section>
  <div
    class="max-w-[60rem] absolute top-[7.375rem] left-0 right-0 mx-auto"
    v-if="isAddQuoteModal"
  >
    <QuoteAdd
      :closeModal="closeAddQuote"
      :user_name="auth_user_data?.name"
      :user_avatar="auth_user_data?.image"
    />
  </div>
</template>
