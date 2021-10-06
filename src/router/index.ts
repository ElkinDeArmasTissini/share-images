import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router"

const routes:Array<RouteRecordRaw> = [
    {
        path:"/imagenes",
        component: ()=>import("../pages/Images.vue"),
    },
    {
        path:"/image",
        component: ()=>import("../pages/Image.vue")
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;
