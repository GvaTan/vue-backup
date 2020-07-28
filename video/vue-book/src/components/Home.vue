<template>
  <div id="home" class="" >
     <Nav></Nav> 
     <div class="container col-12 col-md-8" style="margin-top:50px">
        <!-- <Lunbo></Lunbo> -->
        <div class="so container col-12 col-md-5" style="position:relative">
           <input placeholder="片库" style="width:100%"  v-model="key" type="text"  @keydown.enter="toSearch(key)">
           <i @click="toSearch(key)" style="color:white;position:absolute;right:20px;top:2px" class=" layui-icon layui-icon-search"></i>
        </div>
       
     </div>
     <div class="container col-12 col-md-8" style="margin-top:50px">
        <List></List>
     </div>
  
  </div>
</template>

<script>

import Nav from './Home/Nav'
import Lunbo from './Home/Lunbo'
import List from './Home/List'
export default {
  name: 'Home',
  components:{Nav,Lunbo,List},
  data(){
    return {
       key:""

    }
  },
  computed:{
    user:{
      get(){
         return this.$store.state.user;
      }
    }
  },
  created(){

  },
  mounted(){
   
  },
  watch:{
   
  },
  methods:{
       toSearch(key){
         if(key==''){
             this.$layer.msg("关键字不能为空！😀");
         }else{
           this.$router.push({path:'/search',query:{'keyword':key}})
         }
       }
  }
  
}
</script>

<style scoped>
#home{
    /* background:inherit */
    transition: all 0.5s;
}
.so {
}

.so input{
  outline: none;
  background-color: rgba(0, 0, 0, 0.8);
  border :0px solid rgba(255, 255, 255, 0.1);
  
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
  padding-right: 30px;
  color: white;
  border-left :5px solid rgba(6,47,74,1);
}

.so input:hover{

}

</style>
