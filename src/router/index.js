import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import user from "@/store/user";

const routerReplace = VueRouter.prototype.push
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      requireNotAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requireNotAuth: true
    }
  },
  {
    path: '/emailverify',
    name: 'email verify',
    component: () => import('../views/EmailVerify.vue'),
    meta: {
      requireNotAuth: true,
    }
  },
  {
    path: '/sqverify',
    name: 'security question verify',
    component: () => import('../views/SQVerify.vue'),
    meta: {
        requireNotAuth: true,
    }
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
    path: '/tag/:id',
    name: 'tag inner',
    component: () => import('../views/TagInnerpage.vue')
  },
  {
    path: '/feed/:id',
    name: 'feed inner',
    component: () => import('../views/FeedInnerpage.vue')
  },
  {
    path: '/book/detail/:id',
    name: 'book datail',
    component: () => import('../views/BookInnerpage.vue'),
  },
  {
    path: '/movie/detail/:id',
    name: 'movie datail',
    component: () => import('../views/MovieInnerpage.vue'),
  },
  {
    path: '/book/filter=category:id',
    name: 'book filter',
    component: () => import('../views/BookFilterpage.vue'),
  },
  {
    path: '/movie/filter=category:id',
    name: 'movie filter',
    component: () => import('../views/MovieFilterpage.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/Feedback.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/creategroup',
    name: 'create group',
    component: () => import('../views/CreateGroup.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/group/:id',
    name: 'group inner page',
    component: () => import('../views/GroupInnerpage.vue')
  },
  {
    path: '/report/:id',
    name: 'report',
    component: () => import('../views/Report.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/searchall',
    name: 'searchAll',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/searchbook',
    name: 'searchBook',
    component: () => import('../views/SearchBook.vue')
  },
  {
    path: '/searchdrama',
    name: 'searchDrama',
    component: () => import('../views/SearchDrama.vue')
  },
  {
    path: '/searchfeed',
    name: 'searchFeed',
    component: () => import('../views/SearchFeed.vue')
  },
  {
    path: '/searchgroup',
    name: 'searchGroup',
    component: () => import('../views/SearchGroup.vue')
  },
  {
    path: '/registersuccess',
    name: 'register success',
    component: () => import('../views/RegisterSuccess.vue'),
    meta: {
      requireSuccess: true,
    }
  },
  {
    path: '/resetpassword',
    name: 'reset password',
    component: () => import('../views/ResetPwd1n2.vue'),
    meta: {
      requireReset: true,
    }
  },
  {
    path: '/activatesuccess',
    name: 'activate account success',
    component: () => import('../views/Activated.vue'),
    meta: {
      requireSuccess: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// window.popStateDetected = false
// window.addEventListener('popstate', () => {
//   window.popStateDetected = true
// })

router.beforeEach((to, from, next) => {
  // 通过 Vuex 获取用户登录信息
  const userInfo = user.getters.getUser(user.state());

  // 若前往的是登录路由，则保存当前路由到 preRoute 的键值对中，以便登录成功后跳转 (Success和Reset则不保存)
  if (to.path === '/login' && !to.meta.requireSuccess || !to.meta.requireReset) {
    localStorage.setItem("preRoute", router.currentRoute.fullPath);
  }

  // 若用户未登录且访问的页面需要登录，则跳转至登录页面
  if (!userInfo && to.meta.requireAuth) {
    next({
      name: 'login',
    })
  }

  //If signed in cannot visit to login page and register/activate success page
  if (userInfo && userInfo.user.confirmed && (to.meta.requireNotAuth || to.meta.requireSuccess || to.meta.requireReset)) {
    next({
        name: 'home',
    })
  }
  
  // const IsItABackButton = window.popStateDetected
  // window.popStateDetected = false

  // if(to.path === '/empty' && IsItABackButton) {
  //   history.go(-1);
  // }



  next()
})


export default router
