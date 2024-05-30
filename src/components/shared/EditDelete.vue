<script setup lang="ts">
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEditPencil from '@/components/icons/IconEditPencil.vue';

const props = defineProps<{
    edit: CallableFunction,
    delete: CallableFunction,
    location: string,
}>()

</script>

<template>
    <div class="absolute bg-[#24222F] rounded-[0.25rem] p-3 flex gap-3 items-center" :class="props.location">
        <button class="bg-transparent border-none" @click="props.edit">
            <IconEditPencil />
        </button>
        <div class="w-[0.0625rem] h-3 bg-white"></div>
        <button class="bg-transparent border-none" @click="props.delete">
            <IconTrash />
        </button>
    </div>
</template>