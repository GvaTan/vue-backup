<template>
    <div id="login">
      <div class="login  layui-col-xs12 layui-col-md4 layui-col-lg3">
        <h3>用户登录</h3>
        <hr class="layui-bg-cyan">
        <form class="layui-form layui-col-xs12" action="" style="margin-left: -30px;margin-top: -10px">
          <div class="layui-form-item layui-col-xs12">
            <label class="layui-form-label">邮箱</label>
            <div class="layui-input-block">
              <input type="text" name="usermail" required  lay-verify="required" placeholder="请输入邮箱" autocomplete="off" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item layui-col-xs12" style="position: relative">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-block">
              <input type="password" name="password" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
          </div>

          <div class="layui-form-item layui-col-xs12" style="position: relative">
            <label @click="changeCode()" class="layui-form-label">验证码</label>
            <div class="layui-input-block" style="display:flex;flex-decration:row">
              <input style="width:50%;" type="text" name="code" required  lay-verify="required" placeholder="请输入验证码" autocomplete="off" class="layui-input">
               <div style="height:35px;width:30%;margin-left:20%;position:relative">
                 <iframe height="35px" width="100"  :src="codeUrl" frameborder="0"></iframe>
                 <span @click="changeCode()" style="position:absolute;width:100%;height:100%;z-index:999;background-color:transparent;top:0px;left:0px"></span>
               </div>
               
               <!-- <input  @click="sendCode()" type="button" style="width:30%;margin-left:20%" name="code" required  lay-verify="required" :value="btn.msg" autocomplete="off" class="layui-btn"> -->
                <!-- <input v-if="!btn.show" type="button" style="width:30%;margin-left:20%" name="code" required  lay-verify="required" :value="btn.msg+'('+btn.time+')s'" autocomplete="off" class="layui-btn layui-btn-disabled"> -->
            
             </div>
          </div>

            <button v-if="!isLogining" class="layui-btn" lay-submit lay-filter="formDemo" style="margin-left: 60px;margin-top: 20px">登陆</button>
          <button v-if="isLogining" class="layui-btn layui-btn-disabled" style="margin-left: 60px;margin-top: 20px">请求中...</button>
            <button type="reset" class="layui-btn layui-btn-primary" style="margin-top: 20px">重置</button>
          <router-link style="float: right;margin-top: 30px;" :to="{path:'/user/register?from='+from}" tag="a" >没有账号？去注册</router-link>
          <router-link style="float: right;margin-top: 30px;" :to="{path:'/user/forPassword?from='+this.$store.state.passportBasicUrl+'/user/login?from='+from}" tag="a" >忘记密码？</router-link>
          <!-- <span style="float: right;margin-top: 30px;opacity:0.3" @click="forgetPassword()">忘记密码</span> -->
          <span style="position: absolute;bottom:45px;right: 0px;color:#ee1289">{{msg}}</span>


         <div>
         </div>
        </form>
      </div>
    </div>
</template>

<script>
import {postLogin} from '../Api/index'
    export default {
        name: "Login",
      data(){
          return {
             msg:'',
             isLogining:false,
             from:'',
             codeUrl:''
          }
      },
      created() {
        // alert(this.$route.query.from)
         if(this.$route.query.from){
           this.from=this.$route.query.from;
         }else{
           this.from=this.$store.state.homeBasicUrl;
         }
         this.codeUrl=this.$store.state.passportServiceUrl+'/user/forCode.action?r='+Math.random();
      },
      mounted(){
          this.initForm();
      },
      methods:{
            async initForm(){
             layui.use('form', ()=>{
               var form = layui.form;

               //监听提交
               form.on('submit(formDemo)',  (data)=>{
                
                 this.msg='';
                 this.isLogining=true;
                 console.log(data.field);
                 
                this.login(data.field);
                    
               
                 return false;
               });
             });
           },
           forgetPassword(){
             alert("抱歉,暂不支持自动找回，请联系qq1632414557找回");
           },
           changeCode(){
              this.codeUrl=this.$store.state.passportServiceUrl+'/user/forCode.action?r='+Math.random();
           },
           async login(data){
                  let {data:res} = await postLogin(data);
                 if(res.success){
                       console.log("跳转",this.$route.query);
                       layer.msg("登陆成功！正在跳转...");
                       if(this.$route.query.from){
                         console.log(this.$route.query.from);
                          this.isLogining=false;
                            window.location.href=this.$route.query.from;
                       }else{
                         window.location.href=this.$store.state.homeBasicUrl;
                         this.isLogining=false;
                         
                       }
                  }else{
                    this.msg=res.msg;
                    console.log(res);
                     this.isLogining=false;
                     
                  }
                  return false;
           }
      }
    }
</script>

<style scoped>
#login{
  position: fixed;
  width:100%;
  height:100%;
  background: url("../../../static/images/bg3.jpg");
}
  .login{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.9);
    box-shadow: 0px 0px 5px 0px rgba(255,255,255,0.1);
    border-radius: 5px;
    padding: 20px 20px;
    color: white;
    padding-bottom: 30px;
  }

  .layui-form-item{
    margin-top: 30px;
  }


h3{
  border-left: 5px solid #ee1289;
  padding-left: 10px;
  font-size: 16px;
}
a{
  color: rgba(255,255,255,0.5)
}
  a:hover{
    color: white;
  }
</style>
