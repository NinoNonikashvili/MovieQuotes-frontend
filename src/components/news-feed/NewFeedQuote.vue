<script setup lang="ts">
import NewsFeedQuoteComment from "@/components/news-feed/NewsFeedQuoteComment.vue";
import type { NewsFeedQuote } from "@/types/types";
import QuoteNotificationsCount from "../shared/QuoteNotificationsCount.vue";
import { useAddQuoteNotification } from "@/composables/useAddQuoteNotification";
import i18n from "@/plugins/i18n";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const props = defineProps<{
  quote: NewsFeedQuote;
  last: boolean;
}>();

const userStore = useUserStore();
const { auth_user_data } = storeToRefs(userStore);
const { t } = i18n.global;
const local_comments = ref<
  | {
      comment_author_name: string;
      comment_author_image?: string;
      comment_text: string;
    }[]
  | null
>(props.quote.comments);

const local_comments_number = ref<number>(props.quote.comment_number);


watch(
  () => props.quote,
  () => {
    local_comments.value = props.quote.comments;
    local_comments_number.value = props.quote.comment_number;
  },
);

const handleComment = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.value && auth_user_data.value?.id) {
    try {
      await useAddQuoteNotification({
        quote_id: props.quote.quote_id,
        user_id: String(auth_user_data.value.id),
        type: "comment",
        comment: target.value,
        seen: false,
      });
    } catch (er) {
      return;
    }
    local_comments.value?.push({
      comment_author_name: auth_user_data.value.name,
      comment_author_image: auth_user_data.value.image,
      comment_text: target.value,
    });
    local_comments_number.value++;
    target.value = "";
  }
};
</script>

<template>
  <div
    class="w-full xl:w-[58rem] xl:p-6 px-9 py-7 bg-[#12101A] rounded-xl"
    :class="{
      'mb-0': props.last,
      'mb-8': !props.last,
    }"
  >
    <!--    QUOTE AUTHOR -->
    <div class="flex gap-3 items-center w-fit">
      <img
        :src="props.quote.author_avatar"
        alt="quote author image"
        class="w-10 xl:w-14 rounded-full"
      />
      <p class="font-helvetica-400 text-base text-white">
        {{ props.quote.author_name }}
      </p>
    </div>
    <!--    QUOTE TEXT -->
    <div class="mt-4 mb-4 xl:mb-6">
      <q class="font-helvetica-400 text-white text-xl">{{
        props.quote.quote_text
      }}</q>
      <span class="font-helvetica-400 text-white text-xl"
        >{{ $t("general.text_movie") }} -
        <span class="font-helvetica-500 text-[#DDCCAA]"
          >{{ props.quote.quote_director }}.</span
        >
        ({{ props.quote.quote_year }})</span
      >
    </div>
    <!-- QUOTE IMAGE -->
    <div class="mb-5">
      <img
        :src="props.quote.quote_image"
        alt="image from the movie of the quote"
        class="h-[12.5rem] xl:h-[31.25rem] rounded-[0.625rem] object-cover"
      />
    </div>
    <!-- QUOTE REACT/COMMENTS -->

    <QuoteNotificationsCount
      v-if="auth_user_data?.id"
      :comment_count="local_comments_number"
      :react_count="props.quote.react_number"
      :has_user_loved="props.quote.has_user_loved"
      :quote_id="props.quote.quote_id"
      :user_id="auth_user_data.id"
    />
    <!-- DIVIDER -->
    <div class="h-[0.0625rem] w-full bg-white my-4"></div>
    <!-- COMMENTS LIST -->

    <div v-for="(comment, index) in local_comments" :key="index">
      <NewsFeedQuoteComment
        :name="comment.comment_author_name"
        :image="comment.comment_author_image"
        :comment="comment.comment_text"
      />
    </div>
    <!-- WRITE COMMENT -->
    <div class="flex gap-3 items-center w-full">
      <img
        :src="props.quote.author_avatar"
        alt="quote author image"
        class="w-10 xl:w-14 rounded-full shrink-0"
      />
      <textarea
        name="comment"
        @keydown.enter.prevent="handleComment"
        :placeholder="t('general.text_write_comment')"
        class="bg-[#24222F] rounded-[0.625rem] py-2 px-4 font-helvetica-400 text-base text-white focus:outline-none w-full h-[3.25rem]"
      ></textarea>
    </div>
  </div>
</template>
