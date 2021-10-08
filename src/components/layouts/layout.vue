<template>
  <a-layout style="min-height: 100vh">
    <menu-layout />
    <a-layout>
      <header-layout />
      <content-layout />
      <footer-layout />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import FooterLayout from "./footerLayout.vue";
import HeaderLayout from "./headerLayout.vue";
import ContentLayout from "./contentLayout.vue";
import MenuLayout from "./menuLayout.vue";
import { permissions } from "../../utils/auth.utils";
import { useLayout } from "../../composables/layout/useLayout";

export default defineComponent({
  name: "MainLayout",
  components: {
    MenuLayout,
    FooterLayout,
    HeaderLayout,
    ContentLayout,
  },

  setup() {
    const { getPermissionsUser } = useLayout();
    const setPermissions_ = async () => {
      const responsePermissions = await getPermissionsUser();

      if (responsePermissions.data.message_error) {
        localStorage.clear();
        window.location.reload();
      }

      const dataPermissions =
        responsePermissions.data.permissions[0].permissions;
      const permissions_ = dataPermissions.map((item: any) => {
        return item.name;
      });

      permissions_.forEach((element: String) => {
        permissions.push(element);
      });
    };

    setPermissions_();
  },
});
</script>
<style>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
