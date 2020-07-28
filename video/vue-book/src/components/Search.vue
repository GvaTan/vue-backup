<template>
  <div id="" >
    <Nav></Nav>
    <div class="container col-12 col-md-11">
        <div class="so col-12 col-md-4 p-0" style="position:relative;margin-top:50px">
           <input placeholder="片库" style="width:100%"  v-model="key" type="text"  @keydown.enter="toSearch(key)">
           <i @click="toSearch(key)" style="color:white;position:absolute;right:20px;top:2px" class=" layui-icon layui-icon-search"></i>
        </div>
        <div class="content">
            <div v-if="!films" class="container col-2">查询中...</div>
            <ul v-if="films">
                <li v-for="(item,index) in films">
                     <a target="_blank" :href="item.url" v-html="item.namez"></a>
                     <p v-html="item.detail"></p>
                     <span style="float:right;margin-top:-20px;">
                         <span v-if="item.director">导演：</span><span v-html="item.director"></span>
                      <span v-if="item.star">|主演：</span><span v-html="item.star"></span>
                      <span v-if="item.types">| 类型：</span><span v-html="item.types"></span>
                      <span v-if="item.duration">| 片长：{{item.duration}}</span>
                       <span v-if="item.areaz">| 地区：{{item.areaz}}</span>
                       <span v-if="item.languagez">| 语言：{{item.languagez}}</span>
                       <span v-if="item.views">| 观看：{{item.views}}</span>
                       <span v-if="item.likes">| 喜欢:{{item.likes}}</span>
                       <span v-if="item.releasez">| 发布时间：{{item.releasez}} </span>
                       <span v-if="item.timez">| 更新时间：{{item.timez}}</span>
                       </span>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import {getFilms} from '../api/index'
 import Nav from './Home/Nav'
export default {
  name: '',
  components:{Nav},
  data(){
      return {
          key:"",
          films:null
      }
  },
  created(){
      this.initData();
  },
  methods:{
      async initData(){
          if(this.$route.query.keyword&&this.$route.query.keyword!=''){
              this.key=this.$route.query.keyword;
              let {data:result} =await getFilms(this.$route.query.keyword,1,100);
              if(result.success){
                  this.films=result.data.indexItems;
                  console.log(result.data.indexItems[0])
              }else{
                  this.$layer.msg("服务器错误，重试或者稍后访问");
              }
          }else{
              this.$router.push({path:'/'})
          }
      },
      async toSearch(key){
           
           if(!key){
              return ;
           }
           this.films=null;
            this.$router.push({path:'/search',query:{'keyword':key}})
           let {data:result} =await getFilms(key,1,100);
            if(result.success){
                this.films=result.data.indexItems;
                console.log(result.data.indexItems[0])
            }else{
                this.$layer.msg("服务器错误，重试或者稍后访问");
            }
      }
  }
  
}
</script>

<style scoped>
.so {
}

.so input{
  outline: none;
  background-color: rgba(0, 0, 0, 0.8);
  border :0px solid rgba(255, 255, 255, 0.1);
  
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
  padding-right: 30px;
  color: white;
  border-left :5px solid rgba(6,47,74,1);
}
.content{
    background-color: rgba(0, 0, 0,0.8);
    color:white;
    margin-top:50px;
    padding:20px 0px;
}
.content ul li{
   transition: all 0.5s;
   padding: 10px 20px;
   color: rgba(255, 255, 255, 0.7);
}
.content ul li:hover{
     background-color: rgba(6,47,74,1) !important;
     color: rgba(255, 255, 255, 1);
}

.content ul li a{
    /* color: ; */
}
.content ul li p{
   font-size: 14px;
   max-height: 300px;
   padding-bottom: 50px;
}
.content ul li span{
   font-size: 12px;
   color: rgba(255, 255, 255, 0.5);
}

.content ul li:hover span{
   /* font-size: 12px; */
   color: rgba(255, 255, 255,0.8);
}
</style>
