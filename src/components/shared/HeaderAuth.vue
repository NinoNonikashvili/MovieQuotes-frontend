<script setup lang="ts">
import IconBurger from "@/components/icons/IconBurger.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconBell from "@/components/icons/IconBell.vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import i18n from "@/plugins/i18n";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import HeaderAuthNavigation from "@/components/shared/HeaderAuthNavigation.vue";
import HeaderAuthLangAndLogout from "@/components/shared/HeaderAuthLangAndLogout.vue";
import { storeToRefs } from "pinia";
import { useQuoteNotificationStore } from "@/stores/quote-notifications";
import HeaderAuthSingleNotificationComponent from "./HeaderAuthSingleNotificationComponent.vue";
import {
  getNotifications,
  setAllNotificationsSeen,
  setNotificationSeen,
} from "@/services/axios/quote-services";
import { useFetchQuotes } from "@/composables/useFetchQuotes";
import { useQuotesStore } from "@/stores/quotes";

const { locale } = i18n.global;
const route = useRoute();
const user = useUserStore();
const { auth_user_data } = storeToRefs(user);
const { fetchSearchedQuotes } = useFetchQuotes();
const quoteStore = useQuotesStore();
const { set_view_quote_id } = useQuotesStore();
const { quotes } = storeToRefs(quoteStore);

const isBurgerMenuVisible = ref<boolean>(false);
const isSearchVisible = ref<boolean>(false);
const isNotificationModalVisible = ref<boolean>(false);
const tempIsNotificationModalVisible = ref<boolean>(false);

const burgerRef = ref(null);
const notificationModalRef = ref(null);
const notificationStore = useQuoteNotificationStore();
const {
  set_notification,
  decreaseSeenNotCount,
  setSeenNotCount,
  resetSeenNotCount,
} = useQuoteNotificationStore();
const { notifications, seenNotificationNum } = storeToRefs(notificationStore);
const searchKey = ref<string | null>(null);


const handleNotificationClick = async (notification_id: number) => {
  decreaseSeenNotCount();

  try {
    await setNotificationSeen(String(notification_id));
    let response = await getNotifications();
    set_notification(response.data.data);
    setSeenNotCount(response.data.data);
  } catch (err) {
    return;
  }
};

const showSearchedQuote = (e: Event) => {
  toggleSearch();
  const target = e.currentTarget as HTMLElement;
  if (target.dataset.id) {
    handleViewQuote(Number(target.dataset.id));
  }
};

const handleViewQuote = (quote_id: number) => {
  set_view_quote_id(String(quote_id));
  isNotificationModalVisible.value=false;
};

const mskeAllNotsSeen = async () => {
  notifications.value.forEach((not) => (not.seen = true));
  resetSeenNotCount();
  try {
    await setAllNotificationsSeen();
  } catch (err) {
    return;
  }
};



onClickOutside(burgerRef, () => {
  isBurgerMenuVisible.value = false;
});
onClickOutside(notificationModalRef, () => {
  isNotificationModalVisible.value = false;
});
const toggleIsNotificationModalVisible = () => {
  //prevent double toggling if outside click already toggled
  tempIsNotificationModalVisible.value = !tempIsNotificationModalVisible.value;
  if (
    tempIsNotificationModalVisible.value === isNotificationModalVisible.value
  ) {
    return;
  }
  isNotificationModalVisible.value = !isNotificationModalVisible.value;
};

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};


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

</script>

