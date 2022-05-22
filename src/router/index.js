import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import user from "@/store/user";

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
    path: '/movie',
    name: 'movie mainpage',
    component: () => import('../views/MovieMainpage.vue')
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
    path: '/bookdetail',
    name: 'book detail',
    component: () => import('../views/BookInnerpage.vue')
  },
  {
    path: '/moviedetail',
    name: 'movie detail',
    component: () => import('../views/MovieInnerpage.vue')
  },
  {
  path: '/feedback',
  name: 'feedback',
  component: () => import('../views/Feedback.vue')
  },
  {
  path: '/creategroup',
  name: 'create group',
  component: () => import('../views/CreateGroup.vue')
  },
  {
    path: '/group/inner',
    name: 'group inner page',
    component: () => import('../views/GroupInnerpage.vue')
    },
  {
    path: '/report',
    name: 'report',
    component: () => import('../views/Report.vue')
   },
   {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requireAuth: true
    }
   },
   {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
   },
   {
    path: '/book/:id',
    name: 'book datail',
    component: () => import('../views/BookInnerpage.vue'),
  },
  {
    path: '/movie/:id',
    name: 'movie datail',
    component: () => import('../views/MovieInnerpage.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 通过 Vuex 获取用户登录信息
  const userInfo = user.getters.getUser(user.state());

  // 若前往的是登录路由，则保存当前路由到 preRoute 的键值对中，以便登录成功后跳转
  if (to.path === '/login') {
    localStorage.setItem("preRoute", router.currentRoute.fullPath);
  }

  // 若用户未登录且访问的页面需要登录，则跳转至登录页面
  if (!userInfo && to.meta.requireAuth) {
    next({
      name: 'Login',
    })
  }

  next()
})

export default router
