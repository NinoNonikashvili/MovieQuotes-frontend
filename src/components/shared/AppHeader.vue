<script setup lang="ts">
import i18n from "@/plugins/i18n";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline.vue";
import ButtonFilled from "@/components/ui/buttons/ButtonFilled.vue";
import { useRoute, useRouter } from "vue-router";
import { setLocale } from "@vee-validate/i18n";

const { locale } = i18n.global;
const route = useRoute();
const router = useRouter();

const setLangInUrl = () => {
  if (locale.value === "ge") {
    setLocale("ka");
  } else{
    setLocale(locale.value)
  }

  if (route.name) {
    router.push({ name: route.name, params: { lang: locale.value } });
  }
};
</script>

<template>
  <div
    class="px-4 py-6 xl:px-[4.5rem] flex justify-between items-center bg-gradient-to-b from-[#11101A] to-[#08080D]"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="text-orange-200 font-helvetica-geo-500 text-base uppercase"
    >
      {{ $t("general.site_name") }}
    </RouterLink>

    <div class="flex gap-2 items-center w-fit">
      <div class="locale-changer bg-transparent">
        <select
          v-model="$i18n.locale"
          @change="setLangInUrl"
          class="bg-transparent text-white focus:outline-none"
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
      <div class="w-[6.5] xl:order-2">
        <ButtonOutline :icon="false" text_key="form.text_login" link="login" />
      </div>
      <div class=" xl:order-1">
        <ButtonFilled text_key="form.text_signup" link="register" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
