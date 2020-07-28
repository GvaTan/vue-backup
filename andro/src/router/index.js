import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '../components/Home'
import Teacher from '../components/Teacher'
import Buy from '../components/Buy'

export default new Router({
  routes: [
    {path: '/',name: 'home',components: {
        home:Home
      }},
    {path: '/teacher',name: 'teacher',components: {
        teacher:Teacher
      }},
    {path: '/buy',name: 'buy',components: {
        buy:Buy
      }}

  ]
})
