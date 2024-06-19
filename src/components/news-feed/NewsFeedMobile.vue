<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import NewsFeedQuote from "@/components/news-feed/NewFeedQuote.vue";
import IconWrite from "../icons/IconWrite.vue";
import { ref, onMounted } from "vue";
import QuoteAdd from "@/components/quote/QuoteAdd.vue";
import { useQuotesStore } from "@/stores/quotes";
import { useFetchQuotes } from "@/composables/useFetchQuotes";
import QuoteView from "../quote/QuoteView.vue";
import SuccessNotification from "../shared/SuccessNotification.vue";
import { useNotificationStore } from "@/stores/crud-notifications";

// QUOTES
const quoteStore = useQuotesStore();
const { set_view_quote_id } = useQuotesStore();
const { quotes, view_quote_id } = storeToRefs(quoteStore);

const longBtn = ref<string>("writeQuote");
const isAddQuoteModal = ref<boolean>(false);

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);
const elLoadMore = ref<HTMLElement | null>(null);

const { fetch, loading } = useFetchQuotes();
onMounted(() => {
  const options = {
    root: null, // Relative to the viewport
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(async (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await fetch(null);
      }
    });
  }, options);
  if (elLoadMore.value) {
    observer.observe(elLoadMore.value);
  }
});

const closeViewQuote = () => {
  set_view_quote_id(null);
};

const notificationsStore = useNotificationStore();
const { status } = storeToRefs(notificationsStore);
const { set_status } = useNotificationStore();


const closeAddQuote = () => {
  isAddQuoteModal.value = false;
};
const handleWriteQuoteClick = () => {
  longBtn.value = "writeQuote";
  isAddQuoteModal.value = true;
};
</script>

<template>
  <section
    class="bg-[#181724] pt-8 xl:hidden min-h-screen"
    :class="{ 'fixed pointer-events-none': isAddQuoteModal || view_quote_id }"
  >
    <div :class="{ overlay: isAddQuoteModal || view_quote_id }"></div>
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
    <div v-if="quotes">
      <NewsFeedQuote
        v-for="(quote, index) in quotes"
        :key="index"
        :quote="quote"
        :last="index === quotes.length - 1"
      />
    </div>

    <div
      ref="elLoadMore"
      :class="loading ? 'opacity-100' : 'opacity-0'"
      class="font-helvetica-500 text-white text-2xl"
    >
      Loading more...
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
    <QuoteView
      :closeModal="closeViewQuote"
      :quote_id="view_quote_id"
      :doNotShowCrud="true"
      v-if="view_quote_id"
    />
    <SuccessNotification
    v-if="status"
    :text_key="'quote.' + status"
    @close-notification="set_status(null)"
  />
  </div>
</template>
