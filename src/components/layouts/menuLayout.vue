<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo">
      <img class="logop" src="/src/assets/icons/logo.png" v-if="collapsed" />
      <img src="/src/assets/icons/logo-tissini-blanco.png" v-else />
    </div>
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys">
      <template v-for="item of menuItem" :key="item.key">
        <a-menu-item
          :key="item.key"
          v-if="$auth.hasPermissionTo(item.permission)"
        >
          <component :is="item.component" />
          <span>{{ item.name }}</span>
          <router-link :to="item.route"> </router-link>
        </a-menu-item>
      </template>

      <a-menu-item key="7" @click="changePassword">
        <lock-outlined />
        <span>Cambiar contraseña</span>
      </a-menu-item>
      <a-menu-item key="8" @click="logout">
        <logout-outlined />
        <span>Cerrar sesión</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>

  <modal-component
    :isModal="modalUser"
    :idUser="idUser"
    :option="option"
    @closeModal="closeModal"
    class="mb-3"
    v-if="modalUser"
  />
</template>

<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  BellOutlined,
  AppstoreOutlined,
  LockOutlined,
  IdcardOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted } from "vue";
import { useLogin } from "../../composables/auth/useLogin";
import { useLayout, selectedKeys } from "../../composables/layout/useLayout";
import ModalComponent from "../users/ModalComponent.vue";
import { userId } from "../../helpers/userDataLogin.helper";
import useUsers, { modalUser, option } from "../../composables/users/useUsers";

export default defineComponent({
  name: "menuLayout",
  components: {
    LockOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    BellOutlined,
    AppstoreOutlined,
    IdcardOutlined,
    LogoutOutlined,
    ModalComponent,
  },

  setup() {
    const { logout } = useLogin();
    const { closeModal } = useUsers();
    const { menuItem } = useLayout();
    const collapsed = ref<Boolean>(false);
    const idUser = ref<Number>();

    const changePassword = () => {
      modalUser.value = true;
      option.value = "updatePassword";
      idUser.value = Number(userId);
    };
    return {
      logout,
      collapsed,
      selectedKeys,
      modalUser,
      closeModal,
      changePassword,
      option,
      idUser,
      menuItem,
    };
  },
});
</script>

<style scoped>
@import url("/src/assets/css/theme1.css");
.logo {
  height: 50px;
  margin-bottom: 10px;
  background-color: rgb(4, 65, 247);
  text-align: center;
}
img {
  margin-top: 2px;
  width: 90%;
  height: 90%;
}
.logop {
  margin-top: 6%;
  width: 50%;
  height: 80%;
  margin-right: 9%;
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
