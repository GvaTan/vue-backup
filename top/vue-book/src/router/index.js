import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import  Wallpaper from '../components/Home/Wallpaper'
import  Soft from '../components/Home/Soft'
import  SoftDetail from "../components/Home/SoftDetail"
import  WallpaperDetail from  "../components/Home/WallpaperDetail"
import  Manage from "../components/User/Manage"
import  Account from "../components/User/Account"
import  UpSoft from  "../components/User/UpSoft"
import  UpWallpaper from  "../components/User/UpWallpaper"
import  UpResource from "../components/User/UpResource"
import  UpStudy from  "../components/User/UpStudy"
import  UpArticle  from  "../components/User/UpArticle"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home
    },
    {
      path: '/wallpaper',
      name: 'Wallpaper',
      component:Wallpaper
    },
    {
      path: '/wallpaper/detail',
      name: 'WallpaperDetail',
      component:WallpaperDetail
    },
    {
      path: '/wallpaper/detail',
      name: 'toWallpaper',
      component:WallpaperDetail
    },
    {
      path: '/soft',
      name: 'Soft',
      component:Soft
    },
    {
      path: '/soft/detail',
      name: 'toSoft',
      component:SoftDetail
    },
    {
      path: '/user',
      name: 'home',
      component:Manage,
      children:[
        {path:'account',name:"user",components:{
            user:Account
          }
        },
        {path:'soft',name:"user",components:{
            user:UpSoft
          }
        },
        {path:'wallpaper',name:"user",components:{
            user:UpWallpaper
          }
        },
        {path:'resource',name:"user",components:{
            user:UpResource
          }
        },
        {path:'study',name:"user",components:{
            user:UpStudy
          }
        },
        {path:'article',name:"user",components:{
            user:UpArticle
          }
        }
      ]

    }
  ]
})
