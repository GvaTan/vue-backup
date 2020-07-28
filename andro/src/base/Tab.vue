<template>
    <div class="footer">

          <router-link class="first" to="/home"><i class="iconfont icon-shouye"></i><span>Home</span></router-link>
          <router-link to="/list"><i class="iconfont icon-liebiao"></i><span>List</span></router-link>
          <router-link to="/add"><i class="iconfont icon-tianjia"></i><span>Add</span></router-link>
          <router-link to="/collect"><i class="iconfont icon-shoucang"></i><span>Collect</span></router-link>

    </div>
</template>

<script>
    export default {
        name: "Tab"
    }
</script>

<style scoped lang="less">
.footer{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  height: 50px;

  border-top:1px solid deeppink;
  display: flex;
  background-color: rgba(255,255,255,0.9);

}
  .footer a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow:1;
    border-left:1px solid silver;
  }

  a.router-link-active{
    color: deeppink;
  }
.first{
  border-left:1px solid red;
}
</style>
