<template>
  <div id="home" class="" >
      <div id="topz" style="z-index:5; background:inherit">
        <Search></Search>
      </div>
      <div id="basics" v-if="urlsz">
          <div id="basic"  :style="{'background-color':color.basic}" class="container p-0  col-12 col-sm-12  col-md-9  col-lg-8 col-xl-7">
              <History> </History>     
              <Tab :urlsz="urlsz"></Tab>  
          </div>
      </div>
      <Recommend :urls="all"></Recommend> 


      <Set></Set>

      <div class="control" :style="{'color':color.controlFont,'z-index':'3'}">
         <i @click="scollTop()" v-if="moveCount==0" :style="{'background-color':color.control}" class="layui-icon layui-icon-up"></i>
         <i @click="scollBottom()"  v-if="moveCount!=0" :style="{'background-color':color.control}" class="layui-icon layui-icon-down"></i>
         <i @click="prevBg()" :style="{'background-color':color.control}" class="layui-icon layui-icon-left"></i>
         <i @click="nextBg()" :style="{'background-color':color.control}" class="layui-icon layui-icon-right"></i>
         <p  v-if="user!=null"  :style="{'background-color':color.control,'position':'relative','height':'30px','margin-right':'5px','border-radius':'5px','padding':'0px 5px'}" >
           <a v-if="user==false"  :href="this.$store.state.passportBasicUrl+'/user/login?from='+this.$store.state.searchBasicUrl" style="font-size:14px">未登录</a>
            <a v-if="user" target="_blank"  :href="this.$store.state.shopBasicUrl+'/user/info'" style="font-size:14px">{{user.username}}</a>
         </p>
         <p id="time" :style="{'background-color':color.control,'position':'relative'}" v-if="simpleTime">{{simpleTime}} 
           <span id="fulltime" :style="{'background-color':color.controlPanel,'color':color.controlFont,'position':'absolute','bottom':'30px','right':'-10px'}">{{fullTime}}</span>
           </p>
      </div>
  </div>
</template>

