import {ref} from "vue"
import {Rol} from "../../interfaces/rol.interface"
import {ValidateErrorEntity} from "ant-design-vue/es/form/interface"
import { modal} from "../../composables/ConfirmPassword/useConfirmPassword"

const useValidationForm = () => {
    const formRef = ref()

     /**
     * @description Form rules
     */
    const rules = {
        name:[
            {   
                required : true,
                message:"Ingrese un nombre de rol",
                trigger:"blur"
            }
        ],
        description:[
            {
                required:true,
                message:"Por favor Ingrese una descripcion",
                trigger:"blur"
            }
        ],
        status: [
            { 
                required: true, 
                message: 'Seleccione un estado', 
                trigger: 'change' 
            }
        ],
        permissions: [
            { 
                type: "array",
                required: true, 
                message: 'Seleccione minimo un permiso', 
                trigger: 'change' 
            }
        ],
    }

    const onSubmit = () =>{
        formRef.value.validate()
        .then(()=>{
            modal.value = true
        })
        .catch((error: ValidateErrorEntity<Rol>) => {
            console.log("error", error);
          });
    }

    const onSubmitUpdate = () =>{
        formRef.value.validate()
        .then(()=>{
            modal.value = true
        })
        .catch((error: ValidateErrorEntity<Rol>) => {
            console.log("error", error);
          });
    }

    return{onSubmit,formRef,rules,onSubmitUpdate}
}

export default useValidationForm