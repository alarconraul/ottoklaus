import Vue from 'vue'
import VueRouter from 'vue-router'
import Toys from '../views/Toys.vue'
import Login from '../views/Login.vue'
import Firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Toys',
    component: Toys,
    meta:{
      login: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);
  console.log(user)
  console.log(authRequired)
  if (!user && authRequired) {
    next('/login')
  } else {
    next();
  }
})

export default router
