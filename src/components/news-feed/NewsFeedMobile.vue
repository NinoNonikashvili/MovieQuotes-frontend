<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import NewsFeedQuote from "@/components/news-feed/NewFeedQuote.vue";
import IconWrite from "../icons/IconWrite.vue";
import { ref } from "vue";
import QuoteAdd from "@/components/quote/QuoteAdd.vue";

const longBtn = ref<string>("writeQuote");
const isAddQuoteModal = ref<boolean>(false);

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);
const comments = [
  {
    comment_author_name: "Nino",
    comment_author_image: auth_user_data?.value?.image,
    comment_text: "Nino says it is great movie quote.",
  },
  {
    comment_author_name: "Elene",
    comment_author_image: auth_user_data?.value?.image,
    comment_text: "Elene says it is great movie quote.",
  },
];

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
  <section class="bg-[#181724] pt-8 xl:hidden" >
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
        :author_avatar="auth_user_data?.image"
        :user_avatar="auth_user_data?.image"
        author_name="Nino Noni"
        quote_text="all you need is love"
        :quote_image="auth_user_data?.image"
        quote_year="1999"
        quote_director="Nelson Mandela"
        :comment_number="12"
        :react_number="2"
        :comments="comments"
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
