import axios,{AxiosRequestConfig, AxiosResponse} from "axios";
import { ref, reactive,UnwrapRef } from "vue";
import { Rol } from "../../interfaces/rol.interface";
import messageNotification from "../../helpers/notification.helper";
import http from "../../utils/httpHandlers.utils";

/**
 * @description Endpoint to permissions
 * @type {String}
 */
const url: string = `${http.getApi()}/roles`;

/**
 * @description Header for the endpoint
 * @type {AxiosRequestConfig}
 */
 const header: AxiosRequestConfig = http.getHeader();

 /**
 * @description Variable to handle the opening and closing of the modal
 * @type {Boolean}
 */
export const modal = ref<Boolean>(false);

 /**
  * @description Object of type Rol 
  * @type {Rol}
  */
export let role:UnwrapRef<Rol> = reactive({
  id: "",
  name: "",
  description: "",
  status: "",
  permissions: [],
  permission:""
});

/**
 * @description List where all permissions obtained from the database will be added
 * @type {Rol[]}
 */
export let roles = ref<Rol[]>([]);

/**
 * @description Variable to handle the spinner when saving a role
 */
 export let sending = ref<Boolean>(true);

const useRoles = () => {

  /**
   * @description Method to create a role
   * @returns Promise
   */
  const createRol = async ():Promise<void> => {
    role.status = "true";
    role.permission="create_rol";
    sending.value = false
    try {
      await axios.post(`${url}`, role, header).then((response: any) => {
        sending.value = true
        // If an error has occurred
        if(response.data.message_error){
          messageNotification(0, response.data.message_error);
          return;
        }

        messageNotification(1, "Rol creado exitosamente");
        roles.value.unshift(response.data.role);
        closeModal(false)
      });
    } catch (error) {
      sending.value = true
      messageNotification(0, "Error al crear rol");
      throw new Error(error);
    }
  };

  /**
   * @description Method to edit a role
   * @returns Promise<void>
   */
  const EditRol = async ():Promise<void> => {
    role.permission = "edit_rol"
    sending.value = false
    try {
      await axios.put(`${url}/${role.id}`, role, header).then(async (response) => {
        sending.value = true
        // If an error has occurred
        if(response.data.message_error){
          messageNotification(0, response.data.message_error);
          return;
        }

        roles.value = [];
        const data = await getRoles();
        roles.value = await data.data.roles;
        messageNotification(1, "Rol editado exitosamente");
        closeModal(false)
      });
    } catch (error) {
      sending.value = true
      messageNotification(1, "Error al editar rol");
      throw new Error(error);
    }
  };

  /**
   * @description Method to get all roles
   * @returns Promise
   */
  const getRoles = async ():Promise<AxiosResponse> => {
    try {
      return await axios.get(`${url}/read_roles`, header);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description Method to get only active roles
   * @returns Promise
   */

  const getRolesActives = async ():Promise<AxiosResponse> => {
    try {
      return await axios.get(`${http.getApi()}/roles_actives/read_roles`, header);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description method to close the modal
   * @param {Boolean} value false
   */
  const closeModal = (value: boolean) => {
    modal.value = value;
    role.id = "";
    role.name = "";
    role.description = "";
    role.status = "";
    role.permissions = [];
  };


  return { getRoles, createRol, EditRol,getRolesActives,closeModal };
};

export { useRoles };
