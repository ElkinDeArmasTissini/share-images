import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [

    {
        path: "/",
        redirect: "/imagenes"
    },

    {
        path: "/image",
        name: "image",
        component: () => import("../pages/Image.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: "/imagenes",
        component: () => import("../pages/Images.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../pages/auth/Login.vue"),
        meta: { requiresAuth: false }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem("token_auth") 
    if(to.meta.requiresAuth){
      if(token){
          if(to.fullPath != "/cambiar_contrasena"){
            next()
          }else{
            next({path:"/imagenes"})
          }
      } 
      else{
        next({path:"/login"})
      } 
    }else{
      if(token && to.name != "image")next({path:"/imagenes"})
      else next()
    }
  })

export default router;
