<script setup lang="ts">
import IconHeartOutline from "@/components/icons/IconHeartOutline.vue";
import IconCommentRectangular from "@/components/icons/IconCommentRectangular.vue";
import NewsFeedQuoteComment from "@/components/news-feed/NewsFeedQuoteComment.vue";

const props = defineProps<{
  author_avatar?: string;
  user_avatar?: string;
  author_name: string;
  quote_text: string;
  quote_image?: string;
  quote_year: string;
  quote_director: string;
  comment_number: number;
  react_number: number;
  comments: Array<{
    comment_author_name: string;
    comment_author_image?: string;
    comment_text: string;
  }>;
}>();

/**
 * 1. add functionality to increase quote reactions by one on heart click
 * 2. load more comments on comment icon click
 * 3. add comment on textarea input enter click
 */
</script>

<template>
  <div class="w-full xl:w-[58rem] xl:p-6 px-9 py-7 bg-[#12101A] rounded-xl">
    <!--    QUOTE AUTHOR -->
    <div class="flex gap-3 items-center w-fit">
      <img
        :src="props.author_avatar"
        alt="quote author image"
        class="w-10 xl:w-14 rounded-full"
      />
      <p class="font-helvetica-400 text-base text-white">
        {{ props.author_name }}
      </p>
    </div>
    <!--    QUOTE TEXT -->
    <div class="mt-4 mb-4 xl:mb-6">
      <q class="font-helvetica-400 text-white text-xl">{{
        props.quote_text
      }}</q>
      <span class="font-helvetica-400 text-white text-xl"
        >{{ $t("general.text_movie") }} -
        <span class="font-helvetica-500 text-[#DDCCAA]"
          >{{ props.quote_director }}.</span
        >
        ({{ props.quote_year }})</span
      >
    </div>
    <!-- QUOTE IMAGE -->
    <div class="mb-5">
      <img
        :src="props.quote_image"
        alt="image from the movie of the quote"
        class="h-[12.5rem] xl:h-[31.25rem] rounded-[0.625rem] object-cover"
      />
    </div>
    <!-- QUOTE REACT/COMMENTS -->
    <div class="flex gap-4">
      <div class="flex gap-2 items-center">
        <span class="font-helvetica-400 text-xl text-white">{{
          props.comment_number
        }}</span>
        <IconCommentRectangular />
      </div>
      <div class="flex gap-2 items-center">
        <span class="font-helvetica-400 text-xl text-white">{{
          props.react_number
        }}</span>
        <IconHeartOutline />
      </div>
    </div>
    <!-- DIVIDER -->
    <div class="h-[0.0625rem] w-full bg-white my-4"></div>
    <!-- COMMENTS LIST -->
    <div v-for="(comment, index) in props.comments" :key="index">
      <NewsFeedQuoteComment
        :name="comment.comment_author_name"
        :image="comment.comment_author_image"
        :comment="comment.comment_text"
      />
    </div>
    <!-- WRITE COMMENT -->
    <div class="flex gap-3 items-center w-full">
      <img
        :src="props.author_avatar"
        alt="quote author image"
        class="w-10 xl:w-14 rounded-full shrink-0"
      />
      <textarea
        name="comment"
        placeholder="write a comment"
        class="bg-[#24222F] rounded-[0.625rem] py-2 px-4 font-helvetica-400 text-base text-white focus:outline-none w-full h-[3.25rem]"
      ></textarea>
    </div>
  </div>
</template>
