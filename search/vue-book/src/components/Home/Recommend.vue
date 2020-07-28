<template>
  <div id="recommend">
        <div class="tips container p-0 col-12 col-sm-12  col-md-11  col-lg-10 col-xl-9">
            <ul id="previewz" class="col-12" style="position:relative">
               <i v-if="down" @click="hid()"  :style="{'background-color':color.control}" class="hid layui-icon layui-icon-down"></i>
               <i v-if="!down" @click="show()"  :style="{'background-color':color.control}" class="hid layui-icon layui-icon-up"></i>
                 <i v-if="pageHelper.start!=0" @click="prev()" style="position:absolute;left:-30px;margin-top:50px;color:#ee1289;font-weight:bold" class="layui-icon layui-icon-prev"></i>
                <li v-for="(item,index) in urls5" class="col-2 p-0" :style="{'background-color':color.control}">
                     <a  target="_blank" :href="'/share/detail?wid='+item.wid">
                         <span>{{item.name}}</span>
                         <img :src="'http://anets.top/'+item.img" alt="">
                     </a>
                </li>
                <i v-if="urls&&pageHelper.start+pageHelper.limit<urls.length" @click="next()" style="position:absolute;right:-30px;margin-top:50px;color:#ee1289;font-weight:bold" class="layui-icon layui-icon-next"></i>
            </ul>
        </div>
        <div class="content" :style="{'background-color':color.basic}">
            <div class=" container p-0 col-12 col-sm-12  col-md-11  col-lg-10 col-xl-9">
                 <div v-for="(item,index) in urls">
                    <a name="333" :href="'/share/detail?wid='+item.wid"><h2>{{item.name}}</h2></a>
                    <div>
                        <div class="layui-tab layui-tab-card" :style="{'background-color':color.bg}">
                        <ul class="layui-tab-title">
                            <li class="layui-this" v-for="(item1,index1) in item.children" :key="index1">{{item1.name}}</li>
                        </ul>
                        <div id="urlsz" class="layui-tab-content" style="" :key="index1">
                            <div style="" :class="{'layui-tab-item':true,'layui-show':index1==0} " v-for="(item1,index1) in item.children">
                              <ul style="position:relative">
                                <li  class="col-4 col-sm-2  p-1 p-sm-1" v-for="(item3,index3) in item1.children" :key="index3">
                                     <a href="javascript:void(0)" @click="toUrl(item3)" >
                                       <img :src="'http://anets.top/'+item3.img" alt="">
                                       <span>{{item3.name}}</span>
                                     </a>
                                </li>
                                <li class="col-4 col-sm-2  p-1 p-sm-1" v-if="!item1.children"><a target="_blank" href="/share/upUrl">暂无,让我去完善</a></li>
                                
                                
                                <li class="col-4 col-sm-2  p-1 p-sm-1" style="position:absolute;bottom:-30px;right:0px"><a target="_blank" :href="'/share/detail?wid='+item.wid">
                                   <span style="position:absolute;bottom:5px;right:10px;font-size:10px">More</span>
                                  </a></li>
                              </ul>
                              <div class="clear:both;"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
