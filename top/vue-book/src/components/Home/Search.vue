<template>
    <div id="search">
      <Login :show="user.login" @click="user.login=false"></Login>
      <Register :show="user.register" @click="user.register=false"></Register>
         <img style="margin-left: 330px" src="http://anets.cn/static/img/logo4.53d14cc.png" alt="" width="60px" height="60px">
          <div class="so">
             <div class="go">
                 <input style="color: black" @keydown.13="search()" type="text" v-model="keyword">
                 <input @click="search()" type="submit">
             </div>
             <div class="hot">
               <span>热搜:</span>
               <a href="">ps</a>
               <a href="">美女壁纸</a>
               <a href="">福利视频</a>
             </div>
          </div>
      <div class="user" v-if="userz.show" style="display: flex;flex-direction: row;align-items: center">
        <router-link to="/user"> <div  style="width:35px;height:35px;background:url('http://anets.cn/upload/wallpaper/thumbnail/821561905985875.jpg');background-size:cover;border-radius: 50%;border: 2px solid white"></div>
        </router-link><router-link to="/user"> <span style="margin-left: 10px"> {{userz.data.name}}</span></router-link>
      </div>
      <div class="user" @mouseover="user.show=true" v-if="userz.showLogin">
            <i class="iconfont icon-yonghu" style="font-size: 30px"></i>
            <div v-if="user.show" class="entry" @mouseleave="user.show=false">
                <ul>
                  <li><a href="javascript:void(0)" @click="user.register=true">注册</a></li>
                  <li><a href="javascript:void(0)" @click="user.login=true">登陆</a></li>
                </ul>
            </div>
      </div>
    </div>
</template>

<script>
  import  Register from  "./Register"
  import Login from "./Login"
    export default {
    components:{Register,Login},
        name: "Search",
      data(){
          return {
            user:{show:false,register:false,login:false},
            keyword:"",
            userz:{show:false,data:null,showLogin:false}
          }
      },
      computed:{
         userData:{
           get(){
             return this.$store.state.user;
           }
         }
      },
      watch:{
      userData:{
        handler(newval,oldval){
              if(newval!=null){
                this.userz.data=newval;
                this.userz.show=true;
                this.userz.showLogin=false;
              }else {
                this.userz.show=false;
                this.userz.showLogin=true;
              }
        },deep:true,immediate:true
      }
      },
      created(){
         this.setUserz();
      },
      methods:{
        search(){
          this.$emit("setKeyword",this.keyword);
        },
        setUserz(){

        }
      }
    }
</script>

<style scoped>
#search{
  width:1530px;
  height:120px;
  margin: auto;
  /*background-color: black;*/
  display: flex;
  flex-direction: row;
  padding: 30px 0px;
  position: relative;
}

#search .so{

  display: flex;
  flex-direction: column;
  width: 450px;
  height: 60px;
  /*background-color: purple;*/
  margin-left: 150px;
  display: flex;
  flex-direction: column;
}
#search .user{
  position: absolute;
  right: 0px;
  padding: 0px 10px;
  /*width:100px;*/
  height: 50px;
  /*background-color: deeppink;*/
}

#search .user i{
  color: rgba(255,255,255,0.6);
  transition: all 0.2s;
}
#search .user .entry{
  position: absolute;
  right: 0px;
  width: 100px;
  background-color: rgba(35,37,38,1);
  padding: 10px 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
  border-radius: 5px;
}
#search .user i:hover{
  color: rgba(255,255,255,1);
}
#search .so .go input[type="text"]{
  width:366px;
  border-left: 1px solid rgba(0,154,229,1) ;
  border-top: 1px solid rgba(0,154,229,1) ;
  border-bottom: 1px solid rgba(0,154,229,1) ;
  outline: none;
}
#search .so .hot{
  margin-top: 5px;
}

#search .so .go input[type="submit"]{
  width:80px;
  border: 0px;
  background-color:rgba(0,154,229,1) ;
}

#search .so .go{
  height: 30px;
  display: flex;
  flex-direction: row;
}
</style>
