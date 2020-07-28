<template>
  <div id="app">
<!--    <router-view/>-->


      <router-view name="home"></router-view>
    <router-view name="teacher"></router-view>
    <router-view name="buy"></router-view>






  </div>
</template>

<script>
export default {
  name: 'App',
  components:{

  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

  *{
    margin: 0px;
    padding: 0px;
    font-family: "Helvetica Neue","Helvetica","Arial","PingFang SC","Hiragino Sans GB", "Microsoft YaHei","WenQuanYi Micro Hei", sans-serif;
  }
  ul li{
    list-style: none;
    float: left;
    margin-left:20px;

  }
  a{
    text-decoration: none;
  }
</style>
