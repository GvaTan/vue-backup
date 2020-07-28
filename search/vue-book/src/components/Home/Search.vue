<template>
  <div id="search" class="container p-0 pt-4 col-11 col-sm-12  col-md-6  col-lg-5 col-xl-4">
     <!-- 这是隐藏的获取关键词联想的框 -->
      <div>
          <input id="dataFromBd" type="text" style="display:none">
          <input id="dataFrominput" type="text" v-model="associateKey" style="display:none">
      </div>
      <div id="se">
         <div class="row">
           <input id="wd" v-model="inputValue" :style="{'background-color':color.searchBg,'color':color.font}" class="so col-12 col-md-11 m-auto" @blur="blur()" @focus="focus()" @keyup.38="upPage()" @keyup.40="downPage()" @keydown.enter="search()"  type="text"  autocomplete="off" >
           <i id="soso" style="position:absolute;right:20px;top:50px;cursor:default;color:#777" @click="search()" class="iconfont icon-sousuo "></i>
        </div>
        <div class="row" :style="{'font-size':fontSize.associate+'px','position':'relative'}">
            <!-- 关键词联想 -->
            <div class="associate col-12 col-md-11 col-offset-1  p-0" v-show="smartTipShow">
                  <ul class="associate_ul" :style="{'background-color':color.associate}">
                    <li>
                       <a id="engin"  style="position:relative">
                         <img  style="width:14px;margin-top:-3px;margin-left:-5px" :src="currentEngin.img" alt="">
                         <ul  id="engins">
                          <li @click="changeEngin(item)" v-for="(item,index) in engin">{{item.name}}</li>
                        </ul>
                       </a>
                       <a style="margin-left:4px" @click="comesoon()" href="javascript:void(0)" >图片</a>
                       <a style="margin-left:1px" target="_blank"  :href="'https://video.tf/search/'+inputValue+'.shtml'">视频</a>
                       <a style="margin-left:1px" target="_blank"  :href="'http://www.iciba.com/'+inputValue" >翻译</a>
                       <a style="margin-left:1px" @click="comesoon()" href="javascript:void(0)">音乐</a>
                       <a style="margin-left:1px" @click="comesoon()" href="javascript:void(0)">磁力</a>
                       <a style="margin-left:1px" @click="comesoon()" href="javascript:void(0)">文档</a>
                       <a style="margin-left:1px" target="_blank"  :href="'https://s.weibo.com/weibo/'+inputValue">微博</a>
                    </li>
                      <li v-if="searchedHisoryShow&&inputValue==''" v-for="(item,index) in searchedHisory" :style="{'background-color':index==currentIndex?color.associateLiHover:'','transition':'all 0.4s','padding-left':index==currentIndex?'15px':''}" ><a @click="search(item)" href="javascript:void(0)">
                         {{item}}
                        </a>
                         <i @click="removeHistory(item)" style="font-weight:bold;float:right;margin-right:10px" class="iconfont icon-shanchu"></i>
                        </li>
                     <li v-if="inputValue!=''" v-for="(item,index) in smartTipItems" :style="{'background-color':index==currentIndex?color.associateLiHover:'','transition':'all 0.4s','padding-left':index==currentIndex?'15px':''}" ><a @click="search(item)" href="javascript:void(0)" style="display:block">{{item}}</a></li>
                   
                    <li v-if="translate&&translate!=''"  :style="{'background-color':index==currentIndex?color.associateLiHover:'','position':'relative','transition':'all 0.4s','padding-left':index==currentIndex?'15px':''}" >
                      <a target="_blank" :href="'http://www.iciba.com/'+inputValue" style="position:absolute;bottom:0px;left:0px;display:block;border-left:5px solid rgba(238,18,137,0.7);height:20px;line-height:20px;padding-left:5px">{{translate}}</a>
                    </li>
                    
                    <!-- <li v-if="inputValue!=''" v-for="(item,index) in associateData" :style="{'background-color':index==currentIndex?color.associateLiHover:'','transition':'all 0.4s','padding-left':index==currentIndex?'15px':''}" ><a @click="search(item)" href="javascript:void(0)">{{item}}</a></li> -->
                     <!-- <li></li> -->
                  </ul>
            </div>
        </div>
      </div>
       
  </div>
</template>

