<template>
  <div id="set" >
      <div class="icon" :style="{'background-color': color.controlPanel,'color':color.controlFont}">
          <ul>
            <li class="basic"  style="position:absolute;bottom:0px">
                 <i @click="hideSet()" class="layui-icon layui-icon-shrink-right" style="font-size:16px"></i>
            </li>
              <li class="theme" style="position:absolute;bottom:30px">
                  <i  class="iconfont icon-zhuti">
                      <div class="themeContent" style="position:absolute;bottom:0px;left:35px;">
                              <ul>
                                    <li @click="changeColor(color0)">原生1无背景</li>
                                   <li @click="changeColor(color01)">原生2无背景</li>
                                   <li  @click="changeColor(color02)">原生3有背景</li>
                                   <li  @click="changeColor(color03)">原生4有背景</li>
                                   <li @click="changeColor(color04)">有背景半透明白主题1</li>

                                    <li @click="changeColor(color05)">有背景半透明白主题2</li>
                                   <li @click="changeColor(color06)">有背景半透明黑色1</li>
                                   <li  @click="changeColor(color07)">有背景半透明黑色2</li>
                                   <li  @click="changeColor(color08)">白黑搭配(推荐默认)</li>
                                   <li @click="changeColor(color09)">白黑搭配2(推荐)</li>

                                    <li @click="changeColor(color10)">黑白搭配1</li>
                                   <li @click="changeColor(color11)">黑白搭配2</li>
                                   <li  @click="changeColor(color12)">黑白搭配3</li>
                                   <li  @click="changeColor(color13)">全透明</li>
                                   <!-- <li @click="removeBg()">原生</li> -->
                                   <!-- <li @click="wait()">自定义</li>// -->
                              </ul>
                      </div>
                  </i>
              </li>
               <li class="basic wallpaper" style="position:absolute;bottom:60px">
                  <i  class="iconfont icon-zhuti1">
                      <div id="wallpaperContent"  class="content" style="overflow:auto">
                               <h2>我的发布</h2>
                                <a :href="this.$store.state.shopBasicUrl+'/user/info'" target="_blank"><button type="button" class="layui-btn "  style="margin:auto;margin-top:10px;background-color:#ee1289">去发布壁纸商品</button>
 </a>
                               <ul v-if="wallpapersSell">
                                    <li v-for="(item,index) in wallpapersSell" style="position:relative" @click="setWallpaper(item)">
                                        <img :src="'http://anets.top/'+item.preview" alt="">
                                     </li>
                              </ul>
                               <h2>我的购买</h2>
                              <a :href="this.$store.state.shopBasicUrl" target="_blank"> <button type="button" class="layui-btn "style="margin:auto;margin-top:10px;background-color:#ee1289">去购买</button>
 </a> 
                               <ul v-if="wallpapersBuy">
                                    <li v-for="(item,index) in wallpapersBuy" style="position:relative" @click="setWallpaper(item)">
                                        <img :src="'http://anets.top/'+'/'+item.preview" alt="">
                                   </li>
                              </ul>
                               <h2>壁纸商城</h2>
                               <div v-if="!wallpapers">数据获取中...</div>
                              <ul v-if="wallpapers">
                                    <li v-for="(item,index) in wallpapers" style="position:relative" @click="setWallpaperFree(item)">
                                        <img :src="'http://anets.top/'+'/'+item.preview" alt="">
                                        <span v-if="item.isfree==1" style="position:absolute;bottom:0px;right:0px;" class="layui-badge layui-bg-green">免费</span>
                                        <!-- <span>上传者：{{item.user.username}}</span> -->
                                    </li>
                              </ul>
                              
                      </div>
                  </i>
              </li>
          </ul>
      </div>
      
  </div>
</template>

