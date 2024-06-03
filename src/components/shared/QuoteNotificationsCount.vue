<script setup lang="ts">
import IconHeartOutline from "@/components/icons/IconHeartOutline.vue";
import IconCommentRectangular from "@/components/icons/IconCommentRectangular.vue";
const props = defineProps<{
  comment_count: string | number;
  react_count: string | number;
}>();
</script>

<template>
  <div class="flex gap-4">
    <div class="flex gap-2 items-center">
      <span class="font-helvetica-400 text-xl text-white">{{
        props.comment_count
      }}</span>
      <IconCommentRectangular />
    </div>
    <div class="flex gap-2 items-center">
      <span class="font-helvetica-400 text-xl text-white">{{
        props.react_count
      }}</span>
      <IconHeartOutline />
    </div>
  </div>
</template>
