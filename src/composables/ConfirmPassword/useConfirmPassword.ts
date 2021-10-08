import { ref, reactive } from "vue";
import axios,{AxiosRequestConfig} from "axios";
import { userId } from "../../helpers/userDataLogin.helper";
import messageNotification from "../../helpers/notification.helper";
import http from "../../utils/httpHandlers.utils";
import { Password } from "../../interfaces/password.interface";

/**
 * @description Variable to handle the spinner when the password is confirmed
 * @type {Boolean}
 */
export let sending = ref<Boolean>(true);

/**
 * @description object used to confirm a password
 * @type {Password}
 */
export let password = reactive<Password>({
  passwordAuth: "",
  idUserAuth: "",
  permission: "crete_password_user",
});

/**
 * @description Variable to handle the opening and closing of the modal 
 * @type {Boolean}
 */
export const modal = ref(false);

/**
 * @description Endpoint to auth
 * @type {String}
 */
const url: string = `${http.getApi()}/auth`;

/**
 * @description Header for the endpoint
 * @type {AxiosRequestConfig}
 */
 const header: AxiosRequestConfig = http.getHeader();

const useConfirmPassword = () => {
  /**
   * @description Method to confirm the password of the authenticated user
   * @returns Promise<Boolean>
   */
  const ConfirmPassword = async (): Promise<boolean> => {
    sending.value = false
    password.permission = "edit_user";
    password.idUserAuth = userId;

    const response = await axios.post(
      `${url}/verify_password`,
      password,
      header
    );

    // if an error has occurred
    if (response.data.message_error) {
      messageNotification(0, response.data.message_error);
      password.idUserAuth = "";
      password.passwordAuth = "";
      closeModalConfirmPassword(false);
      return false;
    }

    if (response.data.message) {
      messageNotification(1, response.data.message);
      password.idUserAuth = "";
      closeModalConfirmPassword(false);
      return true;
    }

    return false;
  };

  /**
   * @description method to close the modal
   * @param {Boolean} value false
   */
  const closeModalConfirmPassword = (value: boolean) => {
    modal.value = value;
    sending.value = true
  };

  return { closeModalConfirmPassword, ConfirmPassword };
};

export default useConfirmPassword;
