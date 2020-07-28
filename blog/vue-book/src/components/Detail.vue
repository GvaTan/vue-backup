<template>
  <div id="" >
     <Nav></Nav>
     <div class="all  container col-12 col-md-8 p-0">
          <div class="row">
                 <div class="left col-9 m-0">
                     <div v-if="!info" style="text-align:center;background-color:white">
                         数据加载中...
                     </div>
                     <div class="content" v-if="info">
                         <h2>{{info.article.articleTitle}}</h2>
                         <div class="desc">发布时间：{{info.article.articleDate}}  标签：{{info.labels}}  阅读：{{info.article.articleViews}} <i @click="like()" class="layui-icon layui-icon-heart"></i>   ：{{info.article.articleLikeCount}}
                              文章分类： <span v-if="info.sort">{{info.sort.sortName}}</span>      </div>
                         <p v-html="info.article.articleContent">           

                         </p>
                         <hr class="layui-bg-gray" style="margin-bottom:0px">
                         <!-- <br> -->
                     </div>

                     
                    <div class="container col-12 m-0 p-0" style="padding-bottom:50px">
 
                        <div class="comments">
                              <ul v-if="comments" style="background-color:white;margin-top:-20px;">
                                  <li v-for="(item,index) in comments" style="margin-top:20px;">
                                      <div  style="position:relative">
                                           {{item.fromUser.userName}}<span v-if="item.userId==-1">({{item.commentIp}})</span>:{{item.commentContent}}
                                          <span style="float:right;margin-right:15px"> ------ {{item.commentDate}} &nbsp;&nbsp;<a @click="showReply(index,-1)" style="font-size:10px" href="javascript:void(0)">回复</a></span>
                                           <div class="comment col-10 row m-0 p-0" v-if="index==cursor&&cursor1==-1">
                                                <textarea class="col-11" v-model="comment.commentContent" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论">
                                                </textarea>
                                                <button @click="reply(item.commentId)" type="button" style="height:50px" class="layui-btn col-1">回复</button>
                                            </div>
                                      </div>
                                      <div>
                                          <ul style="border-right:5px solid #009688;padding-right:10px;font-size:10px">
                                              <li v-for="(item1,index1) in item.children" style="text-align:right">
                                                  {{item1.fromUser.userName}}<span v-if="item1.fromUser.userId==-1">({{item1.commentIp}})</span>&nbsp;&nbsp;回复&nbsp;&nbsp;@{{item1.toUser.userName}}<span v-if="item1.toUser.userId==-1">({{item1.commentIp1}})</span>&nbsp;&nbsp;{{item1.commentContent}}
                                                  &nbsp;&nbsp;|&nbsp;&nbsp;{{item1.commentDate}}&nbsp;&nbsp;<a @click="showReply(index,index1)" style="font-size:10px" href="javascript:void(0)">回复</a>
                                                  <div class="comment col-10 row m-0 p-0" v-if="index==cursor&&index1==cursor1">
                                                        <textarea class="col-11" v-model="comment.commentContent" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论">
                                                        </textarea>
                                                        <button @click="reply(item1.commentId)" type="button" style="height:50px" class="layui-btn col-1">回复</button>
                                                    </div>
                                              </li>
                                          </ul>
                                      </div>
                                  </li>
                              </ul>
                        </div>

                         <div class="comment col-12 row m-0 p-0">
                        <textarea class="col-11" v-model="comment.commentContent" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论">
                           </textarea>
                        <button @click="submitComment()" type="button" style="height:50px" class="layui-btn col-1">发表评论</button>
                       </div>
                    </div>
                </div>
                <div class="right col-3 pl-0">
                    <Right></Right>
                </div>
          </div>
          
     </div>
  </div>
</template>

<script>
import Nav from './Home/Nav'
import Right from './Home/Right'
import {getArticle,addView,addLike} from '../api/index'
export default {
    components:{Nav,Right},
     name: '',
     data(){
         return {
             info:null,
             comment:{
                 articleId:null,
                 parentCommentId:null,
                 commentContent:''
             },
             comments:null,
             cursor:-1,
             cursor1:-1

         }
     },
     created(){
         this.initData();
         this.queryComments();
     },
     methods:{
         showReply(index,index1){
             this.cursor=index;
             this.cursor1=index1;
         },
         async gainArticle(id){
             let {data:res}=await getArticle(id);
             this.info=res.data;
             let {data:res1}=await addView(id);
            //  console.log(res.msg);
         },
         initData(){
            //  alert();
            this.comment.articleId=this.$route.params.c;
             this.gainArticle(this.$route.params.c);
             
         },
         async like(){
             let {data:res}=await addLike(this.$route.params.c);
             this.gainArticle(this.$route.params.c);
         },
        submitComment(){
             $.ajax({
                 url:"/api/comment/add",
                 type:"post",
                 data:this.comment,
                 dataType:'json',
                 success:(res)=>{
                     this.$layer.msg(res.msg);
                     this.queryComments();
                 }
             });
         },
         reply(parentId){
             this.comment.parentCommentId=parentId;
             $.ajax({
                 url:"/api/comment/add",
                 type:"post",
                 data:this.comment,
                 dataType:'json',
                 success:(res)=>{
                     this.$layer.msg(res.msg);
                     this.queryComments();
                     this.cursor=-1;
                      this.cursor1=-1;
                 }
             });
         },
         queryComments(){
             $.ajax({
                 url:"/api/comment/query?articleId="+this.$route.params.c,
                 type:"get",
                 data:null,
                 dataType:'json',
                 success:(res)=>{
                     this.comments=res.data;
                    //  alert(res.data);
                    //  console.log(res.data);
                 }
             });
         }
     }
}
</script>

<style scoped>
.all{
    
     background-image: url("../../static/images/bg/bg2.jpg");
}
.left .content{
     margin-top:10px;
    background-color:white;
    /* padding:20px 10px; */
    /* background-color:red; */
}


.left .content h2{
    text-align: center;
    font-size: 25px;
}

.left .content .desc{
    text-align: center;
    font-size: 13px;
    color:#777;
    border:1px  dashed #777;
    /* background-color: red; */
}

.left .content p{
    font-size: 15px;
    padding:20px 5px;
}


textarea{
    font-size:14px;
    border:1px solid #777;
}

textarea:focus{
    border:1px solid #00A1D6;
}


.comments ul li{
    /* height:50px; */
    font-size:14px;
}
</style>
