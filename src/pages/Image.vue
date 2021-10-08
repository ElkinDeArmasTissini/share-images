<template>
<div class="home" style="background:black">
    <a :href="slug" style="background:blue; width:1000px">
        <img :src="imagen" alt="" style="width:100%; heigth:100%">
    </a>
</div>
    
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {useRoute} from "vue-router"
import jwt_decode from "jwt-decode";

 
export default defineComponent({
    setup() {
        let imagen = ref<string>('')
        let slug = ref<string>('')
        // console.log("onmounted");
        const route = useRoute()

        let token = ''
        onMounted(async() => {
            token = String(route.query.token);
            const data:any = jwt_decode(token)
            imagen.value = data.image.url
            slug.value = data.image.slug
            
        }) 

        return {
            imagen,
            slug

        }
    },
})
</script>


<style>
  
</style>