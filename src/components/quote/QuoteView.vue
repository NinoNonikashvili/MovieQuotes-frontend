<script setup lang="ts">
import LayoutCrudForm from "@/components/layouts/LayoutCrudForm.vue";
import EditDelete from "../shared/EditDelete.vue";
import { onMounted, ref } from "vue";
import { getSingleQuote } from "@/services/axios/quote-services";
import QuoteNotificationsCount from "../shared/QuoteNotificationsCount.vue";
import NewsFeedQuoteComment from "@/components/news-feed/NewsFeedQuoteComment.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import i18n from "@/plugins/i18n";
import { useAddQuoteNotification } from "@/composables/useAddQuoteNotification";

const props = defineProps<{
  closeModal: CallableFunction;
  quote_id: string;
  doNotShowCrud?: boolean;
}>();
const quote = ref<{
  quote_id: string;
  quote_text: { en: string; ge: string };
  quote_image: string;
  comment_number: number;
  react_number: number;
  comments: {
    comment_author_name: string;
    comment_author_image: string;
    comment_text: string;
  }[];
  has_user_loved: boolean;
}>();
const { t } = i18n.global;

onMounted(async () => {
  try {
    let response = await getSingleQuote(props.quote_id);
    quote.value = response.data.data;
    if (quote.value) {
      local_comments.value = quote.value.comments;
      local_comments_number.value = quote.value.comment_number;
    }
  } catch (err) {
    return;
  }
});

const userStore = useUserStore();
const { auth_user_data } = storeToRefs(userStore);

const emit = defineEmits<{
  (e: "triggerForm", quote_id: string, action: string): void;
}>();

const editQuote = () => {
  emit("triggerForm", props.quote_id, "edit");
};
const deleteQuote = () => {
  emit("triggerForm", props.quote_id, "delete");
};
const local_comments = ref<
  | {
      comment_author_name: string;
      comment_author_image?: string;
      comment_text: string;
    }[]
  | null
>();
const local_comments_number = ref<number>();

const handleComment = async (e: Event) => {
  console.log("handle comment");
  const target = e.target as HTMLInputElement;
  console.log(target.value, auth_user_data.value?.id, props.quote_id);
  if (target.value && auth_user_data.value?.id && props.quote_id) {
    try {
      await useAddQuoteNotification({
        quote_id: props.quote_id,
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
    if (local_comments_number.value) {
      local_comments_number.value++;
    }

    target.value = "";
  }
};
</script>

<template>
  <LayoutCrudForm
      class="z-30"
    :closeModal="props.closeModal"
    header_key="quote.text_view_quote"
    :hideOnMobile="true"
  >
    <EditDelete
      v-if="!props.doNotShowCrud"
      location="top-8 left-8"
      bg="bg-transparent"
      @edit="editQuote"
      @delete="deleteQuote"
    />
    <div v-if="quote">
      <div class="mb-6 w-full">
        <div
          class="relative border border-[#6C757D] rounded-[0.25rem] py-2 px-3 pr-12"
        >
          <q class="italic text-white font-helvetica-400 text-2xl">
            {{ quote.quote_text.en }}
          </q>
          <span
            class="absolute top-2 right-2 text-[#242e36] font-helvetica-400 text-2xl"
          >
            Eng
          </span>
        </div>
      </div>
      <div class="mb-6 w-full">
        <div
          class="relative border border-[#6C757D] rounded-[0.25rem] py-2 px-3 pr-12"
        >
          <q class="italic text-white font-helvetica-400 text-2xl">
            {{ quote.quote_text.ge }}
          </q>
          <span
            class="absolute top-2 right-2 text-[#242e36] font-helvetica-400 text-2xl"
          >
            Geo
          </span>
        </div>
      </div>
      <div class="mb-6 w-full">
        <img
          :src="quote.quote_image"
          alt=""
          class="object-cover w-[22.375rem] h-[18.875rem] xl:w-[56rem] xl:h-[32rem]"
        />
      </div>
      <QuoteNotificationsCount
        v-if="auth_user_data?.id && local_comments_number && props.quote_id"
        :comment_count="local_comments_number"
        :react_count="quote.react_number"
        :quote_id="props.quote_id"
        :has_user_loved="quote.has_user_loved"
        :user_id="auth_user_data.id"
      />
      <!-- DIVIDER -->
      <div class="h-[0.0625rem] w-full bg-[#242e36] my-4"></div>
      <!-- COMMENTS LIST -->
      <div v-for="(comment, index) in local_comments" :key="index">
        <NewsFeedQuoteComment
          :name="comment.comment_author_name"
          :image="comment.comment_author_image"
          :comment="comment.comment_text"
        />
      </div>
      <!-- WRITE COMMENT -->
      <div class="flex gap-3 items-center w-full" v-if="!props.doNotShowCrud">
        <img
          v-if="auth_user_data"
          :src="auth_user_data.image"
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
  </LayoutCrudForm>
</template>
