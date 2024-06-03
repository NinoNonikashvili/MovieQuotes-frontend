<script setup lang="ts">
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEditPencil from "@/components/icons/IconEditPencil.vue";

const props = withDefaults(defineProps<{
  location: string;
  bg?: string;
  hideEdit?:boolean
}>(), {
  bg: '#24222F'
})

const emit = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();
</script>

<template>
  <div
    class="absolute  rounded-[0.25rem] p-3 flex gap-3 items-center"
    :class="props.location + props.bg"
  >
    <button class="bg-transparent border-none" @click="emit('edit')" v-if="!props.hideEdit">
      <IconEditPencil />
    </button>
    <div v-if="!hideEdit" class="w-[0.0625rem] h-3 bg-white"></div>
    <button class="bg-transparent border-none" @click="emit('delete')">
      <IconTrash />
    </button>
  </div>
</template>
