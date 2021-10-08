import { ref, reactive, UnwrapRef } from "vue";
import axios, { AxiosResponse } from "axios";
import { Credential } from "../../interfaces/credential.interface"; 
import messageNotification from "../../helpers/notification.helper";
import auth from "../../utils/auth.utils";
import http from "../../utils/httpHandlers.utils";
import { useRouter } from "vue-router";

/**
 * @description Variable for user status, true or false
 * @type {Booelan}
 */
const isLogin = ref<Boolean>(false);

/**
 * @description Variable to handle the spinner
 */
 export let sending = ref<Boolean>(true);

/**
 * @description Variable to handle the login status, change the password or not, true or false
 * @type {Boolean}
 */
const changePassword = ref<Boolean>(false);


/**
 * @description Credentials to login
 * @type {Credential}
 */
let credentials: UnwrapRef<Credential> = reactive({
  email: "",
  password: "",
});

/**
 * @description Endpoint for authentication
 * @type {String}
 */
const url:string = `https://images-share-sms.herokuapp.com/api/auth`

const useLogin = () => {
  const router = useRouter();
  /**
   * @description Method to start session
   */
  const login = async ():Promise<void> => {
    sending.value = false;
    try {
      axios.post(`${url}/login`, credentials).then(async (response:AxiosResponse) => {
        sending.value = true;
        // if you need to change the password
        if(response.data.message_change_password){
          cleanFields()
          messageNotification(1, response.data.message_change_password,2);
          //changePassword.value = true;
          auth.setTokenTemp(response.data.token_temp);
          router.push("/cambiar_contrasena")
          return;
        }
        
        // if the login was successful
        if (response.data.user) {
          messageNotification(1, `Bienvenido ${response.data.user.names}`,2);
          setLocalStorage(response);
          // console.log("voy a ");
          
          router.push("/imagenes")
          // console.log("asd");
          
        } else {
          messageNotification(0, response.data.message,2);
        }
      });
    } catch (error) {
      sending.value = true;
      //throw new Error(error);
    }
  };

  /**
   * @description method to close session
   */
  const logout = () => {
    auth.destroyAuth()
  };

  /**
   * @description auxiliary method to save data of the user logged in the localstorage
   * @param {AxiosResponse} data 
   */
  const setLocalStorage = async (response:AxiosResponse):Promise<void> => {
    // console.log("response");
    // console.log(response);
    
    auth.setAuth(JSON.stringify(response.data.user))
    auth.setToken(response.data.token)
    //isLogin.value = true;
  };
  
  /**
   * @description method to delete form fields
   */
  const cleanFields = ():void=>{
    credentials.password = "";
  }


  return { login, logout };
};

export { useLogin, credentials, isLogin,changePassword };
