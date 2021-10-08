import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ref, reactive, UnwrapRef } from "vue";
import messageNotification from "../../helpers/notification.helper";
import { User } from "../../interfaces/user.interface";
import { Password } from "../../interfaces/password.interface";
import http from "../../utils/httpHandlers.utils";
import { userId } from "../../helpers/userDataLogin.helper";

/**
 * @description Variable to handle the spinner when saving a user
 */
export let sending = ref<Boolean>(true);

/**
 * @description Object of type User to handle the form when saving or editing a user
 */
export let user: UnwrapRef<User> = reactive({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  status: "",
  rolId: "",
  role: "",
  createdAt: "",
  permission: "",
});

/**
 * @description Object of type User to show the information of a user
 */
export let auxUser = reactive<User>({
  id: "",
  firstName: "",
  lastName: "",
  status: "",
  email: "",
  rolId: "",
  role: "",
  createdAt: "",
});

/**
 * @description Endpoint to users
 * @type {String}
 */
const url: string = `${http.getApi()}/users`;

/**
 * @description Header for the endpoint
 * @type {AxiosRequestConfig}
 */
const header: AxiosRequestConfig = http.getHeader();

/**
 * @description Variable to handle the opening and closing of the modal to save or edit users
 */
export const modalUser = ref<Boolean>(false);

/**
 * @description Variable that receives an option to open the form, save or edit
 * @type {String}
 */
export const option = ref<String>("");

/**
 * @description List where all users obtained from the database will be added
 */
export let users = ref<User[]>([]);

export let password: UnwrapRef<Password> = reactive({
  oldPassword: "",
  newPassword: "",
  passwordAuth: "",
  idUserAuth: "",
  permission: "crete_password_user",
});

const useUsers = () => {
  /**
   * @description Method to save users
   * @param {User} user User to save
   */
  const createUser = async (): Promise<void> => {
    try {
      user.status = "true";
      user.permission = "create_user";
      sending.value = false;
      await axios.post(`${url}`, user, header).then((response) => {
        sending.value = true;

        //if an error has occurred
        if (response.data.message_error) {
          messageNotification(0, response.data.message_error);
          closeModal(false);
          return;
        }
        users.value.unshift(response.data.user);
        messageNotification(1, "Usuario creado exitosamente");
        closeModal(false);
      });
    } catch (error) {
      messageNotification(0, "Error al crear usuario");
      sending.value = true;
      throw new Error(error);
    }
  };

  /**
   * @description Method to get all users
   * @returns {Promise}
   */
  const getUsers = async () => {
    try {
      return await axios.get(`${url}/read_user`, header);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description Method to get a user
   * @param {Number} id User id
   * @returns {Promise}
   */
  const getUser = async (id: number) => {
    try {
      return await axios.get(`${url}/${id}/read_info_users`, header);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getProfile = async (id: number) => {
    try {
      return await axios.get(`${url}/${id}/read_profile`, header);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description Method to edit a user
   */
  const updateUser = async (): Promise<void> => {
    user.permission = "edit_user";
    sending.value = false
    try {
      await axios
        .put(`${url}/${user.id}`, user, header)
        .then((response: any) => {
          sending.value = true
          if (response.data.message_error) {
            messageNotification(0, response.data.message_error);
            closeModal(false);
            return;
          }

          updateData(response.data.user);
          messageNotification(1, "Usuario actualizado con exito");
          closeModal(false);
        });
    } catch (error) {
      sending.value = true
      messageNotification(0, "Error al actualizar usuario");
      throw new Error(error);
    }
  };

  /**
   * @description Method to restore password
   * @param {Number} id  User id
   */
  const RestorePassword = async (id: number,password:Password): Promise<void> => {
    password.idUserAuth = userId;
    password.permission = "create_password_user";
    try {
      await axios
        .put(`${http.getApi()}/restorePassword/users/${id}`, password, header)
        .then((response) => {
          if (response.data.message_error) {
            messageNotification(0, response.data.message_error);
            closeModal(false);
            return;
          }

          messageNotification(1, response.data.message);
          closeModal(false);
        });
    } catch (error) {
      messageNotification(0, "Error al restaurar contraseña");
      throw new Error(error);
    }
  };

  /**
   * @description Method to change password
   * @param {number} id  User id
   */
  const changePassword = async (id: number): Promise<void> => {
    sending.value = false
    password.permission = "change_password";
    try {
      axios.put(`${url}/password/${userId}`, password, header).then((response) => {
        sending.value =  true
        if (response.data.message_error) {
          messageNotification(0, response.data.message_error);
          closeModal(false);
          return;
        }

        if (response.status == 200) {
          messageNotification(1, "Contraseña cambiada con exito");
          closeModal(false);
        } else {
          messageNotification(0, "Error al cambiar contraseña");
        }
      });
    } catch (error) {
      messageNotification(0, "Error al cambiar contraseña");
      sending.value =  true
      throw new Error(error);
    }
  };

  /**
   * @description method to close the modal
   * @param {Boolean} value false
   */
  const closeModal = (value: boolean): void => {
    modalUser.value = value;
    cleanFields();
  };

  /**
   * @description method to clear all form fields
   */
  const cleanFields = (): void => {
    user.id = "";
    user.firstName = "";
    user.lastName = "";
    user.email = "";
    user.rolId = "";
    user.role = "";
    user.status = "";
    password.newPassword = "";
    password.oldPassword = "";
    password.passwordAuth = "";
    option.value = "";
  };

  /**
   * @description method to update the information of a user when editing
   * @param user  User
   */
  const updateData = (user: User) => {
    auxUser.id = user.id;
    auxUser.firstName = user.firstName;
    auxUser.lastName = user.lastName;
    auxUser.email = user.email;
    auxUser.status = user.status;
    auxUser.rolId = String(user.rolId);
    //@ts-ignore
    auxUser.role = user.role.name;
    auxUser.createdAt = user.createdAt;
  };

  return {
    getUsers,
    getUser,
    RestorePassword,
    updateUser,
    createUser,
    changePassword,
    closeModal,
    getProfile
  };
};

export default useUsers;
