<template>
  <div>
    <a-modal
      :visible="isModal"
      :dialog-style="{ top: '50px' }"
      width="30%"
      :maskClosable="false"
      @cancel="closeModalConfirmPassword"
      title="Confirmar contraseña"
      class="text-center"
      :footer="null"
    >
      <a-form>
        <div class="row center">
          <div class="col-md-8 offset-2">
            <a-form-item name="passwordAuth">
              <a-input-password
                class="input"
                placeholder="Confirme su contraseña"
                v-model:value="password.passwordAuth"
              />
            </a-form-item>
          </div>
        </div>

        <div class="center">
          <a-button
            v-if="sending"
            type="primary"
            class="button"
            :disabled="password.passwordAuth == ''"
            @click="confirmPass"
            >Confirmar contraseña</a-button
          >
          <a-spin v-else tip="Loading..."> </a-spin>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  password,
  sending,
} from "../../composables/ConfirmPassword/useConfirmPassword";
import useConfirmPassword from "../../composables/ConfirmPassword/useConfirmPassword";
import messageNotification from "../../helpers/notification.helper";
export default defineComponent({
  name: "ModalConfirmPassword",
  props: {
    isModal: Boolean,
    onClick: Function,
    idUser: Number,
  },
  setup(props, { emit }) {
    const id: Number | undefined = props.idUser;
    const functions: Function | undefined = props.onClick;
    const { ConfirmPassword } = useConfirmPassword();
    const closeModalConfirmPassword = () => {
      emit("closeModalConfirmPassword", false);
    };

    const confirmPass = async () => {
      if (password.passwordAuth != "") {
        const response = await ConfirmPassword();
        if (response) {
          await functions?.(id, password);
          sending.value = true;
          password.passwordAuth = "";
        }
      } else {
        messageNotification(0, "Por favor escriba su contraseña", 2);
      }
    };

    return { closeModalConfirmPassword, password, confirmPass, sending };
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
  height: 40px;
  width: 120%;
}
.button {
  border-radius: 5px;
  width: 50%;
  height: 40px;
  background-color: var(--color-purple);
  border-color: var(--color-purple);
}
</style>
