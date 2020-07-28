<template>
  <div id="" >
     <Nav></Nav>
     <div class="all row p-0 m-0">
       <div class="left col-1">
            <ul>
              <li v-for="(item,index) in articleTime">
                  <a  href="javascript:void(0)" @click="getArticles(item.timez)">{{item.timez}} </a>
                  <div>
                    <span style="" v-if="index==0" class="layui-badge">{{item.countz}}</span>
                  <span v-if="index==1" class="layui-badge layui-bg-orange">{{item.countz}}</span>
                  <span v-if="index==2" class="layui-badge layui-bg-green">{{item.countz}}</span>
                  <span v-if="index>2" class="layui-badge layui-bg-cyan">{{item.countz}}</span>
                  </div>
              </li>
            </ul>
       </div>
       <div class="right col-11 p-5"  >
          


           <ul class="layui-timeline" style="">
              <li class="layui-timeline-item" v-for="(item,index) in articles" style="position:relative">
                <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
                <div class="layui-timeline-content layui-text"  >
                  <h3 class="layui-timeline-title">{{item.articleDate}} </h3>
                 <div style="display:flex;flex-decration:row">
                   <router-link target="_blank" :to="'/detail/'+item.articleId+'.html'">
                      <img width="170px" height="100px" :src="'http://anets.top/'+item.articleImg" alt="">
                    </router-link>
                    <div class="content">
                       <router-link target="_blank" :to="'/detail/'+item.articleId+'.html'"><h3>{{item.articleTitle}}</h3></router-link>
                            
                         <p>
                           {{item.discription}}
                            <br>
                            <span style="position:absolute;right:10px">
                              <span v-if="item.user&&item.user.userName">上传者:{{item.user.userName}} | </span>点击:{{item.articleViews}} | 喜欢:{{item.articleLikeCount}} 
                            </span>
                          </p>
                    </div>
                 </div>
                </div>
              </li>
            </ul>
       </div>
     </div>
  </div>
</template>

<script>
import Nav from './Nav'
import {timeArchiving,getArchivingArticles} from '../../api/index'
export default {
  name: '',
  components:{Nav},
  data(){
    return {
      articleTime:[],
      articles:[]
    }
  },
  created(){
    this.initData();
  },
  methods:{
    async initData(){
        let {data:res} =await timeArchiving();
        this.articleTime=res.data;

        this.getArticles(this.articleTime[0].timez);
    },
    async getArticles(timez){
       let {data:res} = await getArchivingArticles(timez);
       this.articles=res.data;
    }
  }
}
</script>

<style scoped>
.all{
  background-color: #eeeeee;
  position: fixed;
  top:60px;
  width:100%;
  height:100%;
  background: url('http://anets.top/group1/M00/00/05/rBEqJl6VgkaAdlZpAAt7JV8Nyw44536720');
}

.left{
  height:100%;
  background-color: white;
  margin-top: 0.5px;
}
.right {
  
}
.right ul{
  margin-top: -10px;
}
.right ul li{
  background-color: white;
  padding: 5px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  margin-top: 25px;
}

.left ul li{
  cursor: default;
  height: 40px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left ul li:hover{
  color: #ee1289;
}
h3{
  font-size: 18px;
}

.right ul li .content{
  padding-left:20px;
}

</style>
