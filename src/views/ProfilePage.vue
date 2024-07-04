<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import ProfileMobile from "@/components/profile/ProfileMobile.vue";
import ProfileDesktop from "@/components/profile/ProfileDesktop.vue";
</script>

<template>
  <HeaderAuth />
  <ProfileMobile  />
  <div class="hidden xl:flex">
    <ProfileDesktop />
  </div>
  
</template>
