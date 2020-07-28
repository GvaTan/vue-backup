<template>
  <div id="login">
    <div class="login  layui-col-xs12 layui-col-md3 layui-col-lg3">
      <h3>用户注册</h3>
      <hr class="layui-bg-cyan">
      <form class="layui-form layui-col-xs12" action="" style="margin-left: -30px;margin-top: 0px">
        <div class="layui-form-item layui-col-xs12">
          <label class="layui-form-label">邮箱</label>
          <div class="layui-input-block">
            <input type="text" name="usermail" required  lay-verify="required" placeholder="邮箱务必真实，激活方可使用，用于找回密码" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item layui-col-xs12">
          <label class="layui-form-label">昵称</label>
          <div class="layui-input-block">
            <input type="text" name="username" required  lay-verify="required" placeholder="请输入昵称" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item layui-col-xs12">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input type="password" name="password" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item layui-col-xs12">
          <label class="layui-form-label">确认密码</label>
          <div class="layui-input-block">
            <input type="password" name="password1" required  lay-verify="required" placeholder="确认密码" autocomplete="off" class="layui-input">
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

        <button class="layui-btn" v-if="!isLogining" lay-submit lay-filter="formDemo" style="margin-left: 60px;margin-top: 20px">注册</button>
         <button v-if="isLogining" class="layui-btn layui-btn-disabled" style="margin-left: 60px;margin-top: 20px">请求中...</button>
        <button type="reset" class="layui-btn layui-btn-primary" style="margin-top: 20px">重置</button>
        <router-link style="float: right;margin-top: 30px;" :to="{path:'/user/login?from='+from}" tag="a" >已有账号？去登陆</router-link>
        <span style="position: absolute;bottom:45px;right: 0px;color:#ee1289">{{msg}}</span>
        <div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data(){
      return {
          isLogining:false,
          msg:"",
          from:'',
          codeUrl:''
      }
    },
    created() {
       this.codeUrl=this.$store.state.passportServiceUrl+'/user/forCode.action?r='+Math.random();
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
      changeCode(){
        this.codeUrl=this.$store.state.passportServiceUrl+'/user/forCode.action?r='+Math.random();
      },
      initForm(){
        layui.use('form', ()=>{
          var form = layui.form;

          //监听提交
          form.on('submit(formDemo)',(data)=>{
            // layer.msg(JSON.stringify(data.field));
             this.msg='';
                 this.isLogining=true;
                 console.log(data.field);
            $.ajax({
              url:'/api/user/register.action',
              type:"post",
              data:data.field,
              dataType:"json",
              success:(data)=>{
                  if(data.success){
                       console.log("跳转",this.$route.query);
                       layer.msg("登陆成功！正在跳转...");
                       if(this.$route.query.from){
                         console.log(this.$route.query.from);
                         window.location.href=this.$route.query.from;
                       }else{
                         window.location.href=this.$store.state.homeBasicUrl;
                       }
                     }else{
                       this.msg=data.msg;
                       console.log(data);
                     }
                     this.isLogining=false;
              },
              error:(res)=>{
                console.log(res);
              }
            });
            return false;
          });
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
    background: url("../../../static/images/bg2.jpg");
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
    margin-top:15px;
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
