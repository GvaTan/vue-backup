<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import  {login} from  "./api/User"
export default {
  name: 'App',
  created() {
    this.initUser();
  },
  methods:{
    async initUser(){
      if(localStorage.getItem("user")!=null){
        let user=JSON.parse(localStorage.getItem("user"));
        // alert(user.name);
        //获得session
        console.log("获得session中");

        this.$store.commit("setUser",user);
        let {data}=await  login(user.usermail,user.password);
        if(data.state=="success"){
          // this.tip.msg="成功获取会话";
          // this.tip.show=true;
          // let  a = setTimeout(()=>{this.tip.show=false;clearTimeout(a)},3000);
          this.$store.commit("setUser",data.user);
          localStorage.setItem("user",JSON.stringify(data.user));
          console.log("完成获得session");
        }else{//自动登录失败，切换到手动登陆
          // this.tip.msg="获取session失败！请重新登陆！";
          // this.tip.show=true;
          localStorage.removeItem("user");
          this.$store.commit("setUser",null);
          // this.$router.push("/");
        }

      }else{
        // this.$store.commit("setUser",null);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 微软雅黑, "microsoft yahei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 0px;
  width: 100%;
  position: absolute;

}

 a{

   color: white;
   transition: all 0.2s;
 }
  a:link{
    color: white;
  }


  a:visited{
    color: rgba(0,161,264,1);
  }

a:hover{
  color: rgba(244,90,141,1);
}


  ul{
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
</style>
