<template>
    <div id="user" class="container-fluid p-0 m=0" >
        <div class=" row" style="">
              <div class="m-0 p-0 col-sm-2 " style="height: auto">
                <ul class="layui-nav layui-nav-tree layui-inline col-sm-12" lay-filter="demo" style="margin-right: 10px;min-height:100vh;height: 100%">
                  <li class="layui-nav-item layui-nav-itemed ">
                    <a href="/" target="_blank">首页</a>
                  </li>
                  <li class="layui-nav-item layui-nav-itemed ">
                    <router-link to="info" tag="a">用户面板</router-link>
                  </li>
                  <li class="layui-nav-item">
                    <router-link to="upload" tag="a">上传资源</router-link>
<!--                    <dl class="layui-nav-child">-->
<!--                      <dd> <router-link to="up" tag="a">用户面板</router-link></dd>-->
<!--                      <dd><a href="">上传文件</a></dd>-->
<!--                    </dl>-->
                  </li>
                  <li class="layui-nav-item"> <router-link to="order" tag="a">我的购买</router-link></li>
                  <li class="layui-nav-item"> <router-link to="release" tag="a">我的发布</router-link></li>
                </ul>
              </div>
              <div class="col-sm-10  m-0 pl-1 pr-5 right" style="height:100%;">
                <router-view/>

              </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
      data(){
          return {
            
          }
      },
      computed:{
        user:{
          get(){
            return this.$store.state.user;
          }
        }
      },
      created() {
          this.initLayui();
          if(this.$route.name=="user"){
            this.$router.push({path:'user/info'});
          }
      },
      watch:{
        user:{
          handler(newval,oldval){
              if(newval==false){
                // alert(newval);
                window.location.href=this.$store.state.passportBasicUrl+"/user/login?from="+this.$store.state.shopBasicUrl+"/user/info";
              }else{
                 
              }
          },immediate: true
        }
      }
      ,
      methods:{
          initLayui(){
            layui.use('element', function(){
              var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

              //监听导航点击
              element.on('nav(demo)', function(elem){
                //console.log(elem)
                layer.msg(elem.text());
              });
            });
          }
      }
    }
</script>

<style scoped>
#user{
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  overflow: auto;
  overflow-x: hidden;
}


  h3{
    border-left: 5px solid #ee1289;
    padding-left: 10px;
    font-size: 16px;
  }
</style>
