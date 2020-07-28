<template>
  <div v-if="show" id="register">
    <div class="content">
      <i @click="triggerFather()" class="iconfont icon-guanbi" style="position: absolute;font-size20px;right:-20px;top:-30px"></i>
      <h3 style="margin-bottom: 30px;color: rgba(244,90,141,1)">用户登录</h3>
      <form class="form-horizontal" role="form">
        <div class="form-group">
          <label for="firstname" class="col-sm-3 control-label">邮箱</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="user.usermail" id="firstname" placeholder="">
          </div>
        </div>
        <div class="form-group">
          <label for="lastname" class="col-sm-3 control-label">密码</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="user.password" id="lastname" placeholder="">
          </div>
        </div>


        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <input type="button" @click="toLogin()" class="btn btn-default" value="登陆">
            <span @click="triggerFather1()" style="cursor:default;float: right;margin-top: 5px">注册</span>
          </div>
        </div>
      </form>
    </div>
    <Tip :show="tip.show" :msg="tip.msg" ></Tip>
  </div>

</template>

<script>
  import {login} from "../../api/User"
  import Tip from "../Tool/Tip"
    export default {
    components:{Tip},
        name: "Login",
      props:['show'],
      data(){
          return {
             user:{usermail: '',password:''},
             tip:{show:false,msg:''}
          }
      },
      created(){
          login("admin@qq.com","2011199033tyb");
      },
      methods:{
        triggerFather(){
          this.$emit('click');
        },
        triggerFather1(){
          this.$emit('register');
        },
        async toLogin(){
          console.log(this.user.usermail);
          this.tip.msg="正在登录...";
          this.tip.show=true;

          let {data} = await login(this.user.usermail,this.user.password);
          if(data.state=='success'){
            this.tip.msg="登录成功！";
            this.tip.show=true;
            this.$store.commit("setUser",data.user);
            let a=setTimeout(()=>{this.tip.show=false;clearTimeout(a)},3000);

            this.$router.push('/user');
            localStorage.setItem("user",JSON.stringify(data.user));
          }else{
            this.tip.msg=data.msg;
            this.tip.show=true;
            let a=setTimeout(()=>{this.tip.show=false;clearTimeout(a)},3000);
          }
        }
      }
    }
</script>

<style scoped>
  #register{
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    top:0px;
    left:0px;
    background-color: rgba(0,0,0,0.5);
  }

  .content{
    position: absolute;
    /*width:500px;*/
    padding-top: 10px;
    padding-bottom: 50px;
    padding-left: 50px;
    padding-right: 80px;
    display: flex;
    flex-direction:column;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: black;
    border-radius: 5px;
    box-shadow: 0px 0px 2px rgba(255,255,255,0.3);
  }


</style>
