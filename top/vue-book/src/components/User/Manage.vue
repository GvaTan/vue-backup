<template>
    <div>
       <div class="top"></div>
       <div class="topz">
         <div style="width: 1000px;margin: auto">
           <div class="left">
             <div  style="width:64px;height:64px;background:url('http://anets.cn/upload/wallpaper/thumbnail/821561905985875.jpg');background-size:cover;border-radius: 50%;border: 2px solid white"></div>
              <div style="margin-left: 30px">
                 <h2>{{user.name}}</h2>
                 <p>{{user.saying}}</p>
              </div>
             <div class="right">
               <a href="">主网</a> | <a href="">主站</a> | <a href="">退出</a>
             </div>
           </div>

         </div>
       </div>
      <div class="bottom">
         <div class="left">
           <ul>
             <li><router-link to="/user/account">账户管理</router-link></li>
             <h5 style="cursor: default;">投稿管理</h5>
             <ul style="margin-left: 15px">
               <li><router-link to="/user/wallpaper">桌面壁纸投稿</router-link></li>
               <li><router-link to="/user/soft">软件工具投稿</router-link></li>
               <li><router-link to="/user/resource">资源种子投稿</router-link></li>
               <li><router-link to="/user/study">学习教程投稿</router-link></li>
               <li><router-link to="/user/article">我的博客文章</router-link></li>
             </ul>
           </ul>
         </div>
        <div class="right">
          <router-view name="user"/>
        </div>
      </div>
      <Tip :show="tip.show" :msg="tip.msg" ></Tip>
    </div>
</template>

<script>
  import Tip from "../Tool/Tip"
  import {login} from "../../api/User";

  export default {
     components:{Tip},
      name: "Manage",
      data(){
       return {
         tip:{show:false,msg:""},
         user:{id:1,name:"",usermail:"",head:"",coin:0,acoin:0,saying:""}
       }
      },
      computed:{
          userz:{
            get(){
              return this.$store.state.user;
            }
          }
      },watch:{
        userz:{
          handler(newval,oldval){
            if(newval!=null){
               // alert(1);
               this.user=newval;
            }
          },immediate:true,
        }
      },created(){
        if(this.userz==null){
           this.initUser();
           console.log("完成");
        }
      },methods:{
        async initUser(){
          if(localStorage.getItem("user")!=null){
            let user=JSON.parse(localStorage.getItem("user"));
            // alert(user.name);
            //获得session
            console.log("获得session中");

            this.$store.commit("setUser",user);
            let {data}=await  login(user.usermail,user.password);
            if(data.state=="success"){
              this.tip.msg="成功获取会话";
              this.tip.show=true;
              let  a = setTimeout(()=>{this.tip.show=false;clearTimeout(a)},3000);
              this.$store.commit("setUser",data.user);
              localStorage.setItem("user",JSON.stringify(data.user));
              console.log("完成获得session");
            }else{//自动登录失败，切换到手动登陆
              this.tip.msg="获取session失败！请重新登陆！";
              this.tip.show=true;
              localStorage.removeItem("user");
              this.$store.commit("setUser",null);
              this.$router.push("/");
            }
          }else{
            this.$router.push("/");
          }
        }
      }
    }
</script>

<style scoped>
.top{
  width:100%;
  height:200px;
  background: url("http://anets.cn/upload/wallpaper/dist/821561906034932.jpg") no-repeat 0 -450px;;
  background-size: cover;
  /*filter: blur(10px);*/
}
  .topz{
    position: absolute;
    top:0px;
    width:100%;
    height:200px;
    background-color: rgba(0,0,0,0.5);
  }

 .topz .left{

    margin-top: 60px;
    /*background-color: deeppink;*/
   display: flex;
   flex-direction: row;
   text-align: left;
   position: relative;
  }
.topz .right{
  width: 300px;
  height: 20px;
  margin-top: 20px;
  /*background-color: black;*/
  position: absolute;
  text-align: right;
  right:0px;
}
.topz .left h2{
  margin-top: -1px;
}

  .bottom{
    width: 1000px;
    /*height: 300px;*/
    margin: auto;
    margin-top: 20px;
    /*background-color: deeppink;*/
    display: flex;
    flex-direction: row;
  }

.bottom .left{
  text-align:left;
  width: 200px;
  height: 300px;
  padding: 10px 30px;
  border: 1px solid rgba(244,90,141,0.4);
  border-radius: 5px;
  box-shadow: -4px 4px 10px rgba(0,0,0,0.5);
}
.bottom .left ul li{
  cursor: default;
  margin-top: 10px;
  transition: all 0.3s;
}

.bottom  .right{
  width: 770px;
  /*height: 400px;*/
  margin-left: 30px;
  /*background-color: deeppink;*/
}
.bottom .left ul li:hover{
 color: rgba(244,90,141,1);
}
</style>
