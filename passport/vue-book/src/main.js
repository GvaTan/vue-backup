// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

Vue.config.productionTip = false

import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
Vue.use(Vuex);


//状态盒
const state={
  // passportBasicUrl:'http://localhost:8090',
  // passportServiceUrl:'http://localhost:8086',
  // homeBasicUrl:'http://anets.top'
    passportBasicUrl:'http://passport.anets.top',
  passportServiceUrl:'http://passport.anets.top:8086',
  homeBasicUrl:'http://anets.top'
};
//突变
const mutations={
  
};

let store=new Vuex.Store({
  state:state,
  strict:true,//只能通过mutation更改状态
  mutations:mutations,
  plugins:[logger()]
});


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
