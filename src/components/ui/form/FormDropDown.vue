<script setup lang="ts">
import IconCross from "@/components/icons/IconCross.vue";
import type { OnClickOutsideHandler } from "@vueuse/core";
import { ref } from "vue";

const props = defineProps<{
  options: { title: string; id: string }[];
  label_key: string;
}>();

const chosenValues = ref<{ title: string; id: string }[]>([]);

const emit = defineEmits<{
  (e: "send-chosen-values", values: string[]): void;
}>();
const removeChosenItem = (e: Event) => {
  const target = e.target as HTMLElement;
  chosenValues.value = chosenValues.value.filter((obj) => {
    return obj.id !== target.dataset["id"];
  });
  let genre_ids = chosenValues.value.map((genre) => genre.id);
  emit("send-chosen-values", genre_ids);
};

const updateChosenList = (e: Event) => {
  dropdown.value = false;
  const target = e.target as HTMLElement;
  console.log(target.innerText, target.dataset["id"]);
  let includes = chosenValues.value?.find(
    (val) => val.id === target.dataset["id"],
  );
  if (!includes && target.dataset["id"]) {
    chosenValues.value?.push({
      title: target.innerHTML,
      id: target.dataset["id"],
    });
    let genre_ids = chosenValues.value.map((genre) => genre.id);
    emit("send-chosen-values", genre_ids);
  } else {
    return;
  }
};

const dropdown = ref(false);
const dropdownHandler: OnClickOutsideHandler = (event) => {
  console.log(event);
  dropdown.value = false;
};
</script>
<template>
  <div
    class="w-full border border-white py-2 px-3"
    @click.stop="dropdown = !dropdown"
  >
    <p
      class="font-helvetica-400 text-xl text-white"
      v-if="chosenValues && chosenValues.length === 0"
    >
      {{ $t(props.label_key) }}
    </p>
    <div v-if="chosenValues" class="f w-full flex flex-wrap gap-1 items-center">
      <div
        v-for="(genre, index) in chosenValues"
        :key="index"
        class="flex w-fit items-center gap-3 px-3 py-[0.125rem] bg-[#6C757D]"
        :data-id="genre.id"
        @click.stop="removeChosenItem"
      >
        <p class="font-helvetica-400 text-white text-sm" :data-id="genre.id">
          {{ genre.title }}
        </p>
        <IconCross color="#ffffff" size="6" :data-id="genre.id" />
      </div>
    </div>
  </div>
  <div
    v-if="dropdown"
    v-on-click-outside.bubble="dropdownHandler"
    class="w-full bg-[#11101A] p-6 rounded-[0.25rem]"
  >
    <p
      v-for="(option, index) in props.options"
      :key="index"
      class="font-helvetica-400 text-white text-xl hover:text-2xl"
      @click="updateChosenList"
      :data-id="option.id"
    >
      {{ option.title }}
    </p>
  </div>
</template>
