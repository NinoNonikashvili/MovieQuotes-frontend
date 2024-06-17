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

// QUOTES
const quoteStore = useQuotesStore();
const { quotes } = storeToRefs(quoteStore);
const { fetch, loading, fetchSearchedQuotes } = useFetchQuotes();

const longBtn = ref<string>("writeQuote");
const isAddQuoteModal = ref<boolean>(false);
const loadMoreRef = ref<HTMLElement | null>(null);
const searchKey = ref<string | null>(null);

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
  console.log("search");
  if (target.value) {
    searchKey.value = target.value;
    try {
      await fetchSearchedQuotes(target.value);
    } catch (err) {
      return;
    }
  }
};
const closeAddQuote = () => {
  isAddQuoteModal.value = false;
};
const handleWriteQuoteClick = () => {
  longBtn.value = "writeQuote";
  isAddQuoteModal.value = true;
};
</script>

<template>
  <div
    class="bg-[#181724] w-full"
    :class="isAddQuoteModal ? 'fixed' : 'static'"
  >
    <div
      class="hidden w-full px-16 pt-8 pb-[15rem] xl:flex bg-[#181724]"
      :class="{
        'blur-sm shadow-inner pointer-events-none -m-[8px] ': isAddQuoteModal,
      }"
    >
      <LayoutUsersPages
        :name="auth_user_data?.name"
        :image="auth_user_data?.image"
      />

      <section>
        <!-- WRITE QUOTE BTN & SEARCH -->
        <div class="flex gap-8 w-[58rem] mb-6">
          <button
            class="flex items-center gap-2 py-3 px-4 bg-[#24222F] rounded-[0.625rem]"
            :class="
              longBtn === 'writeQuote' ? 'w-full shrink' : 'w-fit shrink-0'
            "
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
                @keydown.enter="search"
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
