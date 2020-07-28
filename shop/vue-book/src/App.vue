<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
      created() {
        this.initUser();
      },
      mounted(){
       
      },
      computed:{
        user:{
          get(){
            return this.$store.state.user;
          }
        }
      },
      watch:{
         user:{
           handler(newval,oldval){
              if(newval==true){
                 //当收到更新用户的信号时，更新用户
                 this.initUser();
              }
           }
         }
      },
      methods:{
          initUser(){
            //从本地取user。如果能，那么不用从服务端获取用户，只需要通过token获取session
             if( this.$cookie.get("token")||localStorage.getItem("token")){
               console.log("token",this.$cookie.get("token"));
               //通过token获取用户信息
               this.gainUserByToken(this.$cookie.get("token")||localStorage.getItem("token"));
             }else{
               this.$store.commit("setUser",false)
               console.log("cookie不存在");
               //需要登陆
             }
          },
        gainUserByToken(token){
            $.ajax({
              url:this.$store.state.passportServiceUrl+'/user/token/'+token+'.action',
              type:'GET',
              dataType:'jsonp',
              success:(data)=>{
                console.log(data);
                if(data.success){
                  this.$store.commit("setUser",data.data)
                  console.log(this.$store.state.user);
                  localStorage.setItem("token",token);
                }else{
                  console.log(data.msg);
                  //  this.$layer.msg(data.msg);
                   this.$store.commit("setUser",false)
                  localStorage.removeItem("token");
                }
              },
              error:(data)=>{
                console.log("失败",data);
                 this.$store.commit("setUser",false)
                 localStorage.removeItem("token");
              }
            });
        }
      }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #777;
}
</style>
