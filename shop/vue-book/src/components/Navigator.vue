<template>
    <div style="position:relative">
      <ul class="layui-nav" lay-filter="">
        <li class="layui-nav-item"><a href="http://anets.top">首页</a></li>
        <li class="layui-nav-item layui-this"><a href="">全部资源</a></li>
       <!-- 
        <li class="layui-nav-item"><a href="">Asmr</a></li>
        <li class="layui-nav-item">
          <a href="javascript:;">解决方案</a>
          <dl class="layui-nav-child">  二级菜单 
            <dd><a href="">移动模块</a></dd>
            <dd><a href="">后台模版</a></dd>
            <dd><a href="">电商平台</a></dd>
          </dl>
        </li>
        <li class="layui-nav-item"><a href="">社区</a></li>-->
      </ul>

      <div class="user" style="float:right;position: absolute;right:0px;top:0px;z-index: 999;color:white">
        <p v-if="user==false" style="line-height: 60px;padding-right:10px;"><a :href="this.$store.state.passportBasicUrl+'/user/login?from='+this.$store.state.shopBasicUrl">登录</a> | <a :href="this.$store.state.passportBasicUrl+'/user/register?from='+this.$store.state.shopBasicUrl">注册</a></p>
        <div class="head" v-if="user&&user.uid" style="position:relative">
              <i>  <router-link to="/user/info"> {{user.username|fname}}</router-link>
              <ul style="position:absolute;left:0px;top:50px;">
                 <li @click="logout()">登出</li>
               </ul>
             </i>
            <router-link to="/user/info"> <span>{{user.username}}</span></router-link>
            
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Navigator",
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
      },
      created() {
        
        layui.use('element', function(){
          var element = layui.element;
        });
      },
      filters:{
        fname(val){
           return val.substring(0,1).toUpperCase();
        }
      },
      methods:{ 
         logout(){
           //删除本地存储的cookie
           localStorage.removeItem("token");
           //user置为false
           this.$store.commit('setUser',false);
           //请求云端删除cookie和user信息
           $.ajax({
             url:this.$store.state.passportServiceUrl+"/user/logout.action",
             type:"get",
             data:null,
             dataType:"jsonp",
             success:(data)=>{
                 if(data.success){
                    this.$layer.msg(data.msg);
                 }else{
                     this.$layer.msg(data.msg);
                 }
             },
             error:(res)=>{
                  this.$layer.msg("登出错误");
                  console.log(res);
             }
           });
         }
      }
    }
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
  .user a{
    color:white;
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
  background-color: #ee1289;
  display: inline-block;
  border-radius: 50%;
  margin-top:10px;
  font-size: 20px;
  font-style: normal;
  
  
}

.user i:hover{
   background-color: white;
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
