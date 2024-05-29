<script setup lang="ts">
import IconBurger from "@/components/icons/IconBurger.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconBell from "@/components/icons/IconBell.vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconComment from "@/components/icons/IconComment.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import i18n from "@/plugins/i18n";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import type { CompoundSearchResults } from "@/types/types";
import { loadMoviesAndQuotes } from "@/services/axios/search-services";
import HeaderAuthNavigation from "@/components/shared/HeaderAuthNavigation.vue";
import HeaderAuthLangAndLogout from "@/components/shared/HeaderAuthLangAndLogout.vue";
import { storeToRefs } from "pinia";

const { locale } = i18n.global;
const route = useRoute();
const user = useUserStore();
const { auth_user_data } = storeToRefs(user);

// const setLangInUrl = () => {
//   if (locale.value === "ge") {
//     setLocale("ka");
//   } else {
//     setLocale(locale.value);
//   }

//   if (route.name) {
//     router.push({ name: route.name, params: { lang: locale.value } });
//   }
// };

// const { logoutFun } = useLogout();

const isBurgerMenuVisible = ref<boolean>(false);
const isSearchVisible = ref<boolean>(false);
const isNotificationModalVisible = ref<boolean>(false);
const tempIsNotificationModalVisible = ref<boolean>(false);
const results = ref<CompoundSearchResults | null>(null);

const burgerRef = ref(null);
const notificationModalRef = ref(null);

onClickOutside(burgerRef, () => {
  isBurgerMenuVisible.value = false;
});
onClickOutside(notificationModalRef, () => {
  isNotificationModalVisible.value = false;
  console.log(isNotificationModalVisible.value);
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

// debounce logic

const debounce = (cb: CallableFunction) => {
  let timeout: number;
  return (text: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(text);
    }, 1000);
  };
};
const updateDebounce = debounce(async (searchKey: string) => {
  console.log(searchKey);
  //send request
  // try{
  //   const response = await loadMoviesAndQuotes(searchKey);
  //   results.value = response.data
  // }catch(err) {
  //   console.log(err)
  // }
});
const callUpdateDebounce = (e: Event) => {
  const el = e.target as HTMLInputElement;
  updateDebounce(el.value);
};

//add notification modal
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
            @input="callUpdateDebounce"
            type="text"
            :placeholder="$t('general.text_search')"
            class="focus:outline-none bg-transparent font-helvetica-400 text-base text-white placeholder:text-white"
          />
        </div>
        <div>
          <div v-if="results"></div>
          <div v-if="!results" class="w-full px-[4.625rem] py-6">
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
      <div class="relative">
        <IconBell @click="toggleIsNotificationModalVisible" />
        <div
          class="bg-[#E31221] w-6 h-6 rounded-full absolute -top-[0.5rem] -right-[0.8rem] flex items-center justify-center"
        >
          <!-- replace with actual notificaiton -->
          5
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
        class="min-w-[26.75rem] px-8 py-6 bg-black absolute top-[5.5rem] right-0 rounded-xl"
      >
        <div class="w-full flex items-center justify-between mb-6">
          <h3 class="font-helvetica-500 text-xl text-white">
            {{ $t("general.text_notifications") }}
          </h3>
          <!-- clear the numeber of notifications on click -->
          <h4 class="font-helvetica-400 text-sm text-white underline">
            {{ $t("general.text_mark_all_read") }}
          </h4>
        </div>
        <div class="flex flex-col gap-2">
          <!-- SINGLE NOTIFICATION -->
          <div class="border border-[#6C757D] rounded-[0.25rem] p-4 flex gap-3">
            <div class="flex flex-col">
              <img
                src=""
                alt="user avatar"
                class="rounded-full w-[3.75rem] h-[3.75rem]"
              />
              <span class="font-helvetica-400 text-base text-[#198754] mt-1">{{
                $t("general.text_new")
              }}</span>
            </div>
            <div>
              <h3 class="font-helvetica-400 text-xl text-white">
                Natia Veshaguri
              </h3>
              <div class="flex items-center gap-2 mb-2">
                <IconHeart />
                <p class="font-helvetica-400 text-base text-[#CED4DA]">
                  {{ $t("general.quote_reaction_message") }}
                </p>
              </div>
              <p class="font-helvetica-400 text-base text-[#D9D9D9]">
                {{ "10 " + $t("general.time_elapsed") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- LANG SWITCHER AND LOGOUT BTN FOR DESKTOP -->

      <HeaderAuthLangAndLogout visibility="hidden xl:block" />
    </div>
  </div>
</template>