<script>
import Search from "./Home/Search" 
import History from './Home/History'
import Tab from './Home/Tab'
import Recommend from './Home/Recommend'
import Set from './Home/Set'
import {getChildren,getRank} from "../api/index"
export default {
  name: 'Home',
  components:{Search,History,Tab,Recommend,Set},
  data(){
    return {
      moveCount:0,
      all:null,
      // 时间相关
      hour:null,
      minute:null,
      second:null,
      week:null,
      simpleTime:null,
      fullTime:null,
      // 排行榜
      urlsz:null



    }
  },
  computed:{
    color:{
      get(){
        return this.$store.state.color;
      }
    },
    user:{
      get(){
         return this.$store.state.user;
      }
    }
  },
  created(){
    // 排行榜
    this.initDataRank()
    //初始化推荐数据
    this.initData()
  },
  mounted(){
     this.moveRecommend()
     this.initTime()
  },
  watch:{
    moveCount:{
      handler(newval,oldval){
         
      },deep:true,immediate:false
    }
  },
  methods:{
     moveRecommend(){
       $(document).bind("mousewheel DOMMouseScroll",  (e)=> {
   
         if($("#wallpaperContent").css('display')=="block"){
              // console.log("显示了");
               return;
         }
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
        if (delta > 0) {
            // 向上滚
             this.moveCount-=delta;

        } else if (delta < 0) {
            // 向下滚
            this.moveCount-=delta;
            
        }
         console.log("wheeldown",this.moveCount);
         
        var bottom=this.moveCount*100;
        if(bottom>0){
             var marginTop=180-this.moveCount*25;
            if(marginTop>0){
                $("#search").animate({'margin-top':marginTop},0)
            }else{
                  $("#search").animate({'margin-top':0},0)
            }
              $("#basics").animate({opacity:1-this.moveCount*0.1},0)
            $("#basics").animate({height:500-this.moveCount*100},0)
             $("#recommend").animate({bottom:bottom},0)
        }else{
             $("#recommend").animate({bottom:0},0);
              $("#basics").animate({opacity:1},0)
             this.moveCount=0;
        }
        
      });
        
     },
     async initData(){
         let {data:res}= await getChildren();
         if(res.success){
              this.all=res.data;
              console.log(this.all);
         }else{
              this.$layer.msg("获取出错，请检查你的网络！");
         }
     },
    async initDataRank(){
      let {data:res} = await getRank();
      this.urlsz=res.data;
      this.initHistoryView();
    },
     initTime(){
       let timer1=setTimeout(()=>{
          setInterval(()=>{
            this.countTime();
          },500);
        },3000);
     },
     countTime(){
        // alert(1);
        var time=new Date();
        var y=time.getFullYear();
        var mon=time.getMonth()+1;
        var d=time.getDate();
        var w=time.getDay();
        var week="";
        var hourzzz=time.getHours();
        this.hour=hourzzz;
        var h= hourzzz+"";
        var h_lenth=h.length;


        var minutezzz=time.getMinutes();
        this.minute=minutezzz;
        var min=minutezzz+"";
        var min_lenth=min.length;
        // alert(min_lenth);

        var secondzzz=time.getSeconds();
        this.second=secondzzz;
        var s=secondzzz+"";
        var s_lenth=s.length;

        // alert(min);
        if(w==0){
          week="日";
          this.week="周日"
        }else if(w==1){
          week="一";
          this.week="周一"
        }else if(w==2){
          week="二";
          this.week="周二"
        }else if(w==3){
          week="三";
          this.week="周三"
        }else if(w==4){
          week="四";
          this.week="周四"
        }else if(w==5){
          week="五";
          this.week="周五"
        }else{
          week="六";
          this.week="周六"
        }

        var minutes;
        if(min_lenth==1){
          minutes="0"+min;
        }else{
          minutes=min;
        }
        var seconds;
        if(s_lenth==1){
          seconds="0"+s;
        }else{
          seconds=s;
        }

        var hours;
        if(h_lenth==1){
          hours="0"+h;
        }else{
          hours=h;
        }


        var simpleTime=hours+":"+minutes+":"+seconds;
        var fullTime=y+"年"+mon+"月"+d+"日"+" "+"星期"+week;
        this.simpleTime=simpleTime;
        this.fullTime=fullTime;

        // $("#stime").html(simpleTime);
        // $("#fulltime").html(fullTime);
      },
      scollBottom(){//滚动到最底部
      // alert(1);
                $("#search").animate({'margin-top':180},0)
          
              $("#basics").animate({opacity:1},0)
            $("#basics").animate({height:500},0)
           $("#recommend").animate({bottom:0},0);
             setTimeout(()=>{
                this.moveCount=0;
             },500);
      },
      scollTop(){
        var height=document.body.clientHeight-$("#topz").height();
        // console.log();
        console.log(height);
         $("#search").animate({'margin-top':0},0)
          
              $("#basics").animate({opacity:0},0)
            $("#basics").animate({height:0},0)
           $("#recommend").animate({bottom:height},0);
             setTimeout(()=>{
                this.moveCount=height/100;
             },500);
      },
    initHistoryView(){
      let json=localStorage.getItem("historyView");
       // 没有历史数据
        // 获取排行榜信息作为
      if(json){
          let data = JSON.parse(json);
          this.$store.commit("setHistoryView",data);
      }else{
        // 没有历史数据
        // 获取排行榜信息作为
        let data=this.urlsz.slice(0,12);
          this.$store.commit("setHistoryView",data);
      }
    },
    prevBg(){
        // 检查是否有cookie,wallpaperIndex
        let index = this.$cookie.get("wallpaperIndex");
        if(index){
            // console.log("cookie",cookie);
            if(index==0){
               this.$layer.msg("我上面没有了😭");
            }else{
              index--;
              this.$layer.msg("正为下载上一张壁纸...");
              this.changeBg(this.$store.state.randomBasicWallpaperUrl+index+"&random="+Math.random());
            }
        }else{
            // this.$layer.msg("未获取到cookie");
             this.$layer.msg("正为你随机挑选一张免费壁纸...");
             this.changeBg(this.$store.state.randomBasicWallpaperUrl+"&random="+Math.random());
        }
    },
    nextBg(){
          // 检查是否有cookie,wallpaperIndex
        let index = this.$cookie.get("wallpaperIndex");
        //  let length = this.$cookie.get("wallpaperLength");
        if(index){
            // console.log("cookie",cookie);
           
              this.$layer.msg("正为下载下一张壁纸...");
              index++;
              this.changeBg(this.$store.state.randomBasicWallpaperUrl+index+"&random="+Math.random());
           
        }else{
            this.$layer.msg("正为你随机挑选一张免费壁纸...");
            this.changeBg(this.$store.state.randomBasicWallpaperUrl+"&random="+Math.random());
            //  this.$layer.msg("正在下载...");
        }
    },
    changeBg(urlz){ // 改变背景
      let url="url('"+urlz+"')";
      $("body").css("background-image",url);
      localStorage.setItem("bg",urlz);
    },
    comesoon(){
      this.$layer.msg("comming soon ...😀");
    }
  }
  
}
</script>

<style scoped>
#home{
    /* background:inherit */
    transition: all 0.5s;
}

#basic{
  border-radius: 5px;
}
#basics{
  overflow: hidden;
  transition: all 0.5s;
  
}


#recommend{
  position: fixed;
  width: 100%;
  height: 30px;
  bottom: 0px;

   /* bottom: 200px; */
  /* background: inherit; */
  z-index: -1;
  transition: all 0.5s;
}


.control{
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 0px 10px;
  padding-right: 0px;
  height:30px;
  line-height: 30px;;
  border-top-left-radius: 5px;
  cursor: default;
  display: flex;
  flex-direction: row;

}
#time{
   box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
   height: 30px;padding: 0px 5px;
   line-height: 30px;
   margin-right: 0px;
}
.control i{
  margin-right:10px;
  width:30px;
  text-align: center;
  border-radius: 5px;
   box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
}
#time:hover #fulltime{
  display: block;
}
#fulltime{
  border-top-left-radius: 5px;
  padding: 0px 20px;
  width:150px;
  color: white;
  display: none;
   box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
  
}

/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
     #topz{
       background: transparent !important;
       margin-top:-8vh;
     }

     #basics{
        margin-top:10vh;
     }
 }
</style>
