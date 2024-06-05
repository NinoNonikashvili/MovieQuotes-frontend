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

const props = defineProps<{
  closeModal: CallableFunction;
  quote_id: string;
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
</script>

<template>
  <LayoutCrudForm
    :closeModal="props.closeModal"
    header_key="quote.text_view_quote"
    :hideOnMobile="true"
  >
    <EditDelete
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
        v-if="auth_user_data?.id"
        :comment_count="quote.comment_number"
        :react_count="quote.react_number"
        :quote_id="quote.quote_id"
        :has_user_loved="quote.has_user_loved"
        :user_id="auth_user_data.id"
      />
      <!-- DIVIDER -->
      <div class="h-[0.0625rem] w-full bg-[#242e36] my-4"></div>
      <!-- COMMENTS LIST -->
      <div v-for="(comment, index) in quote.comments" :key="index">
        <NewsFeedQuoteComment
          :name="comment.comment_author_name"
          :image="comment.comment_author_image"
          :comment="comment.comment_text"
        />
      </div>
      <!-- WRITE COMMENT -->
      <div class="flex gap-3 items-center w-full">
        <img
          v-if="auth_user_data"
          :src="auth_user_data.image"
          alt="quote author image"
          class="w-10 xl:w-14 rounded-full shrink-0"
        />
        <textarea
          name="comment"
          :placeholder="t('general.text_write_comment')"
          class="bg-[#24222F] rounded-[0.625rem] py-2 px-4 font-helvetica-400 text-base text-white focus:outline-none w-full h-[3.25rem]"
        ></textarea>
      </div>
    </div>
  </LayoutCrudForm>
</template>
