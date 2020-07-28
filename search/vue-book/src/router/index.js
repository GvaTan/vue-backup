import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    { 
      path: '/',
      component: ()=>import("../components/Home")
    },
    { 
      path: '/share',
      component: ()=>import("../components/Share.vue"),
      meta:{title:'Share | anets'},
      children:[
        { 
          path: 'upUrl',
          component: ()=>import("../components/Share/UpUrl"),
          meta:{title:'share your link | anets'}
        },
        { 
          path: 'detail',
          component: ()=>import("../components/Share/Detail"),
          meta:{title:'url detail | anets'}
        },
        { 
          path: 'rank',
          component: ()=>import("../components/Share/Rank"),
          meta:{title:'url rank | anets'}
        },
        { 
          path: 'update',
          component: ()=>import("../components/Share/Update"),
          meta:{title:'url update | anets'}
        }
      ]
    }
    
    
    
  ]
})


