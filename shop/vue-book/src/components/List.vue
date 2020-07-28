<template>
    <div>
      <Load :show="!shops"></Load>
       <div class="container col-md-11 col-sm-12  p-1" v-if="shops">
           <ul class="col-md-12 col-sm-12 p-0">
              <li class="col-md-4 col-sm-12 p-0 pr-3" v-for="(item,index) in shops" :key="index">
                   <div class="pl-0 m-0 " style="width: 220px;">
                     <router-link :to="{name:'detail',params:{c:item.sid}}" tag="a" class="img"><img  class="" alt="" :src="'http://anets.top/'+item.preview"></router-link>
                   </div>
                  <div class=" p-0 m-0 pl-2 right">
                      <h2><router-link :to="{name:'detail',params:{c:item.sid}}" tag="a">{{item.name}}</router-link></h2>
                      <p>{{item.discription}} </p>
                       <span class="tags">
                         <!-- <i v-for="(item1,index1) in (item.tags)"> |&nbsp;&nbsp;{{item1}} </i>  -->
                       <i> |&nbsp;&nbsp;{{item.tags}} </i>
                         &nbsp;&nbsp;&nbsp;标签</span>
                      <span class="info">浏览:{{item.views}}  |  下载:{{item.downloads}}  |  {{item.updatetime}}</span>
                  </div>
              </li>
           </ul>
         <div class="container text-center col-sm-12" style="margin-top: 50px" >
           <div id="test1" class=""></div>
         </div>

       </div>
    </div>
</template>

<script>
  import  {getHotShops} from "../api/shop";
 import  Load from './Loading/Load'
  export default {
        name: "List",
    components:{ Load},
      data(){
          return {
             shops:null,
            condition:{
               uid:'',
              start:1,
              size:18
            },
            pageinfo:{
               count:null,
               limit:null
            }
          }
      },
      created(){
          this.gainHotShops();
      },
      mounted(){
          //分页

      },
    watch:{
      condition:{
        handler(newVal,oldVal){

            this.gainNewHotShops();

        },deep:true,immediate:false
      }
    },
    filters:{
    },
      methods:{
          async gainNewHotShops(){
            let {data:res}=await getHotShops('',this.condition.start,this.condition.size);
            this.pageinfo.count=res.data.count;
            this.pageinfo.limit=res.data.limit;
            this.shops=res.data.shops;
          },
          async gainHotShops(){
              let {data:res}=await getHotShops('',this.condition.start,this.condition.size);
              this.pageinfo.count=res.data.count;
              this.pageinfo.limit=res.data.limit;
              this.shops=res.data.shops;
              this.pageHelper();
          },
          pageHelper(){
            layui.use('laypage', ()=>{
              var laypage = layui.laypage;
              //开启location.hash的记录
              laypage.render({
                elem: 'test1'
                ,count: this.pageinfo.count
                ,limit:this.pageinfo.limit
                ,curr: this.condition.start //获取起始页
                ,hash: 'fenye' //自定义hash值
                ,theme: '#ee1289'
                ,jump: (obj, first)=>{
                  //obj包含了当前分页的所有参数，比如：
                  console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                  console.log(obj.limit); //得到每页显示的条数
                  this.condition.start=obj.curr;
                  this.condition.size=obj.limit;
                  //首次不执行
                  if(!first){
                    //do something
                  }
                }
              });
            });
          }
      }
    }
</script>

<style scoped>
.container{
  background-color: white;
}

.container ul{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -20px;
}
.container ul li{
  color: #777;
  display: flex;
  flex-direction: row;
  height: 150px;
  margin-top: 50px;
  width: 100%;
  padding-left: 0px;

  /*border-left: 5px solid rgba(0,0,0,0);*/
  /*background-color: red;*/
}



.container ul li:hover{
  /*border-left: 5px solid #ff0065;*/
  box-shadow:  -5px 0px 20px -5px rgba(0,0,0,.2);
}

.container ul li .right{
  margin-left: -10px;
}
.container ul li img{

  margin-left: 0px;
  width: 220px;
  height: 150px;
  margin-right: 10px;
  /*background-color: deeppink;*/
}

.container ul li h2{
  font-size: 15px;
  font-weight:600;
/*letter-spacing: 2px;*/
  max-height: 36px;
  overflow: hidden;
  /*background-color: crimson;*/
}
.container ul li a{
  color: rgba(0,0,0,0.5);
}

.container ul li a:hover{
  color: #ee1289;
}
.container ul li p{
  font-size: 14px;
  margin-top: 10px;
  height: 61px;
  overflow: hidden;
  /*background-color: crimson;*/
  /*background-color: crimson;*/
}
.container ul li  .info{
  position: absolute;
  font-size: 12px;
  bottom: 0px;
  right: 10px;
  height: 14px;
  overflow: hidden;
}
.container ul li  .tags{
  position: absolute;
  font-size: 12px;
  bottom: 20px;
  right: 10px;
}
</style>
