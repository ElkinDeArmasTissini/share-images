<template>
  <a-modal
    :visible="isModal"
    width="35%"
    :maskClosable="false"
    @cancel="closeModal"
    title="Peril de usuario"
    class="text-center"
    :footer="null"
  >
    <a-row>
      <a-col :span="12" :xs="{ order: 24 }" :sm="{ order: 12 }" :md="{ order: 12 }" :lg="{ order: 12 }">Nombres : </a-col>
      <a-col :span="12" :xs="{ order: 24 }" :sm="{ order: 12 }" :md="{ order: 12 }" :lg="{ order: 12 }">{{user_?.firstName}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="12">Apellidos : </a-col>
      <a-col :span="12">{{user_?.lastName}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="12">Correo : </a-col>
      <a-col :span="12">{{user_?.email}}</a-col>
    </a-row>
        <a-row>
      <a-col :span="12">Rol : </a-col>
      <a-col :span="12">{{user_?.role.name}}</a-col>
    </a-row>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent,ref } from "vue";
import { User } from "../../interfaces/user.interface";

export default defineComponent({
  name: "Profile",
  props: {
    isModal: Boolean,
    user_: Object as () => User,
  },
  setup(props, { emit }) {
    const closeModal = () => emit("closeModal", false);
    let status = ref(props.user_?.status)
    status.value = status.value == 'true'?'Activo':'No Activo'
    return { closeModal,status };
  },
});
</script>
<style scoped>
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
