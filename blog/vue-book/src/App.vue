<template>
  <div id="app" :style="{'':''}">
    <router-view/>
  </div>
</template>

<script>
import {getSession} from './api/index'
export default {
  name: 'yyyy',
  data(){
    return {
      //白黑搭配(推荐默认)
      
    }
  },
  computed:{
   
  },
  created(){
    this.gainSession();
   
  },
  mounted(){
    
  },
  methods:{
    async gainSession(){
         let {data:res} = await getSession();
        //  this.$layer.msg(res.msg);
         if(res.success){
            // 登陆成功
            this.$store.commit("setUser",res.data);
         }else{
           
         }
    }
   
   
      
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   background:inherit;
   transition: all 0.5s;
}




</style>
