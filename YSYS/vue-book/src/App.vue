<template>
  <div id="app">
    <router-view/>
    <router-view name="Buy"/>
    <router-view name="Share"/>
  </div>

</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Helvetica Neue","Helvetica","Arial","PingFang SC","Hiragino Sans GB", "Microsoft YaHei","WenQuanYi Micro Hei", sans-serif;
}
</style>
