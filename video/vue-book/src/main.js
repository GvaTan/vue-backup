// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';


import VueCookie from 'vue-cookie'
Vue.use(VueCookie)   // 挂在在全局了

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
 
Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false


import logger from 'vuex/dist/logger'
import Vuex from 'vuex'
Vue.use(Vuex);
// 状态盒
const state = {
  // 本地
  // randomBasicWallpaperUrl:"http://localhost:8082/wallpaper.action?offset=",
  // passportBasicUrl:'http://localhost:8090',
  // searchBasicUrl:'http://localhost:8081',
  // searchServiceUrl:"http://localhost:8082",
  // passportServiceUrl:'http://localhost:8086',
  // shopBasicUrl:'http://localhost:8080',
  // homeBasicUrl:'http://anets.top',
  // 在线
    randomBasicWallpaperUrl:"http://anets.top:8082/wallpaper.action?offset=",
  passportBasicUrl:'http://passport.anets.top',
  searchBasicUrl:'http://anets.top',
  searchServiceUrl:"http://anets.top:8082",
  passportServiceUrl:'http://passport.anets.top:8086',
  shopBasicUrl:'http://shop.anets.top',
  homeBasicUrl:'http://anets.top',
  user:false,
  color:{
      font:"",
      bg:""
  },
  fontSize:{
    associate:0
  },
  historyView:[]
  
  
}
//突变
const mutations={
  setUser(state,user){
    state.user=user
  },
  setColor(state,color){
    state.color=color
  },
  setFontSize(state,fontSize){
    state.fontSize=fontSize
  },
  setHistoryView(state,historyView){
    state.historyView=historyView
  }
}
let store =new Vuex.Store({
  state:state,
  strict:true,
  mutations:mutations
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store
})



router.beforeEach((to,from,next)=>{
  if(to.meta.title){
     document.title=to.meta.title||"首页"
  }
  next()

})