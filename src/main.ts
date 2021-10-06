import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const vue = createApp(App)

vue.use(router)
vue.use(antd)
vue.mount('#app')
