import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyFriends from "./views/MyFriends.vue";
import Cart from "./views/ShoppingCart.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import {Globals} from '@/models/api'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/MyFriends',
      name: 'MyFriends',
      component: MyFriends
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log({ to, from })
  const publicRoutes = ['home', 'login', 'Register'];
  if(!publicRoutes.includes(to.name) && !Globals.user){
    Globals.redirectRoute = { name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash }
    return next('login');
  }
  next();
})

export default router;