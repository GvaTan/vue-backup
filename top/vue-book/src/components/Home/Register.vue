<template>
    <div v-if="show" id="register">
          <div class="content">
            <i @click="triggerFather()" class="iconfont icon-guanbi" style="position: absolute;font-size20px;right:-20px;top:-30px"></i>
            <h3 style="margin-bottom: 30px;color: rgba(244,90,141,1)">欢迎加入A网</h3>
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label for="firstname" class="col-sm-3 control-label">邮箱</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="firstname" placeholder="务必真实，以找回密码">
                </div>
              </div>
              <div class="form-group">
                <label for="lastname" class="col-sm-3 control-label">昵称</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="lastname" placeholder="请输入昵称">
                </div>
              </div>
              <div class="form-group">
                <label for="lastname" class="col-sm-3 control-label">密码</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="lastname" placeholder="请输入密码">
                </div>
              </div>


              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-default">注册</button>
                  <span @click="triggerFather1()" style="cursor:default;float: right;margin-top: 5px">登陆</span>
                </div>
              </div>
            </form>
          </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        props:['show'],
       methods:{
         triggerFather(){
           this.$emit('click');
         },
         triggerFather1(){
           this.$emit('login');
         }
       }
    }
</script>

<style scoped>
  #register{
    position: fixed;
    width: 100%;
    z-index: 9999;
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
