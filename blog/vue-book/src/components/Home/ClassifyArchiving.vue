<template>
  <div id="" >
     <Nav></Nav>
     <div class="all row p-0 m-0">
       
       <div class="right col-10 p-5" style="overflow:auto">
           <ul class="col-12 col-md-8">
             <li v-for="(item,index) in articles" style="position:relative">
               <router-link target="_blank" :to="'/detail/'+item.articleId+'.html'">
                 <img width="170px" height="100px" :src="'http://anets.top/'+item.articleImg" alt="">
               </router-link>
               <div class="content">
                  <router-link target="_blank" :to="'/detail/'+item.articleId+'.html'"><h3>{{item.articleTitle}}</h3></router-link>
                  <p >{{item.discription}}


                    <span style="position:absolute;right:20px;bottom:0px">
                                   {{item.articleDate}} 
                                    <span v-if="item.user&&item.user.userName">上传者:{{item.user.userName}} | </span> 点击:{{item.articleViews}} | 喜欢:{{item.articleLikeCount}} 
                                   <!-- | {{item.tags}} -->
                     </span>
                  </p>
               </div>
             </li>
           </ul>
       </div>
       <div class="left col-2">

           <div id="test1"></div>
            <!-- <ul>
              <li v-for="(item,index) in articleSort">
                  <a  href="javascript:void(0)" @click="getArticles(item.sortId)">{{item.sortName}} </a>
                  <div>
                    <span style="" v-if="index==0" class="layui-badge">{{item.countz}}</span>
                  <span v-if="index==1" class="layui-badge layui-bg-orange">{{item.countz}}</span>
                  <span v-if="index==2" class="layui-badge layui-bg-green">{{item.countz}}</span>
                  <span v-if="index>2" class="layui-badge layui-bg-cyan">{{item.countz}}</span>
                  </div>
              </li>
            </ul> -->
       </div>
     </div>
  </div>
</template>

<script>
import Nav from './Nav'
import {sortArchiving,getSortArchivingArticles} from '../../api/index'
export default {
  name: '',
  components:{Nav},
  data(){
    return {
      articleSort:[],
      articles:[],
      trees:null
    }
  },
  created(){
    this.initData();
    
  },
  methods:{
    recursiveTree(arr){
        for(var item in arr){
            console.log(arr[item]);
            if(arr[item].children!=null){
                this.recursiveTree(arr[item].children);
            }
            console.log(arr[item].id);
             this.appendSpan(arr[item].id,arr[item].info,"layui-badge");
        }
    },
    appendSpan(id,value,classz){
        var parent=$("div[data-id="+id+"] .layui-tree-txt")[0].parentNode;
        parent.style="position:relative"
        var span=document.createElement("SPAN");
        span.className=classz;
        span.style="font-size:10px;right:-50px;bottom:1px;position:absolute"
        span.id=id;
        span.innerHTML=value;
        parent.appendChild(span);
        console.log(parent);
    },
    changeSpan(id){
       this.recursiveTree(this.trees);
        var parent=$("div[data-id="+id+"] #"+id)[0].parentNode;
        // 获取值
        var value=$("div[data-id="+id+"] #"+id)[0].textContent;
        parent.removeChild($("div[data-id="+id+"] #"+id)[0]);
        // 添加新内容
        
        this.appendSpan(id,value,"layui-badge layui-bg-green");

    },
    async initData(){

      $.ajax({
        url:"/api/sort/children",
        type:'get',
        dataType:"json",
        data:null,
        success:(res)=>{
             this.trees=res.data;
             layui.use('tree',async ()=>{
                var tree = layui.tree;
              
                //渲染
                var inst1 = tree.render({
                  elem: '#test1'  //绑定元素
                  ,data:res.data
                  ,click: (obj)=>{
                      console.log(obj.data); //得到当前点击的节点数据
                      console.log(obj.state); //得到当前节点的展开状态：open、close、normal
                      console.log(obj.elem); //得到当前节点元素
                      // alert();
                      this.getArticles(obj.data.id);
                      this.changeSpan(obj.data.id);
                      console.log(obj.data.children); //当前节点下是否有子节点
                      //
                    }

                });
                 
                 // 遍历数据，给元素
                
                this.recursiveTree(this.trees);
                this.changeSpan(this.trees[0].id);
                this.getArticles(this.trees[0].id);
                // this.appendSpan(7,10);
                //  this.appendSpan(2,11);
                 
            });

           
        }
      });
        // let {data:res} =await sortArchiving();
        // this.articleSort=res.data;

        // 
    },
    async getArticles(id){
       let {data:res} = await getSortArchivingArticles(id);
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
  background: url('http://anets.top/group1/M00/00/04/rBEqJl6SuImAfdHEAALOo7y2z_o808.jpg');
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
