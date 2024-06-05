<script setup lang="ts">
import IconHeartOutline from "@/components/icons/IconHeartOutline.vue";
import IconCommentRectangular from "@/components/icons/IconCommentRectangular.vue";
import { ref, watch } from "vue";
import IconHeart from "../icons/IconHeart.vue";
import { removeQuoteHeart } from "@/services/axios/quote-services";
import { useAddQuoteNotification } from "@/composables/useAddQuoteNotification";

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

watch(()=>props.comment_count, (newVal) => {
  comment_n.value = Number(newVal)
})

const removeReaction = async () => {
  is_reacted.value = false;
  react_n.value = Number(react_n.value) - 1;
  try {
    await removeQuoteHeart({
      quote_id: props.quote_id,
      user_id: String(props.user_id),
    });
  } catch (err) {
    return;
  }
};
const addReadction = async () => {
  is_reacted.value = true;
  react_n.value = Number(react_n.value) + 1;
  useAddQuoteNotification({
    quote_id: props.quote_id,
    user_id: String(props.user_id),
    type: "heart",
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
      <IconHeart @click="removeReaction" v-if="is_reacted" />
      <IconHeartOutline @click="addReadction" v-else />
    </div>
  </div>
</template>
