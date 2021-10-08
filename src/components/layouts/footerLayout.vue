<template>
  <a-layout-footer style="text-align: center">
    <a href="https://tissini.com" target="blank">TISSINI ©2021</a>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "footerLayout",
});
</script>

<style scoped>
a {
  color: var(--color-purple);
}
</style>
