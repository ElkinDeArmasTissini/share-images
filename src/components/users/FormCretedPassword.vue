<template>
  <a-form class="form">
    <div>
      <a-row>
        <a-col :span="24">
            <a-input-password
              class="input"
              v-model:value="password.oldPassword"
              placeholder="Contraseña actual"
            />
        </a-col>
      </a-row>

      <a-row class="mt-2">
        <a-col :span="24"  >
            <a-input-password
              class="input"
              v-model:value="password.newPassword"
              placeholder="Contraseña nueva"
            />

        </a-col>
      </a-row>
    </div>

    <a-row>
      <a-col :span="24">
        <a-button
          v-if="sending"
          :disabled="validationFields"
          @click="onSubmit(idUser)"
          class="createButton mt-2"
          type="primary"
          >Cambiar Contraseña</a-button
        >
        <a-spin v-else class="mt-4" tip="Loading..."> </a-spin>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import useUsers, { password, sending } from "../../composables/users/useUsers";
import messageNotification from "../../helpers/notification.helper";
export default defineComponent({
  props: {
    idUser: Number,
    option: String,
  },
  name: "FormCretedPassword",

  setup(props) {
    const { changePassword } = useUsers();
    const option = ref<String | undefined>(props.option);
    const validationFields = ref<Boolean>(true);

    watchEffect(() => {
      if (password.oldPassword == "" || password.newPassword == "") {
        validationFields.value = true;
      } else {
        validationFields.value = false;
      }
    });

    const onSubmit = (id:Number | undefined) => {
      if(password.oldPassword == "" || password.newPassword == ""){
        messageNotification(0,"Todos los campos son obligatorios")
        return;
      }
      changePassword(Number(id))
    }


    return {
      password,
      onSubmit,
      option,
      validationFields,
      sending,
    };
  },
});
</script>

<style scoped>

@import url('/src/assets/css/theme1.css');
.center {
  text-align: center;
}
.input {
  border-radius: 10px;
  height: 40px;

  margin: 0px auto;
  width: 70%;
}


.form {
  text-align: center;
}

</style>
