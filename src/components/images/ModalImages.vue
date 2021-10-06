<template>
  <div>
    <a-modal
      :visible="isModal"
      width="70%"
      :maskClosable="false" 
      @cancel="closeModal"
      :title="title"
      class="text-center"
      :footer="null"
      style="top: 1%"
    >
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Imagenes" class="modalImage">
          <div class="container">
            <div class="row">
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
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Subir" force-render>
          <a-input
            type="text"
            v-model:value="slug"
          ></a-input>

        <a :href="image.redirect">{{image.redirect}}</a>
          <div  class="file-select">
            <input
              type="file"
              name="file"
              @change="setImage"
              accept=".png,.jpg,.jpeg,.pneg"
              aria-label="Archivo"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
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
  image
} from "../../composables/images/useImages";
import { Image } from "../../interfaces/images.interface";
export default defineComponent({
  props: {
    isModal: Boolean,
    indexImage: Number
  },

  setup(props, { emit }) {
    const { getImages, saveImage } = useImages();
    let title = ref<String>("Insertar Imagen");
    const totalImages = ref(0);
    let slug = ref<string> ("sss")
    const closeModal = () => {
      console.log("emit"); 
      return emit("closeModal", false)
      };

    const selectImage = (img: Image) => {
      //asing url
      image.url = img.url
      image.slug = img.slug
      modalStatusImage.value = false;
    };

    const setImage = (event: any) => {
      let file = event.target.files[0];
      console.log("file");
      console.log(file);
      
      saveImage(file, slug.value);

      
    };

    onMounted(async () => {
      console.log("modal");
      //@ts-ignore
      console.log(import.meta.env.VITE_SECRET)
      images.value = [];
      let dataImages = await getImages();
      images.value = dataImages.data.images

     
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
      image
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
</style>
