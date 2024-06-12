<script setup lang="ts">
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import { useLogout } from "@/composables/logout";
import i18n from "@/plugins/i18n";
import { useRoute, useRouter } from "vue-router";
import { setLocale } from "@vee-validate/i18n";

const props = defineProps<{ visibility: string | null }>();
const { locale } = i18n.global;
const route = useRoute();
const router = useRouter();

const setLangInUrl = () => {
  if (locale.value === "ge") {
    setLocale("ka");
  } else {
    setLocale(locale.value);
  }

  if (route.name) {
    router.push({ name: route.name, params: { lang: locale.value } });
  }
};

const { logoutFun } = useLogout();
</script>

<template>
  <div
    class="locale-changer bg-transparent px-4 py-2"
    :class="props?.visibility"
  >
    <select
      v-model="$i18n.locale"
      @change="setLangInUrl"
      class="bg-transparent text-white font-helvetica-400 text-base focus:outline-none"
    >
      <option
        class="bg-[#11101A]"
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
  <div class="w-24" :class="props?.visibility">
    <ButtonOutline @click="logoutFun" text_key="general.text_logout" icon="" />
  </div>
</template>
