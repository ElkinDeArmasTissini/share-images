<template>
  <div class="body">
    <div class="login-page">
      <div class="form">
        <img  
          src="https://tissini.com/blog/wp-content/uploads/2020/10/logo-tissini.png"
        />

        <a-form
          ref="formRef"
          :rules="rules"
          :model="credentials"
          class="login-form mt-3"
        >
          <a-form-item ref="email" name="email">
            <a-input
              class="input"
              v-model:value="credentials.email"
              placeholder="Correo"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item ref="password" name="password">
            <a-input-password
              class="input"
              v-model:value="credentials.password"
              placeholder="Contraseña"
              autocomplete="off"
            />
          </a-form-item>
          <a-button  v-if="sending" class="button" @click="onSubmit">Iniciar sesión</a-button>
          <a-spin v-else tip="Loading..."> </a-spin>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { credentials,sending } from "../../composables/auth/useLogin";
import UseValidationForm from "../../composables/auth/useValidationForm";
export default defineComponent({
  name: "Login",
  setup() {
    const { formRef, onSubmit, rules } = UseValidationForm();

    return {
      credentials,
      formRef,
      onSubmit,
      rules,
      sending,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 100%;
  padding: 8% ;
  height: 100%;
  margin: auto;
}
.form {
  border-radius: 15px;
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 500px;
  margin: 0 auto 100px;
  padding: 45px;
  padding-top: 25px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
@media screen and (max-width: 400px) {
.input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  width: 300px;
  border: 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px;
  border: solid 1px #c0c0c0;
}
}

@media screen and (max-width: 1400px) {
  .input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    width: 400px;
    border: 0;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 10px;
    border: solid 1px #c0c0c0;
  }
}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
  .input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    width: 200px;
    border: 0;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 10px;
    border: solid 1px #c0c0c0;
  }
}

.button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #0c0c0c;
  width: 100%;
  height: 50px;
  border: 0;
  padding: 5px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 10px;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #444647;
}

.body {
  min-height: 100vh;
  background-color: rgb(134, 94, 243);
}
img {
  width: 60%;
}
</style>
