<script setup lang="ts">
import LayoutUsersPages from "@/components/layouts/LayoutUserPages.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { useUserStore } from "@/stores/user";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import ButtonFilled from "../ui/buttons/ButtonFilled.vue";
import MoviesListComponent from "@/components/movies/MoviesListComponent.vue";

const user = useUserStore();
const { auth_user_data } = storeToRefs(user);
const movieStore = useMoviesStore();
const { movies } = storeToRefs(movieStore);
console.log(movies.value);
</script>
<template>
  
  <div class="w-full px-10 py-4 xl:px-16 xl:pt-8 pb-[15rem] flex bg-[#181724]">
    <LayoutUsersPages
      class="hidden xl:flex"
      :name="auth_user_data?.name"
      :image="auth_user_data?.image"
    />

    <section class="w-full">
      <header class="flex items-center justify-between w-full">
        <div class="flex gap-2 flex-col xl:flex-row w-fit">
          <h1 class="font-helvetica-500 text-2xl text-white">
            {{ $t("movies.page_header") }}
            
          </h1>
          <p class="font-helvetica-500 text-2xl text-white">
            {{ $t("movies.text_total") }}
            ({{ movies?.length }})
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex items-center gap-3">
            <div
              class="items-center gap-2 py-3 pl-0 pr-4 hidden xl:flex border-b border-transparent w-[14rem] has-[:focus]:w-[18rem] has-[:focus]:border-b-white"
            >
              <IconSearch class="shrink-0" />

              <input
                :placeholder="$t('general.text_search_by')"
                class="font-helvetica-400 text-xl text-[#CED4DA] bg-transparent focus:outline-none w-full"
              />
            </div>
          </div>
          <ButtonFilled
            text_key="movies.text_add_movie"
            icon="IconPlusBoardered"
          />
        </div>
      </header>
      <div class="mt-8 flex flex-wrap gap-12" v-if="movies">
        <MoviesListComponent
          v-for="(movie, index) in movies"
          :id="movie.id"
          :key="index"
          :title="movie.title"
          :image="movie.image"
          :year="movie.year"
          :quotes_num="movie.quote_num"
        />
      </div>
    </section>
  </div>
</template>
