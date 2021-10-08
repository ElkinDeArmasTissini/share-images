import auth from "../utils/auth.utils";
import { AxiosRequestConfig } from "axios";

export default {
  /**
   * @description Method returns the endpoint
   * @returns string
   */
    getApi():string{
       //return "https://backendnotifications.herokuapp.com/api";
       //return "http://192.168.1.10:8000/api"
        return "http://localhost:8000/api";
       //return "https://backofficeapi.tissini.app/api";
    },

    /**
     * @description Method returns a header with its settings
     * @returns AxiosRequestConfig
     */
    getHeader():AxiosRequestConfig {
        const token = auth.getToken()
        const header: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearrer ${token}`,
          },
        };
        return header;
    },

    /**
     * @description Method returns a header with its settings, temporary token
     * @returns AxiosRequestConfig
     */
    getHeaderTemp(){
      const token = auth.getTokenTemp()
      const header: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearrer ${token}`,
        },
      };
      return header;
    }
}