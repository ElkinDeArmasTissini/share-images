import {ref} from "vue"
import {Password} from "../../interfaces/password.interface"
import useUsers from "./useUsers";
import {ValidateErrorEntity} from "ant-design-vue/es/form/interface"

const useValidationForm = () => {
    const {changePassword} = useUsers()
    const formRef = ref()
    /**
     * @description Form rules
     */
    const rules = {
        oldPassword:[
            {   
                required : true,
                message:"Ingrese contraseña",
                trigger:"blur"
            }
        ],
        newPassword:[
            {
                required:true,
                message:"ingrese contraseña",
                trigger:"blur"
            }
        ],
        password:[
            {
                required:true,
                message:"ingrese contraseña",
                trigger:"blur"
            }
        ],
        passwordAuth:[
            {
                required:true,
                message:"ingrese su contraseña",
                trigger:"blur"
            }
        ]
    }

    const onSubmitUpdate = (id:number) =>{
        formRef.value.validate()
        .then(()=>{
            changePassword(id)
        })
        .catch((error: ValidateErrorEntity<Password>) => {
            console.log("error", error);
          });
    }

    return{formRef,rules,onSubmitUpdate}
}

export default useValidationForm