// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import logger from 'vuex/dist/logger'
import Vuex from 'vuex'
Vue.use(Vuex);
import App from './App'
import router from './router'
import $ from 'jquery'
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
Vue.config.productionTip = false
const state={
  user:null
};

const mutations={
  setUser(state,user){
    this.state.user=user;
  }
};
let store = new Vuex.Store({
  state:state,
  strict:true,
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
