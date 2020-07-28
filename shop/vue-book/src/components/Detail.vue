<template>
    <div id="detail" style="">
      <Navigator></Navigator>
      <div v-if="shop">
        <Search :shop="shop"></Search>
      </div>
      <Load :show="!shop"></Load>
      <div class=" container col-md-12 row p-0 m-0"  v-if="shop">
         <div class="left col-md-8 col-sm-12">
              <div class="detail">
                   <h3>商品详情：</h3>
                    <div v-html="shop.detail" style="overflow:hidden">
                    </div>
              </div>
         </div>
         <div class="right col-md-4 col-sm-12">
               <div class="user">
                 <div class="info" v-if="shop.user">
                   <!-- <img :src="shop.user.headimg" alt=""> -->
                   <i class="userlogo">{{shop.user.username|fname}}</i>
                   <p>
                     <b>up主:{{shop.user.username}}</b>
                     <span>积分:{{shop.user.acoin}}&nbsp;|&nbsp; ¥:{{shop.user.coin}} &nbsp;|&nbsp; 商品:{{userz.count}} &nbsp;|&nbsp; 状态:{{shop.user.isOnline|fonline}} </span>
                   </p>
                 </div>
                 <hr class="layui-bg-gray">
                 <div class="upload">
                      <ul>
                        <li v-for="(item,index) in userShops" :key="index">
                          <div class="ll ">
                            <router-link  :to="{path:'/list/'+item.sid+'.html'}" tag="a" class="img"><img  class="" alt="" :src="'http://anets.top/'+item.preview"></router-link>
                          </div>
                          <div class="rr">
                            <h2><router-link :to="{path:'/list/'+item.sid+'.html'}" tag="a">{{item.name}}</router-link></h2>
                            <p>{{item.discription}} </p>
                            <span class="info">浏览:{{item.views}}  |  下载:{{item.downloads}}  |  {{item.updateTime}}</span>
                          </div>
                        </li>
                      </ul>
                 </div>
               </div>
           <br>
           <h3>相似商品</h3><br>
               <div class="recommend">
                 <ul>
                   <li v-for="(item,index) in similarShops" :key="index">
                     <div class="ll ">
                       <router-link :to="{path:'/list/'+item.sid+'.html'}" tag="a" class="img"><img  class="" alt="" :src="'http://anets.top/'+item.preview"></router-link>
                     </div>
                     <div class="rr">
                       <h2><router-link :to="{name:'detail',params:{c:item.sid}}" tag="a">{{item.name}}</router-link></h2>
                       <p>{{item.discription}} </p>
                       <span class="info">浏览:{{item.views}}  |  下载:{{item.downloads}}  |  {{item.updateTime}}</span>
                     </div>
                   </li>
                 </ul>
               </div>
         </div>
      </div>
      <div v-if="shop">
        <Buy :shop="shop"></Buy>
      </div>
    </div>
</template>

<script>
  import Navigator from './Navigator'
  import Search from './Search'
  import Buy from './Buy'
  import {getDisabledShop,getHotShops,getSimilarShops,getAddView} from "../api/shop";
 import  Load from './Loading/Load'
  export default {
        name: "Detail",
      components:{Navigator,Search,Buy, Load},
      data(){
          return {
            shop:null,
            userz:{count:'计算中'},
            userShops:[],
            similarShops:[]
          }
      },
      computed:{
        key:{
          get(){
            return this.$route.params.c;
          }
        }
      },
     watch:{
       shop:{
         handler(newVal,oldVal){
           if(newVal.user){
              this.gainUsersShop(newVal.user.uid);
           }
           if(newVal){
             this.gainSimilarShops(newVal.name,newVal.tags,1,50);
           }
         },deep:true,immediate:false
       },
       key:{
          handler(newVal,oldVal){
           window.location.reload();// 强制刷新页面
         },deep:true,immediate:false
       }
     },
      filters:{
        fonline(val){
          if(val==0){
            return "离线";
          }else{
            return "在线";
          }
        },
        fdetail(val){
          if(val){
            return val;
          }else{
            return "该商品暂无描述！";
          }
        },
        fname(val){
           return val.substring(0,1).toUpperCase();
        }
      },
      created() {
          console.log(this.$route.params.c);
        this.gainDisabledShop(this.$route.params.c);
        this.addView(this.$route.params.c);
      },
      methods:{
          async gainDisabledShop(sid){
              let {data:res}=await  getDisabledShop(sid);
              this.shop=res.data;
              console.log(this.shop);
          },
          async gainUsersShop(uid){
            let {data:res}=await getHotShops('',1,50);
            this.userShops=res.data.shops;
          },
          async gainSimilarShops(key,tags,start,size){
            let {data:res}=await getSimilarShops(key,tags,start,size);
            this.similarShops=res.data.shops;
          },
          async addView(sid){
             let {data:res}=await getAddView(sid);
             console.log(res);
          }
      }
    }
