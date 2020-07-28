import Vue from 'vue'
import Router from 'vue-router'
import Up from '@/components/User/Up'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component:()=>import('@/components/Home')
    },
    {
      name:"detail",
      path: '/list/:c.html',
      component:()=>import('@/components/Detail')
    },
    {
      name:"user",
      path: '/user',
      component:()=>import('@/components/User'),
      children:[
        {
           path:"info",
          component:()=>import('@/components/User/Info')
        },
        {
          path:"upload",
          component:Up
        },
        {
          path:"order",
          component:()=>import('@/components/User/Order')
        },
        {
          path:"release",
          component:()=>import('@/components/User/Release')
        },
        {
          path:"update",
          component:()=>import('@/components/User/Update')
        }
      ]
    },
    {
      path: '/user/login',
      component:()=>import('@/components/Login')
    },
    {
      path: '/user/register',
      component:()=>import('@/components/Register')
    }
  ]
})
