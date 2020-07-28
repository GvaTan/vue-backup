<template>
  <div class="bg">
    <div class="panel">
      <h3>用户注册</h3>
      <hr class="layui-bg-gray">
      <div>
        <form class="layui-form" action="">
          <div class="layui-form-item">
            <label class="layui-form-label">邮箱</label>
            <div class="layui-input-block">
              <input type="text" name="title" required  lay-verify="required" placeholder="请输入邮箱" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">请务必真实，便于找回密码</div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">昵称</label>
            <div class="layui-input-block">
              <input type="text" name="title" required  lay-verify="required" placeholder="请输入昵称" autocomplete="off" class="layui-input">
            </div>
<!--            <div class="layui-form-mid layui-word-aux"></div>-->
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">密码框</label>
            <div class="layui-input-inline">
              <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>

          </div>
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button class="layui-btn" lay-submit lay-filter="formDemo">注册</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
      </div>
      <router-link style="float: right" to="/user/login" tag="a">已有账号？去登录</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Register",
      data(){
        return {

        }
      },
      created() {
        //Demo
        layui.use('form', function(){
          var form = layui.form;

          //监听提交
          form.on('submit(formDemo)', function(data){
            layer.msg(JSON.stringify(data.field));
            return false;
          });
        });
      }
    }
</script>

<style scoped>
  .bg{
    background: url("http://anets.top:8082/wallpaper.action?offset=4&random=0.851244440670271");
    position: fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .bg .panel{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: white;border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(255,255,255,0.1);
    padding: 20px 20px;
  }
  h3{
    border-left: 5px solid #ee1289;
    padding-left: 10px;
    font-size: 16px;
  }
</style>
