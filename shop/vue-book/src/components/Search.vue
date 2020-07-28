<template>
    <div>
        <div class="col-md-12 search">
             <div class="cover ml-10" v-if="!shop" :style="{'background':'url(../../static/images/bg.jpg)','background-size':'cover','background-position': '-350px -460px'}"></div>
          <div class="cover ml-10" v-if="shop" :style="{'background':'url(http://anets.top/'+shop.preview+')','background-size':'cover','background-position': '-600px -460px'}"></div>
             <input v-if="!shop" @keyup.enter="search()" class="so col-md-4 co col-sm-12  offset-md-7" type="text">
              <div v-if="shop" class="shop">
                <img :src="'http://anets.top/'+shop.preview" alt="">
                <div>
                  <h2>{{shop.name}}</h2>
                  <p>{{shop.discription}} </p>
                  <span class="tags"></span>
                  <span class="info">标签:
                    <!-- <i v-for="(item1,index1) in shop.tags"> ,&nbsp;&nbsp;{{item1}} </i>  -->
                     <i> &nbsp;&nbsp;{{shop.tags}} </i>
                      &nbsp; |  &nbsp;  浏览:{{shop.views}} &nbsp; |  &nbsp;下载:{{shop.downloads}}  &nbsp;| &nbsp; &nbsp;{{shop.updateTime}}</span>
                </div>
              </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
      props:["shop"],
      data(){
         return {
           // shop:this.$props.shop,
         }
      },
      methods:{
        search(){
          this.$layer.msg("暂时不支持搜索功能，搜索服务将在商品数量一定后上线！！");
        }
      }
    }
</script>

<style scoped>
  .search{
    height: 250px;
    /*background-color: red;*/
    overflow: hidden;
    position: relative;
    margin: 0px;
  }
.cover{
  position: absolute;
  width:150%;
  height: 280px;


  top: -10px;
  left:-30px;
  filter:blur(5px);
  /*background-color: crimson;*/
}





  .shop h2{
    font-size: 25px;
    height: 60px;
    overflow: hidden;
  }
  .shop p{
    color: rgba(255,255,255,0.7);
    height: 80px;
    overflow: hidden;
  }
  @media screen and (max-width: 768px){
    .shop{
      position: absolute;
      /*width: 100%;*/
      display: flex;
      flex-direction: row;
      color: white;
      top:50px;
    }
    .shop span{
      display: none;
    }
    .shop img{
      width:220px;
      height:150px;
      border: 5px solid white;
      border-radius: 5px;
      margin-right: 10px;
      margin-left: 0px;
    }
  }
  @media screen and (min-width: 768px){
    .shop{
      position: absolute;
      width: 100%;
      display: flex;
      flex-direction: row;
      color: white;
      top:50px;
    }
    .shop span{
      position: absolute;
      right: 50px;
      bottom: 0px;
      color: rgba(255,255,255,0.7);

    }
    .shop img{
      width:220px;
      height:150px;
      border: 5px solid white;
      border-radius: 5px;
      margin-right: 40px;
      margin-left: 20px;
    }

  }


  .so{
    background-color: rgba(0,0,0,0.5);
    height: 40px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 5px;
    outline: none;
    margin-top: 100px;
    color: white;
  }

  .so:hover{
    background-color: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.5);
  }

  .so:focus{
    background-color: rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.7);
  }
</style>
