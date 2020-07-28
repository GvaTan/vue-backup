<template>
  <div id="article" class="container col-12 col-md-7 p-0" >
      <div class="row col-12 p-0 m-0">
          <div class="left col-12 col-md-9 p-0" >
               <h4 style="width:100px">最新<span style="color:#ee1289">文章</span></h4>
               <ul>
                   <li v-for="(item,index) in arts" >
                       
                       <div class="content" style="position:relative">
                           <router-link :to="'/detail/'+item.articleId+'.html'">
                               <img :src="'http://anets.top/'+item.articleImg" alt="">
                           </router-link>
                          <div style="padding-left:10px">
                                <router-link :to="'/detail/'+item.articleId+'.html'">
                               <h3>{{item.articleTitle}}</h3></router-link>
                           <p>
                               {{item.discription}}
                               <span style="position:absolute;right:20px;bottom:0px">
                                  {{item.articleDate}} 
                                    <span v-if="item.user&&item.user.userName">发布者:{{item.user.userName}}</span> | 点击:{{item.articleViews}} | <i @click="like(item.articleId)" style="cursor:pointer" class="layui-icon layui-icon-heart"></i> :{{item.articleLikeCount}} 
                                   <!-- | {{item.tags}} -->
                               </span>
                           </p>
                          </div>
                       </div>
                   </li>
                   <div v-if="arts.length!=0">
                       <br>
                        <hr class="layui-bg-gray">
                       <p style="text-align:center"><span @click="more()"  style="color:#777;cursor:default">加载更多</span></p>
                   </div>
               </ul>
          </div>
          <div class="right col-12 col-md-3 pl-2 pr-0" >
               <Right></Right>
          </div>
      </div>
  </div>
</template>

<script>
import Right from './Right'
import {getNew,addLike} from '../../api/index'
export default {
  name: '',
  components:{Right},
  data(){
      return {
          arts:[],
          start:0,
          size:2
      }
  },
  created(){
     this.initData();
  },
  methods:{
      async initData(){
          let {data:res} =await getNew(this.start,this.size);
          this.arts=res.data;
          console.log(res.data[0]);
      },
      async more(){
          this.start+=this.size;
          let {data:res} =await getNew(this.start,this.size);
          this.arts=this.arts.concat(res.data);
        //   console.log(res.data[0]);
      },
         async like(id){
             let {data:res}=await addLike(id);
             let {data:res1} =await getNew(0,this.arts.length);
             this.arts=res1.data;
         }
  }
}
</script>

<style scoped>
#article{
    /* background-color: green; */
    margin-top:20px;
    background-image: url("../../../static/images/bg/bg2.jpg");
}


h4{
  background-color:white;
  padding: 0px 10px;
  font-size: 18px;
  font-weight: bold;
  color: #777;
   margin-top:-15px;
}

h3{
    font-size:17px;
}
.left{
    background-color: white;
    margin-top:10px;
}




.left ul{
     margin-top:-10px;
}
.left ul li{
    margin-top:25px;
     border:1px solid rgba(0, 0, 0, 0);
    /* border:1px solid red; */
    /* transition: all 0.5s; */
}

.left ul li:hover{
    box-shadow:1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    border:0px solid rgba(0, 0, 0, 0);
    margin-top: 27px;
}
.content{
  display: flex;
  flex-direction: row;
}
.content p{
  padding: 0px 0px;
  padding-top: 0px;
  font-size: 14px;
  max-height: 50px;
  margin: 0px;
  overflow: hidden;
   /* background-color: black; */
}

.content img{
    width: 170px;
    height:100px;
}


</style>