<template>
  <div
    class="px-9 xl:px-16 py-8 bg-[#222030] flex justify-between items-center relative"
  >
    <!-- BURGER MENU -->
    <IconBurger @click="isBurgerMenuVisible = true" class="xl:hidden" />
    <RouterLink
      :to="{ name: 'news-feed', params: { lang: locale } }"
      class="hidden xl:block"
    >
      <h3 class="font-helvetica-500 text-base text-[#DDCCAA]">
        {{ $t("general.site_name") }}
      </h3>
    </RouterLink>

    <!-- BURGER MODAL -->
    <div
      class="max-w-[23.75rem] h-[41rem] bg-[#11101A] absolute top-0 left-0 p-[2.8125rem] z-10"
      ref="burgerRef"
      v-if="isBurgerMenuVisible"
    >
      <div class="flex flex-col gap-10 items-start">
        <HeaderAuthNavigation
          :lang="locale"
          :name="auth_user_data?.name"
          :image="auth_user_data?.image"
        />
        <HeaderAuthLangAndLogout :visibility="null" />
      </div>
    </div>

    <div class="flex gap-4 items-center">
      <!-- SEARCH -->
      <IconSearch
        @click="toggleSearch"
        v-if="route.name === 'news-feed'"
        class="xl:hidden"
      />
      <!-- SEARCH MODAL -->
      <div
        class="w-full h-screen bg-[#12101A] absolute top-0 left-0 z-10"
        v-if="isSearchVisible"
      >
        <div class="py-4 px-6 flex gap-4 items-center">
          <div class="w-5">
            <IconLeftArrow @click="toggleSearch" />
          </div>

          <input
            @keydown.enter="search"
            type="text"
            :placeholder="$t('general.text_search')"
            class="focus:outline-none bg-transparent font-helvetica-400 text-base text-white placeholder:text-white"
          />
        </div>
        <div>
          <div v-if="quotes && searchKey">
            <div
              v-for="(quote, index) in quotes"
              :key="index"
              @click="showSearchedQuote"
              :data-id="quote.quote_id"
            >
              <div class="my-4 ml-4">
                <q class="font-helvetica-400 text-white text-xl">{{
                  quote.quote_text
                }}</q>
                <span class="font-helvetica-400 text-white text-xl"
                  >{{ $t("general.text_movie") }} -
                  <span class="font-helvetica-500 text-[#DDCCAA]"
                    >{{ quote.quote_director }}.</span
                  >
                  ({{ quote.quote_year }})</span
                >
              </div>
            </div>
          </div>
          <div v-if="!quotes" class="w-full px-[4.625rem] py-6">
            <p class="text-[#636268] font-helvetica-geo-400 text-base mb-5">
              {{ $t("general.text_enter") }}
              <span class="text-white font-helvetica-geo-400 text-base">@</span>
              {{ $t("general.search_movie_instructions") }}
            </p>
            <p class="text-[#636268] font-helvetica-geo-400 text-base">
              {{ $t("general.text_enter") }}
              <span class="text-white font-helvetica-geo-400 text-base">#</span>
              {{ $t("general.search_quote_instructions") }}
            </p>
          </div>
        </div>
      </div>

      <!-- NOTIFICATIONS -->
      <div class="relative cursor-pointer" @click="toggleIsNotificationModalVisible">
        <IconBell  />
        <div
          v-if="seenNotificationNum !== 0"
          class="bg-[#E33812] text-white text-base font-helvetica-500 w-6 h-6 rounded-full absolute -top-[0.5rem] -right-[0.8rem] flex items-center justify-center"
        >
          {{ seenNotificationNum }}
        </div>
        <div
          v-if="isNotificationModalVisible"
          class="absolute -bottom-[32px] -left-[7px] border-l-[1.25rem] border-l-transparent border-r-[1.25rem] border-r-transparent border-b-[1.25rem] border-b-black"
        ></div>
      </div>

      <!-- NOTIFICATION MODAL -->
      <div
        ref="notificationModalRef"
        v-if="isNotificationModalVisible"
        class="min-w-[26.75rem] px-8 py-6 bg-black absolute top-[5.5rem] right-0 rounded-xl max-h-[30rem] overflow-y-scroll"
      >
        <div class="w-full flex items-center justify-between mb-6">
          <h3 class="font-helvetica-500 text-xl text-white">
            {{ $t("general.text_notifications") }}
          </h3>
          <!-- clear the numeber of notifications on click -->
          <h4
            class="font-helvetica-400 text-sm text-white underline cursor-pointer"
            @click="mskeAllNotsSeen"
          >
            {{ $t("general.text_mark_all_read") }}
          </h4>
        </div>
        <div class="flex flex-col gap-2">
          <!-- SINGLE NOTIFICATION -->
          <HeaderAuthSingleNotificationComponent
            v-for="(notification, index) in notifications"
            :key="index"
            :notification="notification"
            @notificationClicked="handleNotificationClick"
            @viewQuote="handleViewQuote"
          />
        </div>
      </div>
      <!-- LANG SWITCHER AND LOGOUT BTN FOR DESKTOP -->

      <HeaderAuthLangAndLogout visibility="hidden xl:block" />
    </div>
  </div>

</template>
