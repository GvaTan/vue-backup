import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/buy', name: 'buy', components: {
        Buy: ()=>import('../components/Buy')
      }
    },
    {
      path: '/share', name: 'share', components: {
       Share: ()=>import('../components/Share')
      }
    }
  ]
})
