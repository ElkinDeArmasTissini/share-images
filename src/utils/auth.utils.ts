import { reactive } from "vue";

/**
 * @description List where the permissions of the logged in user will be stored
 * @type String
 */
export let permissions = reactive<String[]>([]);

/**
 * @description Variable where a temporary token will be stored, to change the password
 */
let token_temp = "";

export default {
  /**
   * @description Method to save user data in localstorage
   * @param user
   */
  setAuth(user: string): void {
    localStorage.setItem("user", user);
  },

  /**
   * @description Method to save token data in localstorage
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem("token_auth", token);
  },

  /**
   * @description Method to save temporary token
   * @param token
   */
  setTokenTemp(token: string): void {
    token_temp = token;
  },

  /**
   * @description Method to return the temporary token
   * @returns string
   */
  getTokenTemp(): string {
    return token_temp;
  },

  /**
   * @description Method to return the data of the logged in user
   * @returns string
   */
  getUserAuth(): string | null {
    return localStorage.getItem("user");
  },

  /**
   * @description Method to return the token of the logged in user
   * @returns
   */
  getToken(): string | null {
    return localStorage.getItem("token_auth");
  },

  /**
   * @description Method to close session
   */
  destroyAuth(): void {
    localStorage.clear();
    window.location.reload();
  },

  /**
   * @description Method to know if a logged in user has a specific permission, received by parameter
   * @param {string} permission
   * @returns boolean
   */
  hasPermissionTo(permission: string): boolean {
    return permissions.some((element:String) => element == permission)
  },
};
