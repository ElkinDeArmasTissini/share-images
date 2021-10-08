import { ref, reactive, UnwrapRef } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import { Credential } from "../../interfaces/credential.interface";
import messageNotification from "../../helpers/notification.helper";
import http from "../../utils/httpHandlers.utils";

/**
 * @description Endpoint for authentication
 * @type {String}
 */
const url: string = `${http.getApi()}/auth`;

/**
 * @description Header for the endpoint
 */
const header: AxiosRequestConfig = http.getHeaderTemp();

/**
 * @description Variable to handle the spinner
 */
export let sending = ref<Boolean>(true);

const usePassword = () => {
  /**
   * @description Credentials to change,edit password
   * @type {Credential}
   */
  let credentials: UnwrapRef<Credential> = reactive({
    password: "",
    newPassword: "",
    RepeatPassword: "",
    email: "",
    permission: "change_password",
  });

  /**
   * @description Method to change password
   */
  const changePassword = async ():Promise<void> => {
    sending.value = false;
    try {
      axios
      .put(`${url}/change_password`, credentials, header)
      .then((response) => {
        sending.value = true;
        if (response.data.message_error) {
          messageNotification(0, response.data.message_error, 2);
        } else {
          messageNotification(1, response.data.message, 2);
          window.history.back();
        }
      });
    } catch (error) {
      sending.value = true;
      throw new Error(error)
    }

  };

  /**
   * @description Method to recover password
   * @param id  User id
   */
  const recoverPassword = async (id: string):Promise<void> => {
    sending.value = false;
    try {
      axios
        .put(`${url}/recover_password/${id}`, credentials)
        .then((response) => {
          sending.value = true;
          // if an error has occurred
          if (response.data.message_error) {
            messageNotification(0, response.data.message_error, 3);
            return;
          }

          messageNotification(1, response.data.message, 2);
          cleanFiends();

          setTimeout(() => {
            window.location.href = "https://backoffice.tissini.app/login";
          }, 3000);
        });
    } catch (error) {
      sending.value = true;
      throw new Error(error);
    }
  };

  /**
   * @description Method to request a password change
   */
  const requestPasswordReset = async ():Promise<void> => {
    sending.value = false;
    try {
      axios
        .post(`${url}/recover_password_email`, credentials)
        .then((response) => {
          sending.value = true;

          // if an error has occurred
          if (response.data.message_error) {
            messageNotification(0, response.data.message_error, 3);
            return;
          }
          messageNotification(1, response.data.message, 2);
          credentials.email = "";
          setTimeout(() => {
           // window.location.href = "http://localhost:3000/login";
            window.location.href = "https://backoffice.tissini.app/login";
          }, 2000);
        });
    } catch (error) {
      sending.value = true;
      throw new Error(error);
    }
  };

  /**
   * @description method to delete form fields
   */
  const cleanFiends = () => {
    credentials.password = "";
    credentials.newPassword = "";
    credentials.RepeatPassword = "";
  };

  return { credentials, changePassword, recoverPassword, requestPasswordReset };
};

export default usePassword;
