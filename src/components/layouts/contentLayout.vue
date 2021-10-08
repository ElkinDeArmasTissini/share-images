<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0" />
    <div
      :style="{
        padding: '24px',
        background: '#fff',
        minHeight: '360px',
        height: '100%',
      }"
    >
      <router-view />
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "contentLayout",
});
</script>
