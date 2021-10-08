import { ref } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { userId } from "../../helpers/userDataLogin.helper";
import http from "../../utils/httpHandlers.utils";

/**
 * @description Header for the endpoint
 * @type {AxiosRequestConfig}
 */
 const header: AxiosRequestConfig = http.getHeader();

const key = ref("1");
const selectedKeys = ref<string[]>([key.value]);
const useLayout = () => {

  const menuItem:any = [
    {
      key:1,
      name:"Notificaciones",
      route:"/notificaciones",
      component:"bell-outlined",
      permission:"show_menu_notifications"
    },
    {
      key:2,
      name:"Intereses",
      route:"/intereses",
      component:"appstore-outlined",
      permission:"show_menu_interets"
    },
    {
      key:3,
      name:"Emprendedoras",
      route:"/emprendedoras",
      component:"team-outlined",
      permission:"show_menu_clients"
    },
    {
      key:4,
      name:"Usuarios",
      route:"/usuarios",
      component:"user-outlined",
      permission:"show_menu_users"
    },
    {
      key:5,
      name:"Roles",
      route:"/roles",
      component:"lock-outlined",
      permission:"show_menu_roles"
    },
    {
      key:6,
      name:"Permisos",
      route:"/permisos",
      component:"idcard-outlined",
      permission:"show_menu_permissions"
    }
  ]

  /**
 * @description method to get the permissions of the logged in user
 */
    const getPermissionsUser = async (): Promise<AxiosResponse> => {
    try {
      return axios.get(
        `${http.getApi()}/permissions/user/${userId}/read_notifications`,
        header
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  return {menuItem,getPermissionsUser };
};

export { useLayout, key, selectedKeys };