import {getViews} from '../../api/index'
export default {
  name: '',
  props:["urls"],
  data(){
      return {
          showType:[
            {img:"https://www.bing.com/th?id=OPN.RTNews_f_xJ_xF5hQ4ybluwukq4eA&w=372&h=176&c=7&rs=2&qlt=80&cdv=1&pid=PopNow",name:"区块链",url:"#btc"},
            {img:"https://www.bing.com/th?id=OPN.RTNews_P56qdEIeuu_7R_jRdYDDyg&w=372&h=176&c=7&rs=2&qlt=80&cdv=1&pid=PopNow",name:"影视",url:"#"},
            {img:"https://www.bing.com/th?id=OPN.RTNews_HVb-5yhQbohc8k_aADQVrA&w=372&h=176&c=7&rs=2&qlt=80&cdv=1&pid=PopNow",name:"音乐",url:"#"},
            {img:"https://www.bing.com/th?id=OPN.RTNews_f_xJ_xF5hQ4ybluwukq4eA&w=372&h=176&c=7&rs=2&qlt=80&cdv=1&pid=PopNow",name:"区块链",url:"#"},
            {img:"https://www.bing.com/th?id=OPN.RTNews_P56qdEIeuu_7R_jRdYDDyg&w=372&h=176&c=7&rs=2&qlt=80&cdv=1&pid=PopNow",name:"影视",url:"#"},
          
          ],
          recommend:[],
          pageHelper:{
            start:0,
            limit:5
          },
          down:true
      }
  },
  computed:{
    color:{
      get(){
        return this.$store.state.color;
      }
    },
    urls5:{
      get(){
        if(this.$props.urls){
          return this.$props.urls.slice(this.pageHelper.start,this.pageHelper.limit);
        }else{
          return []
        }
      }
    }
  },
  mounted(){
      this.initShow()
  },
  methods:{
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
    prev(){
      if(this.pageHelper.start==0){
          this.$layer.msg("到头了🙂");
      }else{
        this.pageHelper.start--;
      }
    },
    next(){
      if(this.pageHelper.start+this.pageHelper.limit>=this.urls.length){
         this.$layer.msg("到底了🙂");
      }else{
        this.pageHelper.start++;
      }
    },
    hid(){
        $("#previewz").css('margin-top','30px');
        this.down=false;
        localStorage.setItem("previewz",'30');
    },
    show(){
        $("#previewz").css('margin-top','0px');
        this.down=true;
        localStorage.setItem("previewz",'0');
    },
    initShow(){
      let a=localStorage.getItem("previewz");
      if(a){
        if(a=='0'){
           this.down=true;
        }else{
           this.down=false;
        }
        // alert(a)
         $("#previewz").css('margin-top',a+'px');
      }
    }
  }
}
</script>

<style scoped>
/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
     #previewz{
       margin-top:30px !important;
     }
 }

#recommend{
  /* background-color: red; */
  /* position: relative;
  z-index: 999; */
  z-index: -1;

}

.tips{
   color:white;
   /* background-color: green; */
   position: absolute;
   height: 30px;
   top:0;
   left:50%;
   transform: translate(-50%,0);
}


.hid{
position:absolute;left:-35px;margin-top:0px;font-weight:bold;
height:30px;
line-height: 30px;
text-align: center;
border-radius: 2px;
width: 30px;
/* color: white; */
}

.tips ul{
    padding: 0px;
     height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: red; */
}


.tips ul li{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    
    padding: 1px 20px;
    text-align: left;
     box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);

}

.tips ul li a{
    display: flex;
    flex-direction: column;
}
.tips ul li a span{
     height: 30px;
    line-height: 30px;
   padding-left: 20px;
}
.tips ul li a img{
    width: 100%;
}
#recommend .content{
  position: relative;
  margin-top: 30px;
  z-index:-30;
  width: 100%;
  /* height:100vh; */
  
  overflow: auto;
  padding-top: 100px;
}

#recommend .content h2{
    border-left: 5px solid #ee1289;
    padding-left: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    margin-top: 50px;
}





#urlsz ul{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: space-between; */
  padding: 0px;
  height: auto;
  /* position: absolute; */
  /* background-color: red; */
}

#urlsz ul li{
  height: 40px;
  /* border: 1px solid red; */
}

#urlsz ul li img{
  width:30px;
  height:30px;
  margin-right: 10px;
  border-radius: 5px;
}

#urlsz ul li a{
  /* background-color: red; */
  color: #777;
  text-decoration: none;
  display: block;
  transition: all 0.5s;
}
#urlsz ul li:hover a{
  color: #ee1289;
}
#urlsz ul li a img{
  width: 20px;
  height: 20px;
}

</style>
