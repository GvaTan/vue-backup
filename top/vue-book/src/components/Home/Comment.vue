<template>
    <div class="comment" v-if="showz">
       <div class="left">
         <textarea @focus="commentz()" name="content" id="" cols="84" rows="3" v-model="data.content"></textarea>
         <div class="release">
            <div class="btn" @click="release()">发布</div>
         </div>
         <div class="content" v-if="comment.show">
           <ul>
             <li v-for="(item,index) in comment.data">
               <div  style="width:35px;height:35px;background:url('http://anets.cn/upload/wallpaper/thumbnail/821561905985875.jpg');background-size:cover;border-radius: 50%;border: 2px solid white"></div>
             <div>
                  <p style="font-weight: bold;font-size: 20px">{{item.user.name}}</p>
                  <p>{{item.content}}</p>
                  <span>点赞数：{{item.callz}}&nbsp;&nbsp;|&nbsp; <span v-if="index==replay.index&&replay.index1==null" @click="replay.index=null">取消回复</span><span v-if="index!=replay.index||replay.index1!=null" @click="toReplay(index)" style="cursor: default">回复</span>&nbsp;&nbsp;|&nbsp;&nbsp;时间：{{item.time}}</span>
                  <div class="reply" v-if="index==replay.index&&replay.index1==null">
                    <textarea @focus="commentz()" name="content" cols="80" rows="3" v-model="replay.data.content"></textarea>
                    <div class="release">
                      <div class="btn" @click="forReplay(item.id,item.user.id)">回复</div>
                    </div>
                  </div>
                  <div class="replyContent">
                         <div v-for="(item1,index1) in  item.replaies" class="content" :key="index1">
                           <div  style="width:27px;height:25px;background:url('http://anets.cn/upload/wallpaper/thumbnail/821561905985875.jpg');background-size:cover;border-radius: 50%;border: 2px solid white"></div>
                            <div :id="item1.time">
                              <p style="font-weight: bold;font-size: 20px;margin-top: -3px">{{item1.userByRepalyUserId.name}} <span style="color:rgb(0,154,229);font-size: 17px">回复 </span> {{item1.userByTargetUserId.name}}</p>
                              <p>{{item1.content}}</p>
<!--                              <span>点赞数：{{item1.callz}}&nbsp;&nbsp;|&nbsp;&nbsp;时间：{{item1.time}}</span>-->
                              <span>点赞数：{{item1.callz}}&nbsp;&nbsp;|&nbsp; <span v-if="index1==replay.index1&&index==replay.index" @click="replay.index1=null;replay.index=null">取消回复</span><span v-if="index1!=replay.index1||index!=replay.index" @click="toReplay1(index,index1)" style="cursor: default">回复</span>&nbsp;&nbsp;|&nbsp;&nbsp;时间：{{item1.time}}</span>
                              <div class="reply" v-if="index1==replay.index1&&index==replay.index" >
                                <textarea @focus="commentz()" name="content" cols="80" rows="3" v-model="replay.data.content"></textarea>
                                <div class="release" >
                                  <div class="btn" @click="forReplay(item.id,item1.userByRepalyUserId.id)">回复</div>
                                </div>
                              </div>
                            </div>
                         </div>
                  </div>
               </div>
             </li>
           </ul>
         </div>
       </div>
      <div class="right">

      </div>
      <Login :show="show" @click="show=false" @register="register"></Login>
      <Register :show="showRegister" @click="showRegister=false" @login="login"></Register>
      <Tip :show="tip.show" :msg="tip.msg" ></Tip>
    </div>
</template>

