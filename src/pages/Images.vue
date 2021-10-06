<template>
  <h1>{{isModal}}</h1>
  
  <modal-images 
    :isModal="isModal" 
    @closeModal="closeModal"
    v-if="isModal"
    />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ModalImages from "../components/images/ModalImages.vue";
export default defineComponent({
  components: { ModalImages },
  setup() {
    let isModal = ref<Boolean>(true);
    
    const closeModal = (value: boolean): void => {
        isModal.value = value
    }
    return {
      isModal,
      closeModal
    };
  },
});
</script>
