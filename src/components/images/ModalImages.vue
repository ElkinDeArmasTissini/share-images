<template>
  <div>
    <div class="text-center" style="top: 1%">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Imagenes" class="modalImage">
          <div class="container">
            <div class="row center">
              <div class="col-md-3"></div>
              <div class="col-md-4 ">
                <a-input
                  type="text"
                  class="input mx-2"
                  :value="shorLink"
                  id="myInput"
                />
                
              </div>
              <div class="col-md-2">
              
                <a-button @click="copy('tab1')" class="btn btn-secondary">
                  Copiar enlace
                </a-button>
              </div>

            </div>
            <br>
            <div class="row">
              <!-- <label id="url">{{image.redirect}}</label> -->

              <div
                class="col-md-2 my-2 divImage"
                v-for="image in images"
                :key="image.id"
              >
                <img
                  class="rounded"
                  :src="image.url"
                  @click="selectImage(image)"
                />
              </div>
              {{ image.slug }}
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Subir" force-render>
          <div class="row center">
            <div class="col-md-4 offset-md-2">
              <a-input
              placeholder="https://tissini.app/"
                class="input mx-2"
                type="text"
                v-model:value="slug"
              ></a-input>
            </div>
            <div class="col-md-4">
              <div class="file-select">
                <input
                  type="file"
                  name="file"
                  @change="setImage"
                  accept=".png,.jpg,.jpeg,.pneg"
                  aria-label="Archivo"
                />
              </div>
            </div>
          </div>
          <br><br>
          <div class="row center">
              <div class="col-md-3"></div>
              <div class="col-md-4 ">
                <a-input
                  type="text"
                  class="input mx-2"
                  :value="image.redirect"
                  id="myInput2"
                />
                
              </div>
              <div class="col-md-2">
              
                <a-button @click="copy('tab2')" class="btn btn-secondary">
                  Copiar enlace
                </a-button>
              </div>

            </div>
          <!-- <div class="file-select">
            <input
              type="file"
              name="file"
              @change="setImage"
              accept=".png,.jpg,.jpeg,.pneg"
              aria-label="Archivo"
            />
          </div> -->
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import {
  useImages,
  images,
  modalStatusImage,
  statusImage,
  uploading,
  maxLengthBody,
  image,
} from "../../composables/images/useImages";
import { Image } from "../../interfaces/images.interface";
export default defineComponent({
  props: {
    isModal: Boolean,
    indexImage: Number,
  },

  setup(props, { emit }) {
    const { getImages, saveImage, getImage } = useImages();
    let title = ref<String>("Insertar Imagen");
    const totalImages = ref(0);
    let slug = ref<string>("");
    let shorLink = ref<string>("")
    // let fileImage = reactive<>
    const closeModal = () => {
      console.log("emit");
      return emit("closeModal", false);
    };



    const selectImage = async (img: Image) => {
      //asing url

      const dataImage = await getImage(img.id);
      //image.redirect = dataImage.data.link;
      shorLink.value = dataImage?.data.link;
      //  console.log(dataImage.data.link);

      modalStatusImage.value = false;
    };

    const setImage = (event: any) => {
      let file = event.target.files[0];
      saveImage(file, slug.value);
    };

    const copy = (type:string) => {
      let url:any;
      if(type == "tab1"){
          url = document.getElementById("myInput");
      }else{
         url = document.getElementById("myInput2");
      }
      
      // console.log("copiar");
      url.select();
      url.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(url.value);
      // alert("Copied the text: " + url.value);
    };



    onMounted(async () => {
      // console.log("modal");
      //@ts-ignore
      // console.log(import.meta.env.VITE_SECRET);
      images.value = [];
      let dataImages = await getImages();
      images.value = dataImages?.data.images;
    });

    return {
      totalImages,
      closeModal,
      title,
      activeKey: ref("1"),
      images,
      selectImage,
      setImage,
      uploading,
      slug,
      image,
      getImage,
      copy,
      shorLink
    };
  },
});
</script>

<style scoped>
img {
  width: 100%;
  height: 100px;
}

img:hover {
  cursor: pointer;
  transform: scale(1.8);
}

.file-select {
  position: relative;
  display: inline-block;
}

.file-select::before {
  background-color: rgb(51, 102, 255);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  content: "Seleccionar Imagen"; /* testo por defecto */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.file-select input[type="file"] {
  opacity: 0;
  width: 200px;
  height: 32px;
  display: inline-block;
}

.modalImage {
  height: 360px;
  overflow-y: auto;
}

@keyframes example {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0.2;
  }
}

.input {
  border-radius: 10px;
  resize: none;
}

.center {
  text-align: center;
  align-items: center;
}
</style>