<script>
import {getTanslate} from '../../api/index'
export default {
  name: 'Search',
  data(){
    return {
       associateKey:"",
       associateData:[],
       inputValue:"",
      //  上下键按键切换联想位置
      countDownAndUpTime:0,
      startTime:0,
      isRecordTime:true,
      isUp:true,//记录键按下后是否释放
      isExcute:true,
      isExcuteUp:true,
      currentIndex:-1,//这是记录当前选中的li索引，用来与真实索引比较，相同则添加样式
      isPage:false,//这是当按键为上下键时存储input临时值
      // 搜索引擎
      currentEngin:{name:"百度",baseUrl:"https://www.baidu.com/s?wd=",suffix:'',img:"../../../static/images/engin/se_1.png"},
      engin:[
        {name:"百度",baseUrl:"https://www.baidu.com/s?wd=",suffix:'',img:"../../../static/images/engin/se_1.png"},
        {name:"Yandex",baseUrl:"https://yandex.com/search/?text=",suffix:'',img:"../../../static/images/engin/yandex.png"},
        {name:"Bing",baseUrl:"https://www.bing.com/search?q=",suffix:'',img:"../../../static/images/engin/se_2.png"},
        {name:"搜狗",baseUrl:"https://www.sogou.com/sogou?query=",suffix:'',img:"../../../static/images/engin/se_3.png"},
        {name:"360",baseUrl:"https://www.so.com/s?q=",suffix:'',img:"../../../static/images/engin/se_4.png"},
        {name:"Google",baseUrl:"https://www.google.com.hk/search?q=",suffix:'',img:"../../../static/images/engin/se_5.png"},
        {name:"秘迹",baseUrl:"https://mijisou.com/?q=",suffix:'',img:"../../../static/images/engin/mj.png"},
        
      ],
      // 控制显示
      smartTipShow:false,
      searchedHisoryShow:false,
      // 搜索历史相关
      searchedHisory:[],
      searchingHistory:[],
      // 翻译
      translate:''
       
    }
  },
  computed:{
    color:{
      get(){
        return this.$store.state.color;
      }
    },
    fontSize:{
      get(){
        return this.$store.state.fontSize;
      }
    },
    smartTipItems:{
      get(){
        return this.searchingHistory.concat(this.associateData);
      }
    }
  },
  created(){
    this.initEngin();
    this.initSearchHistory();

    $(document).bind('click',(e)=>{
      var e=window.event||e;
      if("INPUT"==e.target.tagName||"associate_ul"==e.target.parentNode.className||"associate_ul"==e.target.parentNode.parentNode.className){
           //说面鼠标在
           this.smartTipShow=true;
      }else{
           this.smartTipShow=false;
      }
      console.log(e.target.parentNode);
    })
  },
  watch:{
    inputValue:{
      handler(newval,oldval){
         if(this.isPage){
           console.log(666);
           return;
         }
         console.log(999);
         if(newval!=''){  //输入不为空
            this.associateKey=newval;//联想的关键字
            this.changeAssociateData();
            this.gainTranslate(newval);

            // 从历史搜索中匹配
            for(var index in this.searchedHisory){
              // 去除重复记录
                 this.searchingHistory=this.searchingHistory.filter(item=>item!=this.searchedHisory[index]);
                 if(this.searchedHisory[index].indexOf(newval)!=-1){
                    this.searchingHistory.push(this.searchedHisory[index]);
                 }
            }

         }else{
           this.translate=null;
            this.searchingHistory=[];
            this.changeAssociateData();
         }
      },deep:true,immediate:true
    }
  },
  methods:{
    async gainTranslate(query){
         let {data:res} = await getTanslate(query);
         if(res&&res.translateResult[0][0]){
            this.translate=res.translateResult[0][0].tgt;
            console.log(res.translateResult[0][0].tgt);
         }else{
            this.translate=null
         }
    },
    search(item){
      if(item){
         window.open(this.currentEngin.baseUrl+item+this.currentEngin.suffix)
         this.recordSerchHistory(item);
      }else{
         window.open(this.currentEngin.baseUrl+this.inputValue+this.currentEngin.suffix)
         this.recordSerchHistory(this.inputValue);
      }
    },
    changeAssociateData(){
         let times=setInterval( ()=> {
                let datas=$("#dataFromBd").val();
                // console.log(datas);
                if(datas!=''){
                  let newData=datas.split(',');
                  this.associateData=newData;
                  clearInterval(times);
                }else{
                  this.associateData=[];
                  clearInterval(times);
                  setTimeout(()=>{
                    
                  },300)
                }
          },200);
    },
    upPage(){
          this.isPage=true;
          this.countDownAndUpTime=new Date()-this.startTime;
          // console.log(this.countDownAndUpTime);
          this.isRecordTime=true;
          this.isUp=true;
          this.isExcute=true;
          if(this.isExcuteUp){
            this.upPages();
          }
          
    },
    upPages(){
      if(this.currentIndex>=0){
        if(this.currentIndex==0){
          // alert(this.inputValueTemp);
          this.inputValue=this.associateKey;
          //  console.log("ss",this.associateKey);
          this.currentIndex=-1;
        }else{
          this.currentIndex-=1;
          let nowIndex=this.currentIndex;
          let historyLength=this.searchHistoryLength;
         
          this.inputValue=this.smartTipItems[nowIndex];
          
          // console.log(nowIndex);
        }

      }else{
        // alert(2);
        this.currentIndex=this.smartTipItems.length-1;
        let nowIndex=this.currentIndex;
        this.inputValue=this.smartTipItems[nowIndex];
        
      }
    },
    downPage(){
          this.isPage=true;
          this.countDownAndUpTime=new Date()-this.startTime;
          // console.log(this.countDownAndUpTime);
          this.isRecordTime=true;
          this.isUp=true;
          this.isExcute=true;
           if(this.isExcuteUp){
             this.downPages();
           }
    },
    downPages(){

      this.currentIndex+=1;

      let nowIndex=this.currentIndex;

      this.inputValue=this.smartTipItems[nowIndex];
     

      if(this.currentIndex>=this.smartTipItems.length){
          this.currentIndex=-1;
          this.inputValue=this.associateKey;
      }
    },
    comesoon(){
      this.$layer.msg("comming soon ...😀");
    },
    changeEngin(item){
      if(item.name=="Google"){
        this.$layer.msg("提示：谷歌需要翻墙🙂，翻墙找我qq1632414557");
      }
      console.log("切换");
      this.currentEngin=item;
      localStorage.setItem("engin",JSON.stringify(item));
    },
    initEngin(){
      let engin=localStorage.getItem("engin");
      if(engin){
          this.currentEngin=JSON.parse(engin);
      }
    },
    blur(){//输入框离开焦点
        // this.smartTipShow=false;
    },
    focus(){
        this.smartTipShow=true;
        this.searchedHisoryShow=true;
    },
    recordSerchHistory(item1){//记录搜索历史
       let len=this.searchedHisory.length;
       if(len>20){
          //  删除随后一个
          this.searchedHisory.pop();
       }
      //  检查重复记录，如果有就删除
      this.searchedHisory=this.searchedHisory.filter(item=>item!=item1);
       //  记录历史
       let a=JSON.stringify(item1);
       let b=JSON.parse(a);
       this.searchedHisory.unshift(b);

       localStorage.setItem("searchHistory",JSON.stringify(this.searchedHisory));
    },
    initSearchHistory(){
      let history=localStorage.getItem("searchHistory");
      if(history){
          this.searchedHisory=JSON.parse(history);
      }
    },
    removeHistory(item1){
        this.searchedHisory=this.searchedHisory.filter(item=>item!=item1);
        localStorage.setItem("searchHistory",JSON.stringify(this.searchedHisory));
    }
  }
  
}
</script>

