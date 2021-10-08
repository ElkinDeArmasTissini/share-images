import {ref} from "vue"
import { Credential } from "../../interfaces/credential.interface";
import {useLogin} from "./useLogin";
import {ValidateErrorEntity} from "ant-design-vue/es/form/interface"

const useValidationForm = () => {
    const {login} = useLogin()
    const formRef = ref()

    const rules = {
        email:[
            {   
                type:"email",
                required : true,
                message:"Ingrese un correo valido",
                trigger:"blur"
            }
        ],
        password:[
            {
                required:true,
                message:"Por favor introduzca una contraseña",
                trigger:"blur"
            }
        ]
    }

    const onSubmit = () =>{
        formRef.value.validate()
        .then(()=>{
            login()
        })
        .catch((error: ValidateErrorEntity<Credential>) => {
            console.log("error", error);
          });
    }

    return{onSubmit,formRef,rules}
}

export default useValidationForm