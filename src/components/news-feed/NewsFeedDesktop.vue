<script setup lang="ts">
import LayoutUsersPages from "@/components/layouts/LayoutUserPages.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import NewsFeedQuote from "@/components/news-feed/NewFeedQuote.vue";
import IconWrite from "../icons/IconWrite.vue";
import IconSearch from "../icons/IconSearch.vue";
import { ref, onMounted } from "vue";
import QuoteAdd from "@/components/quote/QuoteAdd.vue";
import { useQuotesStore } from "@/stores/quotes";
import { useFetchQuotes } from "@/composables/useFetchQuotes";
import QuoteView from "../quote/QuoteView.vue";
import SuccessNotification from "../shared/SuccessNotification.vue";
import { useNotificationStore } from "@/stores/crud-notifications";
import i18n from "@/plugins/i18n";

// QUOTES
const quoteStore = useQuotesStore();
const { set_view_quote_id } = useQuotesStore();
const { quotes, view_quote_id } = storeToRefs(quoteStore);
const { fetch, loading, fetchSearchedQuotes } = useFetchQuotes();

const notificationsStore = useNotificationStore();
const { status } = storeToRefs(notificationsStore);
const { set_status } = useNotificationStore();
const { locale } = i18n.global;
const localeObj = i18n.global;

const longBtn = ref<string>("writeQuote");
const isAddQuoteModal = ref<boolean>(false);
const loadMoreRef = ref<HTMLElement | null>(null);
const searchKey = ref<string | null>(null);
const searchErrorMessage = ref<string | null>(null);

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);

onMounted(() => {
  const options = {
    root: null, // Relative to the viewport
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(async (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await fetch(searchKey.value);
      }
    });
  }, options);
  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
});

const search = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.value) {
    if (locale.value === "en" && target.value.match(/[ა-ჰ]/g)) {
      searchErrorMessage.value = localeObj.t("validations.only_en");
    } else if (locale.value === "ge" && target.value.match(/[a-zA-Z]/g)) {
      searchErrorMessage.value = localeObj.t("validations.only_ge");
    } else {
      searchErrorMessage.value = null;
      searchKey.value = target.value;
      try {
        await fetchSearchedQuotes(target.value);
      } catch (err) {
        return;
      }
    }
  }
};

const resetSearchKey = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.value === "") {
    searchKey.value = null;
  }
};
const closeAddQuote = () => {
  isAddQuoteModal.value = false;
};
const handleWriteQuoteClick = () => {
  longBtn.value = "writeQuote";
  isAddQuoteModal.value = true;
};

const closeViewQuote = () => {
  set_view_quote_id(null);
};
</script>

<template>
  <div :class="{ overlay: isAddQuoteModal || view_quote_id }"></div>

  <div
    class="hidden w-full px-16 pt-8 pb-[15rem] xl:flex bg-[#181724]"
    :class="{ 'fixed pointer-events-none': isAddQuoteModal || view_quote_id }"
  >
    <LayoutUsersPages
      :name="auth_user_data?.name"
      :image="auth_user_data?.image"
    />

    <section>
      <!-- WRITE QUOTE BTN & SEARCH -->
      <div class="flex gap-8 w-[58rem] mb-6 items-start">
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
        <div class="flex flex-col gap-2 w-full">
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
                @keydown.enter="search"
                @input="resetSearchKey"
              />
              <p
                class="font-helvetica-400 text-xl text-[#CED4DA] peer-focus:hidden absolute top-0 left-0 pointer-events-none"
                :class="{ hidden: searchKey }"
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
          <p
            class="font-helvetica-400 text-base text-red-400 ml-2"
            :class="searchErrorMessage ? 'text-red-400' : 'text-transparent'"
          >
            {{ searchErrorMessage }}
          </p>
        </div>
      </div>
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
        ref="loadMoreRef"
        :class="loading ? 'opacity-100' : 'opacity-0'"
        class="font-helvetica-500 text-white text-2xl"
      >
        Loading more...
      </div>
    </section>
  </div>

  <QuoteAdd
    v-if="isAddQuoteModal"
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
</template>
<style>
.overlay {
  position: fixed;
  width: 100%;
  height: auto;
  top: 106px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(25, 23, 37, 0.5);
  z-index: 2;
}
</style>
