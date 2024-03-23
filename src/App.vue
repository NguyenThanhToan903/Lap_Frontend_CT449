<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <!-- <p>Hello</p> -->
    <AppHeader />
    <div class="container-mt-3">
      <router-view />
    </div>
  </div>
</template>

<style></style>