<script>
import {getWallpapers,getWallpaper,getWallpapersSell,getWallpapersBuy,getWallpaperByPassword} from '../../api/index'
export default {
  name: '',
  data(){
      return {
          // 原生1无背景
      color0:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,0.8)",
          searchBg:'rgba(255,255,255,0.8)',
          basic:"rgba(255,255,255,0)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0)",
          controlPanel:"rgba(0, 0, 0, 0)",
          controlFont:"#777"
         },
         // 原生2无背景
      color01:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,0.8)",
          searchBg:'rgba(255,255,255,0.8)',
          basic:"rgba(255,255,255,1)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0)",
          controlPanel:"rgba(0, 0, 0, 0)",
          controlFont:"#777"
         },

         // 原生3有背景
      color02:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,1)",
          searchBg:'rgba(255,255,255,1)',
          basic:"rgba(255,255,255,0)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
         },
         // 原生4有背景
      color03:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,1)",
          searchBg:'rgba(255,255,255,1)',
          basic:"rgba(255,255,255,1)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
         },
           // 有背景半透明白主题1
      color04:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,0.8)",
          searchBg:'rgba(255,255,255,0.8)',
          basic:"rgba(255,255,255,0)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
         },
         //有背景半透明白主题2
      color05:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,0.8)",
          searchBg:'rgba(255,255,255,0.8)',
          basic:"rgba(255,255,255,1)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
         },
     //有背景半透明黑色1
      color06:{
          font:"#ee1289",
          fontCommon:"#777",
          searchBg:'rgba(0,0,0,0.8)',
          bg:"rgba(0,0,0,0.8)",
          basic:"rgba(0,0,0,0)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
         },
         //有背景半透明黑色2
      color07:{
          font:"#ee1289",
          fontCommon:"#777",
          searchBg:'rgba(0,0,0,0.8)',
          bg:"rgba(0,0,0,0)",
          basic:"rgba(0,0,0,0.8)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
      },
      //白黑搭配(推荐默认)
      color08:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,1)",
          searchBg:'rgba(255,255,255,1)',
          basic:"rgba(255,255,255,1)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
      },
      //白黑搭配2(推荐)
      color09:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,1)",
          searchBg:'rgba(255,255,255,1)',
          basic:"rgba(255,255,255,0)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
      },
       //黑白搭配1
      color10:{
          font:"#ee1289",
          fontCommon:"#777",
          searchBg:'rgba(0,0,0,0.8)',
          bg:"rgba(0,0,0,0.8)",
          basic:"rgba(0,0,0,0)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
         },
         //黑白搭配2
      color11:{
          font:"#ee1289",
          fontCommon:"#777",
          searchBg:'rgba(0,0,0,0.8)',
          bg:"rgba(0,0,0,0)",
          basic:"rgba(0,0,0,0.8)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
      },
      // 黑白搭配3
      color12:{
          font:"#ee1289",
          fontCommon:"#777",
          searchBg:'rgba(255,255,255,0.8)',
          bg:"rgba(0,0,0,0.8)",
          basic:"rgba(0,0,0,0)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
      },
      // 全透明
      color13:{
          font:"#ee1289",
          fontCommon:"white",
          searchBg:'rgba(255,255,255,1)',
          bg:"rgba(0,0,0,0)",
          basic:"rgba(0,0,0,0)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
      },
        bg:[
            "http://120.55.95.79/group1/M00/00/03/rBEqJl5vXh-ARI37AAGTgNQGafQ573.jpg",
            "http://search.hi.ru/assets/images/translate_bg.jpg",
            "https://w.wallhaven.cc/full/39/wallhaven-398j69.png",
            "http://120.55.95.79/group1/M00/00/03/rBEqJl6QMTCAYy2xABnXVqwkt6Q167.jpg"
        ],
        wallpapers:null,
        wallpapersBuy:null,
        wallpapersSell:null
      }
  },
  created(){
      
      this.initWallpaper();
  },
  mounted(){
      this.listenMouse();
      this.initSet();


  },
  computed:{
    color:{
      get(){
        return this.$store.state.color;
      }
    }
  },
  methods:{
      
     changeColor(color){
         if(color==this.color0||color==this.color01){
            this.removeBg();
         }else{
             this.changeBgz();
         }
          this.$store.commit("setColor",color)
          localStorage.setItem('theme',JSON.stringify(color));
        
        // this.changeBgz();
     },
     wait(){
         this.$layer.msg('敬请期待')
     },
     removeBg(){ // 改变背景
        let url="url('')";
        $("body").css("background-image",url);
        localStorage.setItem("bg",'')
     },
     changeBgz(){ // 改变背景
       let bg=localStorage.getItem("bg");
        if(bg){
            let url="url('"+bg+"')";
            $("body").css("background-image",url);
        }else{
            let url="url('"+this.bg[3]+"')";
            $("body").css("background-image",url);
            localStorage.setItem("bg",this.bg[3]);
        }
    },
    async initWallpaper(){
        let {data:res}=await getWallpapers()
        this.wallpapers=res.data;
        // 得到我上传的壁纸商品
        let {data:res1}=await getWallpapersSell();
        if(res1.success){
            this.wallpapersSell=res1.data.shops;
        }
        // 得到我购买的壁纸商品
         let {data:res2}=await getWallpapersBuy();
        this.wallpapersBuy=res2.data;
        
    },
    async setWallpaperFree(item){
       let {data:res} = await getWallpaper(item.sid);
       if(res.success){
            console.log(res.data);
          this.changeBg('http://anets.top/'+res.data.address);
       }else{
           this.$layer.msg(res.msg);
          let a=setTimeout(()=>{
               window.open(this.$store.state.shopBasicUrl+'/list/'+item.sid+".html");
               clearTimeout(a)
          },1500);
       }
    },
    async setWallpaper(item){
        console.log("设置中...");
       let {data:res} = await getWallpaperByPassword(item.adresss,item.password);
       if(res.success){
           this.$layer.msg("下载图片中，请稍后");
            console.log(res.data);
             this.changeBg('http://anets.top/'+res.data.address);
             console.log("图片地址",'http://anets.top/'+res.data.address);
       }else{
           onsole.log("错误");
           this.$layer.msg(res.msg);
          
       }
    },
    changeBg(urlz){ // 改变背景
      let url="url('"+urlz+"')";
      $("body").css("background-image",url);
      localStorage.setItem("bg",urlz);
    },
    listenMouse(){
        //检测滚动事件
          $(window).bind("mousemove",($event)=>{
            if($event.pageX<3){
              $(".icon").css("left","0px");
            }
          })
    },
    hideSet(){
         $(".icon").css("left","-35px");
         if(!localStorage.getItem("setShow")){
           this.$layer.msg("我在最左边隐藏了哟，鼠标移动到最左边召唤我！🙂");
         }
         localStorage.setItem("setShow",false);
         
    },
    initSet(){
        if(localStorage.getItem("setShow")){
           $(".icon").css("left","-35px");
        }else{
            $(".icon").css("left","0px");
        }
    }
  }
}
</script>

