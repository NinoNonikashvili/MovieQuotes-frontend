<script setup lang="ts">
const props = defineProps<{
  name: string;
  placeholder_key: string;
  lang: string;
}>();

const emit = defineEmits<{
  (e:'send-text', text:string, element:string):void
}>()

const sendText = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit("send-text", target.value, props.name)
}

</script>

<template>
  <div>
    <div class="relative w-full">
      <textarea
        :name="$t(props.name)"
        :placeholder="$t(props.placeholder_key)"
        @input="sendText"
        class="w-full py-2 px-3 border border-white pr-2 bg-transparent focus:outline-none placeholder:text-[#6C757D] placeholder:italic text-white font-helvetica-400 text-2xl"
      ></textarea>
      <span
        class="absolute top-2 right-2 text-white font-helvetica-400 text-2xl"
      >
        {{ lang }}
      </span>
    </div>

  </div>
</template>
