<script setup lang="ts">
import HeaderAuth from "@/components/shared/HeaderAuth.vue";
import ProfileMobile from "@/components/profile/ProfileMobile.vue";
import ProfileDesktop from "@/components/profile/ProfileDesktop.vue";
</script>

<template>
  <HeaderAuth />
  <!-- MOBILE -->
  <ProfileMobile  />
  <ProfileDesktop />
</template>
