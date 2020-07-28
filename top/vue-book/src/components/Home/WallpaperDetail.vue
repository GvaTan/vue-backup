<template>
  <div>
    <Search @setKeyword="setKeyword"></Search>
    <Navigation></Navigation>
    <div v-if="!shop.show"><img src="http://img03.taobaocdn.com:80/tfscom/TB1.bpFhQL0gK0jSZFxXXXWHVXa" alt="">正在查询...</div>
      <div class="top" v-if="shop.show" :style="'background:url(\''+'http://localhost:8181/upload/wallpaper/thumbnail/'+shop.data.address+'\');background-size: cover;'"> </div>
      <div class="tops" v-if="shop.show">
        <img :src="'http://localhost:8181/upload/wallpaper/thumbnail/'+shop.data.address" alt="">
        <div>
          <h3>{{shop.data.title}}</h3>
          <p>类型：{{shop.data.isFree|free}} | <span v-if="shop.showFree">所需A币：{{shop.data.acoin}},所需coin：{{shop.data.coin}}| </span> 尺寸：{{shop.data.width}}px*{{shop.data.height}}px | 上传者:{{shop.data.user.name}} | 上传时间:{{shop.data.time}}</p>
        </div>
      </div>
    <Download></Download>
    <Comment :showz="shop.show"></Comment>
  </div>
</template>

<script>
  import  Search from "./Search"
  import  Navigation from './Navigation'
  import  Comment from './Comment'
  import  {shopQueryById} from "../../api/Shop";
  import  Download from './Download'
  export default {
    components: {Search, Navigation, Comment,Download},
    name: "WallpaperDetail",
    data() {
      return {
        shop: {show: false, data: null, showFree: false}
      }
    }, created() {
      this.initData();
    }, filters: {
      free(val) {
        if (val == 1) {

          return "免费";
        } else {
          return "限免";
        }

      }
    },
    methods: {
      async initData() {
        let {data} = await shopQueryById(this.$route.query.id);
        this.shop.data = data;
        if (this.shop.data.isFree == 0) {
          this.shop.showFree = true;
        }
        this.shop.show = true;
      }
    }
  };
</script>

<style scoped>
  .top{
    position: absolute;
    width: 100%;
    height: 250px;
    overflow: hidden;
    /*background-color: crimson;*/
    filter: blur(10px);

    margin-top: 20px;
  }

  .tops{
    position: relative;

    width:1530px;
    height: 700px;
    /*background-color: crimson;*/
    margin: auto;
    margin-top: 150px;
    z-index: 999;
  }
</style>
