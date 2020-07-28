<template>
    <div id="login">
      <div class="login  layui-col-xs12 layui-col-md4 layui-col-lg3">
        <h3>重置密码</h3>
        <hr class="layui-bg-cyan">
        <form class="layui-form layui-col-xs12" id="addForm" action="" style="margin-left: -30px;margin-top: -10px">
          <div class="layui-form-item layui-col-xs12">
            <label class="layui-form-label">邮箱</label>
            <div class="layui-input-block">
              <input type="text" v-model="codeData.usermail" name="usermail" required  lay-verify="required" placeholder="请输入邮箱" autocomplete="off" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item layui-col-xs12" style="position: relative">
            <label class="layui-form-label">验证码</label>
            <div class="layui-input-block" style="display:flex;flex-decration:row">
              <input style="width:50%;" type="text" name="code" required  lay-verify="required" placeholder="请输入验证码" autocomplete="off" class="layui-input">
               <input  v-if="btn.show" @click="sendCode()" type="button" style="width:30%;margin-left:20%" name="code" required  lay-verify="required" :value="btn.msg" autocomplete="off" class="layui-btn">
                <input v-if="!btn.show" type="button" style="width:30%;margin-left:20%" name="code" required  lay-verify="required" :value="btn.msg+'('+btn.time+')s'" autocomplete="off" class="layui-btn layui-btn-disabled">
            
             </div>
          </div>
          <div class="layui-form-item layui-col-xs12" style="position: relative">
            <label class="layui-form-label">新密码</label>
            <div class="layui-input-block">
              <input type="password" name="password" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
             <span style="position: absolute;bottom:45px;right: 0px;color:#ee1289">{{codemsg}}</span>
          </div>
          <div class="layui-form-item layui-col-xs12" style="position: relative">
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-block">
              <input type="password" name="password1" required  lay-verify="required" placeholder="请确认密码" autocomplete="off" class="layui-input">
            </div>
          </div>
            <button v-if="!isLogining" class="layui-btn" lay-submit lay-filter="formDemo" style="margin-left: 60px;margin-top: 20px">确认更改</button>
          <button v-if="isLogining" class="layui-btn layui-btn-disabled" style="margin-left: 60px;margin-top: 20px">请求中...</button>
            <button type="reset" class="layui-btn layui-btn-primary" style="margin-top: 20px">重置</button>
         <router-link style="float: right;margin-top: 30px;" :to="{path:'/user/login?from='+this.$store.state.homeBasicUrl}" tag="a" >登陆</router-link>
         <span style="float: right;margin-top: 30px;opacity:0.3">&nbsp;|&nbsp;</span>       
          <router-link style="float: right;margin-top: 30px;" :to="{path:'/user/register?from='+this.$store.state.homeBasicUrl}" tag="a" >注册</router-link>
          
          <!-- <span style="float: right;margin-top: 30px;opacity:0.3" @click="forgetPassword()">忘记密码</span> -->
          <span style="position: absolute;bottom:45px;right: 0px;color:#ee1289">{{msg}}</span>


         <div>
         </div>
        </form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return {
             msg:'',
             codemsg:"",
             isLogining:false,
             from:'',
             btn:{
                 show:true,
                 time:null,
                 msg:"发送"
             },
             codeData:{
                usermail:null
             }
          }
      },
      created() {
         if(this.$route.query.from){
           this.from=this.$route.query.from;
         }else{
          this.from=this.$store.state.homeBasicUrl;
         }
      },
      mounted(){
          this.initForm();
      },
      methods:{
           initForm(){
             layui.use('form', ()=>{
               var form = layui.form;

               //监听提交
               form.on('submit(formDemo)', (data)=>{
                 this.msg='';
                 this.isLogining=true;
                //  console.log(data.field);
                  var dataForm = $("#addForm").serialize();     
                 $.ajax({
                   url:'/api/user/resetPassword.action',
                   data:dataForm,
                   type:'post',
                   dataType:'json',
                   success:(data)=>{
                     if(data.success){
                       console.log("跳转",this.$route.query);
                       layer.msg("登陆成功！正在跳转...");
                       if(this.$route.query.from){

                         console.log(this.$route.query.from);
                         window.location.href=this.$route.query.from;
                       }else{
                         window.location.href=this.$store.state.passportBasicUrl+'/user/login';
                       }
                     }else{
                       this.msg=data.msg;
                       console.log(data);
                     }
                     this.isLogining=false;
                   },
                   error:(res)=>{
                       alert("网络错误！请刷新重试");
                     console.log(res);
                   }

                 });
                 return false;
               });
             });
           },
           forgetPassword(){
             alert("抱歉,暂不支持自动找回，请联系qq1632414557找回");
           },
           sendCode(){
               if(!this.codeData.usermail){
                   this.codemsg="请输入接受验证码的邮箱";
                   return;
               }else{
                    this.codemsg="";
               }
               this.codemsg="验证码正在发送...";
               this.btn.msg="已发送"
                this.btn.show=false;
               this.btn.time=60;
               let a = setInterval(()=>{
                   if(this.btn.time==0){
                       this.btn.show=true;
                       clearInterval(a);
                       this.btn.msg="发送"
                        this.codemsg="";
                   }else{
                       this.btn.time--;
                   }
               },1000);
               
               $.ajax({
                   url:'/api/user/sendCode.action',
                   data:this.codeData,
                   type:'post',
                   dataType:'json',
                   success:(data)=>{
                     if(data.success){
                       console.log("跳转",this.$route.query);
                       layer.msg("如未收到邮件，请进入垃圾邮件查看下🙂");
                       this.codemsg=data.msg;
                       
                     }else{
                       this.codemsg=data.msg;
                       console.log(data);
                     }
                   },
                   error:(res)=>{
                     console.log(res);
                   }

                 });
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
