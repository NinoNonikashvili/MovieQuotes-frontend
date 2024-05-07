<script setup lang="ts">
import type { NotificationType } from "@/types/types";
import IconEmailSent from "@/components/icons/IconEmailSent.vue";
import IconEmailVerified from "@/components/icons/IconEmailVerified.vue";
import IconLinkExpired from "@/components/icons/IconLinkExpired.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";

const props = defineProps<NotificationType>();
</script>

<template>
  <div
    class="flex flex-col max-w-lg items-center px-10 py-20 bg-gradient-to-r shadow-sm rounded-[10px] from-zinc-800 to-zinc-700 xl:bg-transparent"
  >
    <IconEmailSent v-if="props.icon === 'IconEmailSent'" />
    <IconLinkExpired v-if="props.icon === 'IconLinkExpired'" />
    <IconEmailVerified v-if="props.icon === 'IconEmailVerified'" />

    <h1
      class="mb-8 font-helvetica-geo-500 text-white text-[2rem] leading-[2.25rem]"
    >
      {{ $t(props.header_key) }}
    </h1>
    <p class="mb-10 font-helvetica-400 text-base text-white text-center">
      {{ $t(props.paragraph_key) }}
    </p>
    <ButtonFilled
      :link="props.link"
      :text_key="props.link_text_key"
      :redirect="props.redirect"
    />
  </div>
</template>
