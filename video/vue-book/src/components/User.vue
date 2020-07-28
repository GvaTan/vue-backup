<template>
  <div id="user" >
      <Nav></Nav>
      <div class="row">
            <div class="left col-12 col-md-1 " >
                <ul class="layui-nav layui-nav-tree col-12 p-0" lay-filter="test">
                <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
                <li class="layui-nav-item layui-nav-itemed">
                    <router-link to="/user/info">用户信息</router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/user/up">发布文章</router-link>
                </li>
                <li class="layui-nav-item">
                     <router-link to="/user/release">我的发布</router-link>
                </li>
                </ul>
            </div>
            <div class="right col-12 col-md-9" >
                 <router-view />
            </div>
      </div>
  </div>
</template>

<script>
import Nav from './Home/Nav'
export default {
  name: '',
  components:{Nav}
}
</script>

<style scoped>
#user{
    overflow-x: hidden;
}
.left ul{
    background-color: white !important;
    color:#777 !important;
}

.left ul li{
    background-color: white !important;
    color:#777 !important;
}

.left ul li a{
    background-color: white !important;
    color:#777 !important;
    text-decoration: none;
}


.left ul li a:hover{
    background-color: #ee1289 !important;
    color:white !important;
}
</style>
