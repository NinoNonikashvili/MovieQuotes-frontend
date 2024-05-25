<script setup lang="ts">
import type {HeaderNavProps} from '@/types/types'
import IconHouse from "@/components/icons/IconHouse.vue";
import IconMovie from "@/components/icons/IconMovie.vue";
const props = defineProps<HeaderNavProps>();

</script>

<template>
  <nav class="flex flex-col gap-10 items-start">
    <li class="list-none">
      <RouterLink
        :to="{ name: 'profile', params: { lang: props.lang } }"
        class="group flex gap-5 items-center"
      >
        <img
          :src="props.image"
          alt="user photo"
          class="w-10 h-10 rounded-full group-[.router-link-active]:border group-[.router-link-active]:border-[#E31221]"
        />
        <div>
          <p class="font-helvetica-400 text-white text-xl leading-[1.875rem]">
            {{ props.name }}
          </p>
          <p class="font-helvetica-400 text-[#CED4DA] text-sm">
            {{ $t("general.text_edit_profile") }}
          </p>
        </div>
      </RouterLink>
    </li>
    <li class="list-none">
      <RouterLink
        :to="{ name: 'news-feed', params: { lang: props.lang } }"
        class="group flex gap-[1.875rem] items-center"
      >
        <div class="relative w-fit">
          <IconHouse color="#ffffff" />
          <IconHouse
            color="#E31221"
            class="absolute top-0 left-0 hidden group-[.router-link-active]:block"
          />
        </div>

        <p class="font-helvetica-400 text-white text-xl leading-[1.875rem]">
          {{ $t("general.text_news_feed") }}
        </p>
      </RouterLink>
    </li>
    <li class="list-none">
      <RouterLink
        :to="{ name: 'movies', params: { lang: props.lang } }"
        class="group flex gap-[1.875rem] items-center"
      >
        <div class="relative w-fit">
          <IconMovie color="#ffffff" />
          <IconMovie
            color="#E31221"
            class="absolute top-0 left-0 hidden group-[.router-link-active]:block"
          />
        </div>

        <p class="font-helvetica-400 text-white text-xl leading-[1.875rem]">
          {{ $t("general.text_list_of_movies") }}
        </p>
      </RouterLink>
    </li>
  </nav>
</template>