<style scoped>
#search{
    /* background-color: red; */
    justify-content: center;
    margin-top: 20vh; 
    height: 15vh;
    transition: all 0.5s;
    z-index:5;
     
}
#wd{
  padding-right: 30px;
}
#se{
   margin-top: 15px;
}

/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
     #soso{
       right:0px !important;
     }
 }
.so{
    /* height: 36px; */
    height:40px;
    outline: none;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
}
.so:hover{
     box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
}

.associate{
  position: absolute;
  left:50%;
  transform: translate(-50%,0);
  z-index: 999;
}
.associate ul{
   list-style: none;
   padding: 0px;
   /* background-color: rgba(0,0,0,0.9); */
   /* font-size: 14px; */
    /* border: 1px solid rgba(0,0,0,0.1); */
   box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
  
}
.associate ul li{
  padding-left: 10px;
   height: 25px;
   line-height: 25px;
       /* overflow: hidden; */
  
}
.associate ul li:hover{
  background-color: rgba(255, 255, 255, 0.04);
}

#engin #engins{
  display: none;
 
  position:absolute;top:18px;left:-10px;background-color:rgba(0,0,0,0.9);
  /* background-color: red;
  height: 300px; */
   z-index: 1999;
}
#engin:hover #engins{
  display: block;
}
#engin #engins li{
  cursor: default;
  width: 100px;
  color: white;
  padding: 0px 10px;
}
</style>
