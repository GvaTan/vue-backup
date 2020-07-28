<template>
  <div id="tab" :style="{'background-color':color.bg,'color':color.fontCommon}" class="container p-0  col-12 ">
        <!-- <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
            <li class="layui-this">排行榜</li>
            <li @click="custom()">自定义</li>
        </ul>
        <div class="layui-tab-content tabContent" >
            <ul class="col-12 col-sm-12" >
               <li  class="col-4 col-sm-2  p-1 p-sm-1" v-for="(item,index) in urlsz" v-if="urlsz&&index<24">
                  <a href="javascript:void(0);" @click="toUrl(item)">
                     <img :src="'http://anets.top/'+item.img" alt="">
                     <span>{{item.name}}</span>
                  </a>
               </li>
            </ul>
        </div>
        </div>   -->
        <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
          <ul class="layui-tab-title">
            <li class="layui-this">排行榜</li>
            <li v-for="(item1,index1) in classfyUrls">{{item1.name}}</li>
              <li @click="custom()">自定义</li>
          </ul>
          <div class="layui-tab-content" >
            <div class="layui-tab-item layui-show" style="min-height:0px">
                 <ul class="col-12 col-sm-12 m-0"  style="position:relative">
                    <li  class="col-4 col-sm-2  p-1 p-sm-1" v-for="(item,index) in urlsz" v-if="urlsz&&index<24">
                        <a href="javascript:void(0);" @click="toUrl(item)">
                          <img :src="'http://anets.top/'+item.img" alt="">
                          <span style="">{{item.name}}</span>
                        </a>
                    </li>
                     <span @click="toRank()" style="position:absolute;bottom:0px;right:0px;font-size:10px;opacity:0.7;cursor:pointer">More</span>
                  </ul>
            </div>
             <div v-for="(item,index) in classfyUrls" class="layui-tab-item" style="min-height:0px" :key="index">
                 <ul class="col-12 col-sm-12 m-0"  style="position:relative" >
                    <li  class="col-4 col-sm-2  p-1 p-sm-1" v-for="(item1,index1) in item.children" v-if="index1<24">
                        <a href="javascript:void(0);" @click="toUrl(item1)">
                          <img :src="'http://anets.top/'+item1.img" alt="">
                          <span style="">{{item1.name}}</span>
                        </a>
                    </li>
                     <span @click="toDetail(item.wid)" style="position:absolute;bottom:0px;right:0px;font-size:10px;opacity:0.7;cursor:pointer">More</span>
                  </ul>
                  <!-- {{item.name}} -->
            </div>
          </div>
        </div> 
  </div>
</template>

<script>
import {getViews,getClassifyUrlRank} from '../../api/index'
export default {
  name: '',
  props:["urlsz"],
  data(){
    return {
       classfyUrls:[]
    }
  },
  created(){
    this.initData();
  },
  mounted(){
    this.initTab()
  },
  computed:{
    color:{
      get(){
        return this.$store.state.color;
      }
    },
    likes:{
      get(){
        return this.$store.state.likes;
      }
    },
    historyView:{
          get(){
              return this.$store.state.historyView;
          },
          set(val){
            this.$store.commit("setHistoryView",val);
          }
    }
  },
  methods:{
    initTab(){
       layui.use('element', function(){
        var element = layui.element;
        
        //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
        var layid = location.hash.replace(/^#test1=/, '');
        element.tabChange('test1', layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项
        
        //监听Tab切换，以改变地址hash值
        element.on('tab(test1)', function(){
          location.hash = 'test1='+ this.getAttribute('lay-id');
        });
      });
    },
    custom(){
      this.$layer.msg("即将上线，敬请期待，你现在可以分享网址到这个网站，一起维护网站内容！谢谢你！")
    },
    async toUrl(item){
       window.open(item.url)

       let {data:res}=await getViews(item.wid);
       console.log(res.msg);
      let a=JSON.stringify(this.historyView);
      let b=JSON.parse(a);
      if(this.historyView.length>=12){
        b.pop();
      }
      // 看历史中是否包含item,有就删除
       b=b.filter(item1=>item1.wid!=item.wid);
      b.unshift(item);
      this.historyView=b;

      //存储到本地
      localStorage.setItem("historyView",JSON.stringify(this.historyView));
      
    },
    async initData(){
          let {data:res} = await getClassifyUrlRank();
          if(res.success){
            this.classfyUrls=res.data;
          }else{
            this.$layer.msg(res.msg);
          }
    },
    toDetail(wid){
      window.open(this.$store.state.searchBasicUrl+"/share/detail?wid="+wid);
    },
    toRank(){
      window.open(this.$store.state.searchBasicUrl+"/share/rank");
    }
  }
}
</script>

<style scoped>
#tab{
  margin-top: 0vh;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
}
.layui-tab-item{
  padding-bottom: 5px !important;
  /* background: gray; */
}

.layui-tab-item{
  min-height:20vh;
  /* max-height:20vh; */
  overflow: hidden;
}

.layui-tab-item ul{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: space-between; */
  padding: 0px;
  /* position: absolute; */
}

.layui-tab-item ul li{
  height: 40px;
 
  /* border: 1px solid red; */
}

.layui-tab-item ul li img{
  width:30px;
  height:30px;
  margin-right: 10px;
  border-radius: 5px;
}

.layui-tab-item ul li a{
  /* background-color: red; */
  color: #777;
  text-decoration: none;
  display: block;
  transition: all 0.5s;
   max-height:30px;overflow:hidden;
}
.layui-tab-item ul li:hover a{
  color: #ee1289;
  
}
.layui-tab-item ul li a img{
  width: 20px;
  height: 20px;
}
</style>
