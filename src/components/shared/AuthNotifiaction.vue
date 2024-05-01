<script setup lang="ts">
import type { NotificationType } from "@/types/types";
import IconEmailSent from "@/components/icons/IconEmailSent.vue";
import IconEmailVerified from "@/components/icons/IconEmailVerified.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";

const props = defineProps<NotificationType>();
</script>

<template>
  <div
    class="flex flex-col items-center px-10 py-20 bg-gradient-to-r shadow-sm rounded-[10px] from-zinc-800 to-zinc-700 xl:bg-transparent xl:px-0 xl:py-0"
  >
    <IconEmailSent v-if="props.icon === 'IconEmailSent'" />
    <IconEmailVerified v-if="props.icon === 'IconEmailVerified'" />
    <h1 class="mb-8 font-helvetica-geo-500 text-white text-[2rem] leading-[2.25rem]">{{ $t(props.header_key) }}</h1>
    <p class="mb-10 font-helvetica-400 text-base text-white">{{ $t(props.paragraph_key) }}</p>
    <ButtonFilled :link="props.link" />
  </div>
  
</template>