<script>
  import Login from "./Login"
  import Register from "./Register"
  import {addComment,queryComments,addReplay} from "../../api/Comment";
  import Tip from "../Tool/Tip"

  export default {
    components:{Login,Register,Tip},
        name: "Comment",
    props:['showz'],
      data(){
       return {
         data:{content:"","user.id":0,"shop.id":0},
         show:false,
         showRegister:false,
         tip:{show:false,msg:""},
         comment:{data:[],show:false},
         replay:{index:null,index1:null,data:{content:"","comment.id":0,"userByTargetUserId.id":0,"userByRepalyUserId.id":0}},
         replays:{},
         replaysz:[]
       }
      },
       computed:{
          user:{
            get(){
              return this.$store.state.user;
            }
          }
       },created() {
         this.data["shop.id"]=this.$route.query.id;
         this.findComment(this.data["shop.id"]);
      },
      watch:{
          user:{
             handler(newval,oldval){
               if(newval!=null){

                 this.data["user.id"]=newval.id;

               }
             },deep:true,immediate:true
          },
        replays:{
            handler(newval,oldval){
              this.replaysz=[];
               this.replaysz=newval;
            },deep:true,immediate:true
        }
      },methods:{
        commentz(){

          if(this.user==null){
            // alert(1)
               this.show=true;
          }
        },
        register(){
          this.show=false;
          this.showRegister=true
        },
        login(){
          this.show=true;
          this.showRegister=false
        },
        async release(){
          this.tip.msg="评论中...";
          this.tip.show=true;
            let {data}=await addComment(this.data);
            if(data.state=='success'){
                this.tip.msg="评论成功";
              this.findComment(this.data["shop.id"]);
            }else{
                this.tip.msg="评论失败,"+data.msg;
            }

            let a=setTimeout(()=>{this.tip.show=false;clearTimeout(a)},3000)
        },
       async findComment(id){
        let {data} = await queryComments(id);
         this.comment.data=null;
        this.comment.data=data;
        this.comment.show=true;
       },
      toReplay(index){
           this.replay.index=index;
      },
      toReplay1(index,index1){
        this.replay.index=index;
        this.replay.index1=index1;
      },
      async forReplay(id,id1){
        this.replay.data["comment.id"]=id;
        this.replay.data["userByTargetUserId.id"]=id1;
        this.replay.data["userByRepalyUserId.id"]=this.user.id;
        this.tip.msg="回复中...";
        this.tip.show=true;
        let {data}= await  addReplay(this.replay.data);
        if(data.state=='success'){
          this.tip.msg="回复成功";
          this.findComment(this.data["shop.id"]);
          this.replay.index=null;
        }else{
          this.tip.msg="回复失败,"+data.msg;
        }

        let a=setTimeout(()=>{this.tip.show=false;clearTimeout(a)},3000)
      }
      }
    }
</script>

<style scoped>
.comment{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 1000px;
  margin: auto;
}

.comment .left{
  width: 670px;
  border: 1px solid #00b1ff;
  border-radius: 5px;
  padding: 15px 7px;
  display: flex;
  flex-direction: column;
}
.comment .left textarea{
  width: 600px;
  margin: auto;
  color: black;
}
.comment .left .release{

  width: 600px;
  height: 20px;
  margin: auto;
  margin-top: 15px;
  /*background-color: whitesmoke;*/
}

  .btn{
     border-radius: 5px;
    border: 1px solid rgba(244,90,141,1);
    padding: 3px 15px;
    transition: all 0.3s;
    float: right;
  }

.btn:hover{
   background-color: rgba(244,90,141,1) ;
   color: white;
}
.content ul{
}
  .content ul li{
    display: flex;
    flex-direction: row;
    text-align: left;
    border-bottom: 1px  dotted rgb(215, 215, 215);
    padding-bottom: 20px;
    padding-top: 20px;
  }

.content ul li div{
  /*background-color: red;*/
  width: 580px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
.content ul li div span {
  text-align: right;
}

  .reply{
    width: 500px;
    /*background-color: red;*/
    margin-left: -20px;
    display: flex;
    flex-direction: column;
  }
.comment .left .reply textarea{
  width:560px;
}

.comment .left .reply .btn{
  margin-left: 490px;
  width: 50px;
  padding: 2px 10px;
  height: 40px;
  line-height: 13px;
}

  .replyContent .content{
    width: 585px;
    display: flex;
    flex-direction: row;
    margin-left: -45px;
    /*background-color: deeppink;*/

  }

.replyContent .content p{
  font-size: 10px;
}
.replyContent .content span{
  font-size: 10px;
}
</style>