<style scoped>
#set{
z-index: 3;
}

.icon{
    position: fixed;
    width: 35px;
    height: 100vh;
    top:0;
    left:-35px;
    transition: all 0.5s;
    z-index:3;
    
   
}


.icon i{
    font-size: 25px;
    width: 35px;
    text-align: center;
}
.basic {
     width: 35px;
     height:30px;
    /* background-color: red; */
    text-align: center;
}
.theme {
     width: 35px;
     height:30px;
    /* background-color: red; */
    text-align: center;
}
.theme:hover .themeContent{
     display: block;
}
.theme .themeContent{
    width:200px;
    font-size: 15px;
    display: none;
}

.theme .themeContent ul{
    border-top-right-radius: 10px;
    /* background-color: red; */
    overflow: hidden;
}

.theme .themeContent ul li{
    cursor: default;
    color: white;
    background-color: rgba(32, 32, 32, 0.8);
}

.theme .themeContent ul li:hover{
     background-color: rgba(0, 0, 0, 0.8);
}

.wallpaper .content{
    position: fixed;
    height: 100%;
    width:60%;
    background-color: rgba(0, 0, 0, 0.8);
    border-left:1px dotted #ee1289;
    top:0px;
    left:35px;
    text-align: left;
    padding: 10px 20px;
    font-size: 14px;
    display: none;
}
.wallpaper:hover .content{
    display: block;
}
.wallpaper .content ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: space-between; */
}
.wallpaper .content ul li{
    margin: 10px 10px;
    cursor: pointer;

}
.wallpaper .content ul li img{
    transition:all 0.5s;
}
.wallpaper .content ul li:hover img{
 filter: contrast(120%);
}
h2{
   font-size: 20px;
  border-left: 5px solid #ee1289;
   padding-left: 10px;
   margin-top: 20px;
}

/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
     #set{
       display: none;
     }
 }
</style>