</script>

<style scoped>
  #detail{
    /*width: 100%;*/
    height: 100%;
    background-color: #f9f9f9;
    padding-bottom: 50px;
    min-height: 100vh;
  }
  .all{

  }
.left{
  /*background-color: red;*/
  padding-top: 20px;
}
  .left .detail{
    /*background-color: deeppink;*/
    width: 90%;
    margin: auto;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.05);
    padding: 10px 15px;
  }

  .left .detail p {
    padding: 20px 0px;
  }
  .right{
      /*background-color: green;*/
    padding-top: 20px;
    /*background-color: red;*/
  }

  .right .user{
      /*background: purple;*/
    width: 90%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.05);
    padding: 10px 15px;
    display: flex;
    flex-direction: column;

  }

  .right .user .info{
    display: flex;
    flex-direction: row;
  }

  .right .user .info img{
    width:44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .right .user .info p{
     display: flex;
    flex-direction: column;
  }
  .right .user .info p b{
    font-size: 17px;
  }
  .right .user .upload{
    max-height: 500px;
    overflow: auto;
  }
  .right .user .upload ul{
    display: flex;
    flex-direction: column;
  }
  .right .user .upload ul li{
       width: 100%;
    height: 120px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    /*background-color: red;*/
    margin-top: 10px;
  }
  .right .user .upload ul li img{
    height: 120px;
  }
  .right .user .upload ul li .ll{
    /*width: 160px;*/
  }
  .right .user .upload ul li .rr{
    margin-left: 20px;
    /*width: 60%;*/
    font-size: 15px;
    position: relative;
  }

  .right .user .upload ul li h2{

    font-size: 12px;
    font-weight: 600;

    max-height: 30px;
    overflow: hidden;
  }

  .right .user .upload ul li:hover{
    box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;
  }
  .right .user .upload ul li p{
    margin-top: 5px;
    font-size: 12px;
    max-height: 48px;
    overflow: hidden;
  }
  .right .user .upload ul li span{
    font-size: 8px;
    height: 20px;
    overflow: hidden;
    position: absolute;
    right:0px;
    bottom: 0px;
  }

  .right  .recommend{
    padding-top: 20px;
    width: 90%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.05);
    padding: 10px 15px;
    max-height: 500px;
    overflow: auto;
    /*background: black;*/
  }
   h3 {
    font-size: 18px;
    border-left: 5px solid #ee1289;
    padding-left: 10px;
  }
  .right  .recommend ul{
    display: flex;
    flex-direction: column;
  }


  .right .recommend ul li{
    width: 100%;
    height: 120px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    /*background-color: red;*/
    margin-top: 10px;
  }
  .right  .recommend ul li img{
    height: 120px;
  }
  .right  .recommend ul li .ll{
    /*width: 160px;*/
  }
  .right  .recommend ul li .rr{
    margin-left: 20px;
    /*width: 60%;*/
    font-size: 15px;
    position: relative;
  }
 ul li a{
   color: rgba(0,0,0,0.5);
  }

  ul li a:hover{
    color: #ee1289;
  }
  .right .recommend ul li h2{

    font-size: 12px;
    font-weight: 600;
    max-height: 30px;
    overflow: hidden;
  }

  .right .recommend ul li:hover{
    box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;
  }
  .right .recommend ul li p{
    margin-top: 5px;
    font-size: 12px;
    max-height: 48px;
    overflow: hidden;
  }
  .right .recommend ul li span{
    font-size: 8px;
    height: 20px;
    overflow: hidden;
    position: absolute;
    right:0px;
    bottom: 0px;
  }


  .userlogo{
  text-align: center;
  justify-content: center;
  width:40px;
  height:40px;
  line-height:40px;
  background-color: #009688;
  display: inline-block;
  border-radius: 50%;
  margin-top:3px;
  margin-right: 10px;
  font-size: 20px;
  font-style: normal;
  color: white;
  
  
}



</style>
