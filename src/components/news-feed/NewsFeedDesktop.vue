<script setup lang="ts">
import LayoutUsersPages from "@/components/layouts/LayoutUserPages.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import NewsFeedQuote from "@/components/news-feed/NewFeedQuote.vue";
import IconWrite from "../icons/IconWrite.vue";
import IconSearch from "../icons/IconSearch.vue";
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
  <div class="hidden w-full px-16 pt-8 pb-[15rem] xl:flex bg-[#181724]">
    <LayoutUsersPages
      :name="auth_user_data?.name"
      :image="auth_user_data?.image"
    />

    <section>
      <!-- WRITE QUOTE BTN & SEARCH -->
      <div class="flex gap-8 w-[58rem] mb-6">
        <button
          class="flex items-center gap-2 py-3 px-4 bg-[#24222F] rounded-[0.625rem]"
          :class="longBtn === 'writeQuote' ? 'w-full shrink' : 'w-fit shrink-0'"
          @click="handleWriteQuoteClick"
        >
          <IconWrite />
          <p class="font-helvetica-400 text-xl text-white">
            {{ $t("general.text_write_new_quote") }}
          </p>
        </button>
        <div
          class="flex items-center gap-2 py-3 px-4"
          :class="longBtn === 'search' ? 'w-full shrink' : 'w-fit shrink-0'"
          @click="longBtn = 'search'"
        >
          <IconSearch />
          <p
            class="font-helvetica-400 text-xl text-[#CED4DA]"
            v-if="longBtn !== 'search'"
          >
            {{ $t("general.text_search_by") }}
          </p>
          <div v-if="longBtn === 'search'" class="relative w-full">
            <input
              class="font-helvetica-400 text-xl text-[#CED4DA] bg-transparent focus:outline-none peer"
            />
            <p
              class="font-helvetica-400 text-xl text-[#CED4DA] peer-focus:hidden absolute top-0 left-0 pointer-events-none"
            >
              {{ $t("general.text_enter")
              }}<span class="font-helvetica-400 text-xl text-white">@</span>
              {{ $t("general.search_movie_instructions") }},
              {{ $t("general.text_enter")
              }}<span class="font-helvetica-400 text-xl text-white">#</span>
              {{ $t("general.search_quote_instructions") }}
            </p>
          </div>
        </div>
      </div>
      <!-- QUOTES LIST -->
      <div>
        <NewsFeedQuote
          v-for="(quote, index) in quotes"
          :key="index"
          :quote="quote"
        />
      </div>
    </section>
  </div>

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
