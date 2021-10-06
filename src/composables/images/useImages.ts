import axios,{AxiosRequestConfig, AxiosResponse} from "axios";
import { reactive, ref } from "vue";
import { Image } from "../../interfaces/images.interface";
/**
 * @description Endpoint to interests
 * @type {String}
 */
const url: string = `https://images-share-sms.herokuapp.com/api/images`;

/**
 * @description Variable to handle the opening and closing 
 */
export const modalStatusImage = ref(false)


export let images = ref<any>([]);

export let statusImage = ref<Boolean>();

export let uploading = ref<Boolean>(false)

export let maxLengthBody = ref<String>('200')

export let image = reactive<Image>({url: '', slug: '', redirect: ''})


const useImages = () => {
  let flagDimension:Boolean = false;
  /**
   * @description Method to obtain all images
   * @returns Promise
   */
  const getImages = async ():Promise<AxiosResponse> => {
    try {
      return await axios.get(`${url}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description Method to obtain an image
   * @param {Number} id image is
   * @returns Promise
   */
  const getImage = async (id: number):Promise<AxiosResponse> => {
    try {
      return await axios.get(`${url}/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  };


  const saveImage = async (file:any, slug: string) => {
      uploading.value = true;

    


      const formData = new FormData()
      
      formData.append('file',file);
      formData.append('slug', slug);

      axios.post(`${url}`,formData,{headers: { 'Content-Type': 'multipart/form-data' }})
      .then((response)=>{
        console.log("response");
        console.log(response);
        image.redirect = response.data.link
        modalStatusImage.value = false;
        statusImage.value = true
        uploading.value = false;
        maxLengthBody.value = "95"
      })
  }

  /**
   * @description method to close the modal of edit status
   * @param {Boolean} value false
   */
  const closeModalImages = (value:boolean)=>{
    modalStatusImage.value = false;
  }


  const validateSize = (file:any):Boolean =>{
    const maxValueSize = 2
    const size = (file.size/1024)/1024
    
    if(size > maxValueSize){
      return true
    }

    return false

  }

  
 
  return {
    closeModalImages,
    getImages,
    getImage,
    saveImage
  };
};



export { useImages };
