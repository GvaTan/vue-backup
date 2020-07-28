<template>
  <div id="" class="right" >
        <div class="content container m-0 p-2 col-12">
                  <div class="timez container col-12">
                       博客已安全运行 {{time.day}}天{{time.hour}}小时{{time.min}}分{{time.second}}秒
                  </div>
                  <div class="rank">
                       <h6>点击排行</h6>
                       <hr class="layui-bg-gray" style="margin:5px">
                      <ul>
                          <li v-for="(item,index) in rank" style="position:relative">
                             <span v-if="index>2" style="position:absolute;left:-15px;top:12px">{{index+1}}</span>
                             <span v-if="index==1" style="position:absolute;left:-20px;top:13px" class="layui-badge layui-bg-green">{{index+1}}</span>
                              <span v-if="index==2" style="position:absolute;left:-20px;top:13px" class="layui-badge layui-bg-cyan">{{index+1}}</span>
                             <span v-if="index==0" style="position:absolute;left:-20px;top:13px" class="layui-badge">{{index+1}}</span>
                              <a target="_blank" :href="'/detail/'+item.articleId+'.html'">{{item.articleTitle}}</a>
                          </li>
                      </ul>
                  </div>
                  <div class="recommend">
                      <h6>随机推荐</h6>
                       <hr class="layui-bg-gray" style="margin:5px">
                      <ul>
                          <li v-for="(item,index) in rank1">
                               <a target="_blank" :href="'/detail/'+item.articleId+'.html'">{{item.articleTitle}}</a>
                          </li>
                      </ul>
                  </div>
                  <div class="friend">
                      <h6>友情链接</h6>
                       <hr class="layui-bg-gray" style="margin:5px">
                      <ul>
                          <li v-for="(item,index) in friend">
                               <a target="_blank" :href="item.url">{{item.title}}</a>
                          </li>
                      </ul>
                  </div>
              </div>
  </div>
</template>

<script>
import {getViews,getlike} from '../../api/index'
export default {
  name: '',
  data(){
      return {
          rank:[
          ],
          rank1:[],
          time:{
              day:'00',
              hour:'00',
              min:"00",
              second:"00"

          },
          friend:[
             {title:"百度",url:"http://anets.top"},
             {title:"A网导航",url:"http://anets.top"},
             {title:"A网导航",url:"http://anets.top"},
             {title:"Bing",url:"http://anets.top"},
             {title:"A网导航",url:"http://anets.top"},
             {title:"A网导航",url:"http://anets.top"},
             {title:"A网导航",url:"http://anets.top"},{title:"A网导航",url:"http://anets.top"}
          ]
      }
  },
  created(){
      let startTime=1587346303820;
      setInterval(()=>{
          this.countTime(startTime);
      },1000);


      this.initData();
  },
  methods:{
      countTime(time){
         let current=new Date().getTime();
         //s数
         let interval=(current-time)/1000;
        //  根据s数计算天，时分秒
        this.time.day=parseInt(interval/(60*60*24));
         this.time.hour=parseInt((interval%(60*60*24))/(60*60));
         this.time.min=parseInt(((interval%(60*60*24))%(60*60))/60);
         this.time.second=parseInt(((interval%(60*60*24))%(60*60))%60);
        // console.log(second);
         
      },
      async initData(){
          let {data:res} =await getViews(0,10);
          this.rank=res.data;

          let {data:res1} =await getlike(0,10);
          this.rank1=res1.data;
      }
  }
}
</script>

<style scoped>
.timez{
    background-color: #01aaed;
    height: 39px;
    line-height:39px;
    color: white;
    font-size: 12px;
    text-align: center;
}
.right{
    
    margin-top:10px;
}
.right .content .rank{
    margin-top: 10px;
}

.right .content .recommend{
    /* margin-top: 5px; */
}

.right .content{
    background-color: white;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #777;
}
.right .content ul{
    padding-left: 20px;
    margin-top: -7px;
}
.right .content ul li{
    list-style-type:  disc !important;
    height: 30px;
    padding-top: 5px;
    /* overflow-y: hidden; */
}

.right .content .friend ul{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   
}
.right .content .friend ul li{
    list-style-type:  none !important;
    height: 30px;
    padding-top: 5px;
    margin:5px;
    /* background-color: red; */
    /* overflow-y: hidden; */
}
.right .content .friend ul li a{
    text-decoration: none;
    display: block;
    height:30px;
    line-height: 30px;
     /* overflow: auto; */
     padding:0px 10px;
     border-radius: 5px;
}

.right .content .friend ul li a:hover{
    background-color: black;
   
    color:white;
}

.right .content .rank ul li{
    list-style-type: none !important;
    /* background-color: red; */
}
.right .content a{
    color: #777;
    /* background-color: red; */
    display: inline-block;
    height:25px;
    line-height: 36px;
     overflow: hidden;
}
</style>
