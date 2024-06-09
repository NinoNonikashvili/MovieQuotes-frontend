<script setup lang="ts">
import IconHeartOutline from "@/components/icons/IconHeartOutline.vue";
import IconCommentRectangular from "@/components/icons/IconCommentRectangular.vue";
import { ref, watch } from "vue";
import IconHeart from "../icons/IconHeart.vue";
import { useAddQuoteNotification } from "@/composables/useAddQuoteNotification";
import type { QuoteNotificationAction } from "@/types/types";

const props = defineProps<{
  comment_count: string | number;
  react_count: string | number;
  has_user_loved: boolean;
  quote_id: string;
  user_id: number;
}>();

const is_reacted = ref<boolean>(props.has_user_loved);
const comment_n = ref<string | number>(props.comment_count);
const react_n = ref<string | number>(props.react_count);

watch(
  () => props.comment_count,
  (newVal) => {
    comment_n.value = Number(newVal);
  },
);

const updateReaction = async (type: QuoteNotificationAction) => {
  is_reacted.value = type === "react";
  react_n.value =
    type === "react" ? Number(react_n.value) + 1 : Number(react_n.value) - 1;
  useAddQuoteNotification({
    quote_id: props.quote_id,
    user_id: String(props.user_id),
    type: type,
    comment: null,
    seen: false,
  });
};
</script>

<template>
  <div class="flex gap-4">
    <div class="flex gap-2 items-center">
      <span class="font-helvetica-400 text-xl text-white">{{ comment_n }}</span>
      <IconCommentRectangular />
    </div>
    <div class="flex gap-2 items-center">
      <span class="font-helvetica-400 text-xl text-white">{{ react_n }}</span>
      <IconHeart @click="updateReaction('unreact')" v-if="is_reacted" />
      <IconHeartOutline @click="updateReaction('react')" v-else />
    </div>
  </div>
</template>
