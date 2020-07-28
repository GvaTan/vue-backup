<template>
    <div id="nav">
      <div class="classfify">
          <ul>
            <li><router-link to="/" >主网</router-link></li>
            <li><router-link to="/" >主站</router-link></li>
            <li><router-link to="/wallpaper" >桌面壁纸</router-link></li>
            <li><router-link to="/soft" >软件工具</router-link></li>
            <li><router-link to="/" >学习教程</router-link></li>
            <li><router-link to="/" >资源种子</router-link></li>
            <li><router-link to="/" >视频</router-link></li>
            <li><router-link to="/" >音乐</router-link></li>
            <li><router-link to="/" >博客文章</router-link></li>
          </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
#nav{
  width: 100%;
  height: 50px;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
}

  .classfify{
    width: 1530px;
    height: 50px;
    /*background-color: black;*/
    margin: auto;
  }


  ul{
    display: flex;
    flex-direction: row;

  }

  ul li{
    cursor: default;
    font-size: 16px;
    border: 1px solid rgba(255,255,255,0);
    height: 50px;
    line-height: 50px;

    transition: all 0.2s;
  }

ul li:hover{
  border: 1px solid white;
}


  a{
    color: white;
    display: block;
    text-decoration: none;
    /*background-color: crimson;*/
    padding: 0px 30px;
  }
</style>
