// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//  import $ from 'jquery'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
Vue.use(Vuex);

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)   // 挂在在全局了
Vue.config.productionTip = false

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
 
Vue.prototype.$layer = layer(Vue);

//状态盒
const state={
  user:null,
  // passportBasicUrl:'http://localhost:8090',
  // passportServiceUrl:'http://localhost:8086',
  // shopBasicUrl:'http://localhost:8080',
  // shopServiceUrl:'http://localhost:8085'
    passportBasicUrl:'http://passport.anets.top',
  passportServiceUrl:'http://passport.anets.top:8086',
  shopBasicUrl:'http://shop.anets.top',
  shopServiceUrl:'http://shop.anets.top:8085'
};
//突变
const mutations={
  setUser(state,user){//state是自动放入的，默认指的就是当前的state
    state.user=user;
  }
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
