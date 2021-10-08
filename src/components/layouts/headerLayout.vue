<template>
  <a-layout-header class="header">
    <h6 class="user" @click="profile">
      <button class="button-user">
        {{ user }}
      </button>
    </h6>
  </a-layout-header>

  <modal-profile
    :isModal="modalProfile"
    @closeModal="closeModal"
    class="mb-3"
    v-if="modalProfile"
    :user_="userData"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { user, userId } from "../../helpers/userDataLogin.helper";
import ModalProfile from "../users/ModalProfile.vue";
import useUser from "../../composables/users/useUsers";
import { User } from "../../interfaces/user.interface";
export default defineComponent({
  name: "headerLayout",
  components: {
    ModalProfile,
  },
  setup() {
    const modalProfile = ref<boolean>(false);
    const { getProfile } = useUser();
    const userData = ref<User>();

    const profile = () => {
      modalProfile.value = true;
    };

    const closeModal = () => {
      modalProfile.value = false;
    };

    onMounted(async () => {
      const dataUser = await getProfile(userId);
      userData.value = await dataUser.data.user;
    });

    return { user, modalProfile, userData, profile, closeModal };
  },
});
</script>

<style scoped>
@import url("/src/assets/css/theme1.css");
.user {
  text-align: right;
  color: white;
  width: 100%;
}
.button-user {
  background: var(--color-purple);
  border: none;
}
</style>
