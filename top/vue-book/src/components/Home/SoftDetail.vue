<template>
    <div>
      <Search @setKeyword="setKeyword"></Search>
      <Navigation></Navigation>
      <div v-if="!shop.show"><img src="http://img03.taobaocdn.com:80/tfscom/TB1.bpFhQL0gK0jSZFxXXXWHVXa" alt="">正在查询...</div>
      <div class="top" v-if="shop.show" :style="'background:url(\''+'http://localhost:8181/upload/soft/thumbnail/s'+shop.data.address+'\');background-size: cover;'"> </div>
      <div class="topz" v-if="shop.show"> </div>
      <div class="tops" v-if="shop.show">
        <img :src="'http://localhost:8181/upload/soft/thumbnail/s'+shop.data.address" alt="" width="300px" height="185px">
        <div>
           <h3>{{shop.data.title}}</h3>
           <p>{{shop.data.discript}}
        </p>
           <span> 上传者：{{shop.data.user.name}} | 浏览次数：{{shop.data.view}}次 | 下载次数：{{shop.data.download}}次 | 评论：{{shop.data.comment}}条</span>
        </div>
      </div>
      <div class="middle" v-if="shop.show">
         <div class="left">
            <h3>详情内容</h3>
           <p>{{shop.data.detail}}</p>
         </div>
         <div class="right"></div>
      </div>
      <Comment :showz="shop.show"></Comment>
    </div>
</template>

<script>
  import  Search from "./Search"
  import  Navigation from './Navigation'
  import  Comment from './Comment'
  import  {shopQueryById} from "../../api/Shop";
    export default {
      components:{Search,Navigation,Comment},
        name: "SoftDetail",
      data(){
        return {
          shop:{show:false,data:null,showFree:false}
        }
      },created() {
        this.initData();
      },filters:{
        free(val){
          if(val==1){

            return "免费";
          }else{
            return "限免";
          }

        }
      },
      methods:{
        async initData(){
          let {data}=await shopQueryById(this.$route.query.id);
          this.shop.data=data;
          if(this.shop.data.isFree==0){
            this.shop.showFree=true;
          }
          this.shop.show=true;
        }
      }
    }
</script>

<style scoped>
.top{
  margin-top: 20px;
  position: absolute;
  width: 100%;
  /*margin-left: -10%;*/
  height: 250px;
  overflow: hidden;
  /*background-color: crimson;*/
  /*background: url("http://anets.cn/upload/wallpaper/thumbnail/bed1568609320337.jpg");*/
  /*background-size:cover;*/
  filter: blur(10px);

}
.tops img{
  border: 4px solid white;
  border-radius: 5px;
  /*background-color: yellow;*/
  width: 300px;
}

.tops div{
  text-align: left;
  margin-left: 100px;
  margin-top: -20px;
}

.tops div h3{
  font-weight: bold;
  color: rgba(244,90,141,1);
}

.tops div  p{
  margin-top: 15px;
  /*background-color: deeppink;*/
  height: 98px;
  overflow: hidden;

}

.tops div span{
  float: right;
  margin-left:600px;
  margin-top: 15px;
}
  .tops{
    position: relative;
    padding: 33px;
    width:1530px;
    height: 250px;
    /*background-color: crimson;*/
    margin: auto;
    margin-top: 20px;

    display: flex;
    flex-direction: row;
    z-index: 999;
    /*background-color:rgba(0,0,0,0.4);*/
  }
.topz{
  position: absolute;
  width: 100%;
  /*margin-left: -10%;*/
  height: 250px;
  overflow: hidden;
  background-color: crimson;
  background-color:rgba(0,0,0,0.3);
  margin-top: 20px;
}

  .middle{
    text-align: left;
    width: 1530px;
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-top: 20px;
    /*background-color: deeppink;*/
  }
.middle .left{
  padding-left: 32px;
  padding-right: 10px;
  width: 1200px;
  /*background-color: yellow;*/
}
.middle .left p{
  color: rgba(255,255,255,0.8);
}
.middle .left h3{
  border-left: 5px solid rgba(0,154,229,1);
  padding-left: 10px;
  font-size: 20px;
}
.middle .right{
  /*background-color: black;*/
  margin-left: 20px;
  width: 320px;
  height:500px;
  border: 1px solid rgba(0,154,229,0.5);
  border-radius: 5px;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.5);
}
</style>
