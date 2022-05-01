import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/emailverify',
    name: 'email verify',
    component: () => import('../views/EmailVerify.vue')
  },
  {
    path: '/sqverify',
    name: 'security question verify',
    component: () => import('../views/SQVerify.vue')
  },
  {
    path: '/book',
    name: 'book mainpage',
    component: () => import('../views/BookMainpage.vue')
  },
  {
    path: '/drama',
    name: 'drama mainpage',
    component: () => import('../views/DramaMainpage.vue')
  },
  {
    path: '/feed',
    name: 'feed mainpage',
    component: () => import('../views/FeedMainpage.vue')
  },
  {
    path: '/group',
    name: 'group mainpage',
    component: () => import('../views/GroupMainpage.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/Feedback.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
