<script setup lang="ts">
import type { QuoteNotifications } from "@/types/types";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconHeartOutline from "@/components/icons/IconHeartOutline.vue";
import IconComment from "@/components/icons/IconComment.vue";
import { ref } from "vue";
import { useTimeElapsed } from "@/composables/useTimeElapsed";

const props = defineProps<{
  notification: QuoteNotifications;
}>();

const localSeen = ref<boolean>(props.notification.seen);
const { calculateInterval } = useTimeElapsed(props.notification.create_at);

const emit = defineEmits<{
  (e: "notificationClicked", not_id: number): void;
  (e: "viewQuote", quote_id: number): void;
}>();

const handleNotClicked = (e: Event) => {
  localSeen.value = true;
  const target = e.currentTarget as HTMLElement;
  if (target.dataset.notificaitionId) {
    emit("notificationClicked", Number(target.dataset.notificaitionId));
  }
};
const emitViewQuote = (e: Event) => {
  const target = e.currentTarget as HTMLElement;
  if (target.dataset.quoteId) {
    emit("viewQuote", Number(target.dataset.quoteId));
  }
};
</script>
<template>
  <div @click="emitViewQuote" :data-quote-id="props.notification.quote_id">
    <div
      class="border border-[#6C757D] rounded-[0.25rem] p-4 flex gap-3 xl:w-[60rem]"
      :class="{ 'pointer-events-none': localSeen }"
      @click="handleNotClicked"
      :data-notificaition-id="props.notification.notification_id"
    >
      <div class="flex flex-col">
        <img
          :src="props.notification.notification_author_image"
          alt="user avatar"
          class="rounded-full w-[3.75rem] h-[3.75rem]"
          :class="{ 'border-2 border-[#198754]': !localSeen }"
        />
        <span
          class="font-helvetica-400 text-base text-[#198754] mt-1 ml-3 xl:hidden"
          v-if="!localSeen"
          >{{ $t("general.text_new") }}</span
        >
      </div>
      <div class="xl:flex xl:items-center xl:justify-between xl:w-full">
        <div>
          <h3 class="font-helvetica-400 text-xl text-white">
            {{ props.notification.notification_author_name }}
          </h3>
          <div
            class="flex items-center gap-2 mb-2"
            v-if="props.notification.action === 'react'"
          >
            <IconHeart />
            <p class="font-helvetica-400 text-base text-[#CED4DA]">
              {{ $t("general.quote_reaction_message") }}
            </p>
          </div>
          <div
            class="flex items-center gap-2 mb-2"
            v-else-if="props.notification.action === 'unreact'"
          >
            <IconHeartOutline />
            <p class="font-helvetica-400 text-base text-[#CED4DA]">
              {{ $t("general.quote_unreaction_message") }}
            </p>
          </div>
          <div class="flex items-center gap-2 mb-2" v-else>
            <IconComment />
            <p class="font-helvetica-400 text-base text-[#CED4DA]">
              {{ $t("general.quote_comment_message") }}
            </p>
          </div>
          <p class="font-helvetica-400 text-base text-[#D9D9D9] xl:hidden">
            {{ calculateInterval() }}
          </p>
        </div>
        <div class="hidden xl:flex xl:flex-col xl:gap-2">
          <p class="font-helvetica-400 text-base text-[#D9D9D9]">
            {{ calculateInterval() }}
          </p>
          <span
            class="font-helvetica-400 text-base text-[#198754] mt-1"
            v-if="!localSeen"
            >{{ $t("general.text_new") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
