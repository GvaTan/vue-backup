import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:()=>import('@/components/Home'),
      meta:{
        title:"通行证系统"
      }
    },
    {
      path:'/user/login',
      component:()=>import('@/components/User/Login'),
      meta:{
        title:"Login System | Anets"
      }
    },
    {
      path:'/user/register',
      component:()=>import('@/components/User/Register'),
      meta:{
        title:"Register System | Anets"
      }
    },
    {
      path:'/user/forPassword',
      component:()=>import('@/components/User/ResetPassword'),
      meta:{
        title:"Reset password | Anets"
      }
    }
  ]
})
