import {ref} from "vue"
import {User} from "../../interfaces/user.interface"
import useUsers from "./useUsers";
import {ValidateErrorEntity} from "ant-design-vue/es/form/interface"
import  { modal} from "../../composables/ConfirmPassword/useConfirmPassword"

const useValidationForm = () => {
    const {createUser} = useUsers()
    const formRef = ref()
    
    /**
     * @description Form rules
     */
    const rules = {
        firstName:[
            {   
                required : true,
                message:"Ingrese un nombre",
                trigger:"blur"
            }
        ],
        lastName:[
            {
                required:true,
                message:"Por favor Ingrese apellidos",
                trigger:"blur"
            }
        ],
        email:[
            {
                type:"email",
                required:true,
                message:"Ingrese un correo valido",
                trigger:"blur"
            }
        ],
        role: [
            { 
                required: true, 
                message: 'Seleccione un rol', 
                trigger: 'blur' 
            }
        ],
        status: [
            { 
                required: true, 
                message: 'Seleccione un estado', 
                trigger: 'change' 
            }
        ],
    }

    const onSubmit = () =>{
        formRef.value.validate()
        .then(()=>{
            createUser()
        })
        .catch((error: ValidateErrorEntity<User>) => {
            console.log("error", error);
          });
    }

    const onSubmitUpdate = () =>{
        formRef.value.validate()
        .then(async ()=>{
            modal.value = true;
        })
        .catch((error: ValidateErrorEntity<User>) => {
            console.log("error", error);
          });
    }

    return{onSubmit,formRef,rules,onSubmitUpdate}
}

export default useValidationForm