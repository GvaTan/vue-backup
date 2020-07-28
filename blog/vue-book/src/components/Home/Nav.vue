<template>
  <div id="nav" >
         <div style="position:relative">
             <ul class="layui-nav" lay-filter="" style="background-color:#FFFFFF;margin-right:px">
                <li class="layui-nav-item"><router-link to="/">首页</router-link></li>
               
                <li class="layui-nav-item"><router-link to="/timeArchiving">时间归档</router-link></li>
                <!-- <li class="layui-nav-item">
                    <a href="javascript:;">解决方案</a>
                    <dl class="layui-nav-child"> <!-- 二级菜单 -->
                    <!-- <dd><a href="">移动模块</a></dd>
                    <dd><a href="">后台模版</a></dd>
                    <dd><a href="">电商平台</a></dd>
                    </dl> -->
                <!-- </li> --> 
                <li class="layui-nav-item"><router-link to="/classifyArchiving">分类归档</router-link></li>
                <li class="layui-nav-item "><router-link to="/us">关于我们</router-link></li>
                 <li class="layui-nav-item"><a href="http://anets.top">导航</a></li>
             </ul>
             <div class="user" style="float:right;position: absolute;right:0px;top:0px;z-index: 999;color:white">
                <p v-if="user==false" style="line-height: 60px;padding-right:10px;color:#777"><a href="/user/login">登录</a> | <a href="/user/register">注册</a></p>
                <div class="head" v-if="user&&user.userName" style="position:relative">
                    <i style="line-height:32px"> 
                       <router-link to="/user/info"> {{user.userName|fname}}</router-link>
                    <ul style="position:absolute;left:0px;top:50px;">
                        <li @click="logout()">登出</li>
                    </ul>
                    </i>
                    <router-link to="/user/info"> <span>{{user.userName}}</span></router-link>
                    
                </div>
            </div>
         </div>
  </div>
</template>

<script>
import {killSession} from '../../api/index'
export default {
  name: '',
  data(){
      return {

      }
  },
    computed:{
        user:{
            get(){
                return this.$store.state.user;
            }
        }
    }
  ,
  filters:{
    fname(val){
       return val.substring(0,1);
    }
  },
  mounted(){

       console.log(this.user);
      //注意：导航 依赖 element 模块，否则无法进行功能性操作
        layui.use('element', function(){
        var element = layui.element;
        
        //…
        });
  },
  methods:{
    async logout(){
        let {data:res}=await killSession();
        this.$layer.msg(res.msg);
        this.$store.commit("setUser",false);
    }
  }
}
</script>

<style scoped>
ul li a{
    text-decoration: none;
    color:#777 !important;
}

#nav{
    /* background-color:black; */
    /* height:200px; */
}


 .user a{
    /* color:white; */
  }
.user a:hover{
  color:#ee1289;

}
.user{
  /* background-color: #ee1289; */
  height: 60px;
  line-height: 60px;
}
.user i{
  text-align: center;
  justify-content: center;
  width:40px;
  height:40px;
  line-height:40px;
  background-color: #01aaed;
  display: inline-block;
  border-radius: 50%;
  margin-top:10px;
  font-size: 20px;
  font-style: normal;
  
  
  
}

.user i:hover{
   background-color: white;
}
.user i a{
   color:  white;
}
.user i:hover a{
   color: #ee1289;
}

.user span{
  margin-left:10px;
  margin-right:20px;
  margin-top:0px;
   height: 60px;
  line-height: 60px;
  
}
.user .head{
  display:flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
  /* background-color: #ee1289; */
}
.user .head i:hover ul{
   display: block;
}

.user .head ul{
  margin-left: -30px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  background-color: rgba(0,0,0,0.8);
  display: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: default;
}

.user .head ul li{
  
  height: 20px;
  width: 100px;
  line-height: 10px;
  padding: 5px 10px;
}

.user .head ul li:hover{
  background-color: rgba(255,255,255,0.1);
}
</style>
