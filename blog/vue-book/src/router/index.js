import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    { 
      path: '/',
      component: ()=>import("../components/Home"),
      meta:{title:'Home | anets'},
    },
    { 
      path: '/timeArchiving',
      component: ()=>import("../components/Home/TimeArchiving"),
      meta:{title:'TimeArchiving | anets'},
    },
    { 
      path: '/classifyArchiving',
      component: ()=>import("../components/Home/ClassifyArchiving"),
      meta:{title:'TimeArchiving | anets'},
    },
    { 
      path: '/us',
      component: ()=>import("../components/Home/Us"),
      meta:{title:'Us | anets'},
    },
    { 
      path: '/detail/:c.html',
      component: ()=>import("../components/Detail"),
      meta:{title:'Detail | anets'},
    },
    { 
      path: '/user',
      component: ()=>import("../components/User"),
      meta:{title:'User | anets'},
      children:[
        { 
          path: 'info',
          component: ()=>import("../components/User/Info"),
          meta:{title:'user info | anets'}
        },
        { 
          path: 'up',
          component: ()=>import("../components/User/Up"),
          meta:{title:'upload | anets'}
        },
        { 
          path: 'release',
          component: ()=>import("../components/User/Release"),
          meta:{title:'release | anets'}
        },
        { 
          path: 'modify',
          component: ()=>import("../components/User/Modify"),
          meta:{title:'release | anets'}
        }
      ]
    },
    { 
      path: '/user/login',
      component: ()=>import("../components/User/Login"),
      meta:{title:'Login | anets'},
    },
    { 
      path: '/user/register',
      component: ()=>import("../components/User/Register"),
      meta:{title:'Register | anets'},
    }
    
    
  ]
})


