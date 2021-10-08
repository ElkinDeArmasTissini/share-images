import { ref, computed } from "vue";
import auth from "../utils/auth.utils"

/**
 *  @description Variable to obtain the information of the logged in user
 */
const dataUser = ref<any>(auth.getUserAuth());
dataUser.value = JSON.parse(dataUser.value || "{}")

/**
 * @description Computed variable to return the first and last name of the logged in user
 */
const user = computed(() => {
  return dataUser.value.firstName +" "+ dataUser.value.lastName;
});

/**
 * @description Variable to obtain the id of the logged in user
 */
const userId = dataUser.value.id;


export { user, userId };
