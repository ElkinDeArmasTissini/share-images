<template>
  <a-form
    ref="formRef"
    :rules="rules"
    :model="user"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="Nombres" name="firstName">
      <a-input class="input" v-model:value="user.firstName" autocomplete="off" />
    </a-form-item>

    <a-form-item ref="lastName" label="Apellidos" name="lastName">
      <a-input class="input" v-model:value="user.lastName" autocomplete="off" />
    </a-form-item>

    <a-form-item ref="email" label="Correo" name="email">
      <a-input class="input" v-model:value="user.email" autocomplete="off" :disabled="user_"  />
    </a-form-item>

    <a-form-item v-if="user_" label="Estado" name="status">
      <a-select v-model:value="user.status" placeholder="Seleccione una opcion">
        <a-select-option v-if="user.status == 'true'" :value="user.status"
          >Activo</a-select-option
        >
        <a-select-option v-else :value="user.status">No Activo</a-select-option>
        <a-select-option value="true">Activo</a-select-option>
        <a-select-option value="false">No Activo</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Rol" >
      <a-select
        v-model:value="user.rolId"
        placeholder="Seleccione un rol"
        style="width: 100%"
        option-label-prop="label"
      >
        <a-select-option
          v-for="role in roles"
          :value="role.id"
          :label="role.name"
          :key="role.id"
        >
          <a-tag color="var(--color-purple)">{{ role.name }}</a-tag>
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
      <div  v-if="user_" class="center">
        <a-button v-if="sending" class="button-edit" @click="onSubmitUpdate"
          >Actualizar</a-button
        >
        <a-spin v-else  tip="Loading..."> </a-spin>
      </div>
      <div  v-else class="center">
        <a-button  v-if="sending" class="button" type="primary" @click="onSubmit"
          >Crear Usuario</a-button
        >
        <a-spin v-else  tip="Loading..."> </a-spin>
      </div>
    </a-form-item>
  </a-form>

  <modal-confirm-password
  :isModal="modal"
  :onClick="updateUser"
  @closeModalConfirmPassword="closeModalConfirmPassword"
   v-if="modal"
  />

</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useUsers, { user,sending } from "../../composables/users/useUsers";
import { useRoles } from "../../composables/roles/useRoles";
import {Rol} from "../../interfaces/rol.interface"
import UseValidationForm from "../../composables/users/useValidationForm";
import  ModalConfirmPassword from "../ConfirmPassword/ModalConfirmPassword.vue"
import  useConfirmPassword ,{ modal} from "../../composables/ConfirmPassword/useConfirmPassword"
import { User } from "../../interfaces/user.interface";

export default defineComponent({
  components:{
    ModalConfirmPassword
  },
  props: {
    user_: Object as ()=> User,
  },
  setup() {
    const {updateUser} = useUsers()
    const { formRef, onSubmit, rules, onSubmitUpdate } = UseValidationForm();
    const {closeModalConfirmPassword} = useConfirmPassword()
    const { getRolesActives } = useRoles();
    const roles = ref<Rol[]>([]);

    onMounted(async () => {
      const dataRoles = await getRolesActives();
      roles.value = dataRoles.data.roles;
    });
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      roles,
      user,
      formRef,
      onSubmit,
      rules,
      onSubmitUpdate,
      modal,
      closeModalConfirmPassword,
      updateUser,
      sending
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
  resize: none;
}
.button {
  border-radius: 5px;
  width: 100%;
  height: 40px;
  background-color: var(--color-purple);
  border-color: var(--color-purple);
}
.button-edit {
  border-radius: 5px;
  width: 100%;
  height: 40px;
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>
