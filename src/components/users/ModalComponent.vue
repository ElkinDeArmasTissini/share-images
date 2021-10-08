<template>
  <div>
    <a-modal
      :visible="isModal"
       width="35%"
      :maskClosable="false"
      @cancel="closeModal"
      :title="title"
      class="text-center"
      :footer="null"
    >
      <FormCretedPassword
        :idUser="idUser"
        :option="option"
        v-if="option == 'createPassword' || option == 'updatePassword'"
      />
      <FormCreateUser
        :user_="user"
        v-if="option == 'createUser' || option == 'editUser'"
      />

      <Profile
      :user_="user"
      v-if="option == 'profile'"
      />

    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FormCretedPassword from "./FormCretedPassword.vue";
import FormCreateUser from "./FormCreateUser.vue";
import Profile from "./ModalProfile.vue";
import { User } from "../../interfaces/user.interface";
export default defineComponent({
  components: {
    FormCretedPassword,
    FormCreateUser,
    Profile
  },

  props: {
    isModal: Boolean,
    idUser: Number,
    option: String,
    user: Object as () => User,
  },

  setup(props, { emit }) {
    let title = ref("");

    if (props.option == "editUser" || props.option == "createUser") {
      if (props.option == "editUser") {
        title.value = "Editar información de usuario";
      } else {
        title.value = "Crear usuario";
      }
    }

    if (props.option == "createPassword" || props.option == "updatePassword") {
      if (props.option == "createPassword") {
        title.value = "Crear contraseña";
      } else {
        title.value = "Cambiar contraseña";
      }
    }

    if(props.option == "profile"){
      title.value ="Peril"
    }

    const closeModal = () => emit("closeModal", false);

    return { closeModal,title };
  },
});
</script>

<style scoped></style>
