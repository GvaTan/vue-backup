<template>
    <div>
      <Search></Search>
      <Navigation></Navigation>
      <div class="gallery">
           <div class="left">
             <img :src="img.link" alt="" width="100%">
             <div class="change">
                 <ul>
                   <li :class="{orignalBg:img.index!=0,bg:img.index==0}" @mouseover="changeImg(0)"></li>
                   <li :class="{orignalBg:img.index!=1,bg:img.index==1}" @mouseover="changeImg(1)"> </li>
                   <li :class="{orignalBg:img.index!=2,bg:img.index==2}" @mouseover="changeImg(2)"> </li>
                   <li :class="{orignalBg:img.index!=3,bg:img.index==3}" @mouseover="changeImg(3)"> </li>
                   <li :class="{orignalBg:img.index!=4,bg:img.index==4}" @mouseover="changeImg(4)"> </li>
                   <li :class="{orignalBg:img.index!=5,bg:img.index==5}" @mouseover="changeImg(5)"> </li>
                 </ul>
             </div>
           </div>
           <div class="right">
             <i class="squareShap"></i><span style="color:  rgba(0,161,264,1)">最近更新</span>
             <ul>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>
               <li>
                 <a href=""> 鬼灭之刃</a>
               </li>
               <li>
                 <a href=""> 只是可爱的即使变态</a>
               </li>

             </ul>
           </div>
      </div>
    </div>
</template>

<script>
  import  Search from "./Home/Search"
  import  Navigation from './Home/Navigation'
    export default {
        components:{Search,Navigation},
        name: "Home",
        data(){
          return {
              imgs:[
                "https://ws2.sinaimg.cn/large/006AdpFDgy1fw3a3lgf2gj30im09bdij.jpg",
                "https://ae01.alicdn.com/kf/UTB8V_I5MiaMiuJk43PTq6ySmXXai.jpg",
                "https://ws1.sinaimg.cn/large/006AdpFDgy1fw3a02rak1j30im09b3z8.jpg",
                "https://ws4.sinaimg.cn/large/006AdpFDgy1fw3a2pdkejj30im09b0vh.jpg",
                "https://ws3.sinaimg.cn/large/006AdpFDgy1fw3a1zr3v2j30im09bq5j.jpg",
                "https://ws3.sinaimg.cn/large/006AdpFDgy1fw3a35sthcj30im09bq5o.jpg"
              ],
            img:{link:"https://ws2.sinaimg.cn/large/006AdpFDgy1fw3a3lgf2gj30im09bdij.jpg",index:0}
          }
        },
      mounted(){
         this.initLunbo();//初始化轮播图
      },
      methods:{
          changeImg(index){
            this.img.link=this.imgs[index];
            this.img.index=index;
          },
        initLunbo(){
            var count=0;
            setInterval(()=>{
              this.img.link=this.imgs[count];
              this.img.index=count;
              count++;
              if(count==6){
                count=0;
              }
            },3000);
        }
      }
    }
</script>

<style scoped>
  .bg{
    background-color: rgba(0,0,0,0.7);
  }
 .orignalBg{
   background-color: rgba(255,255,255,0.7);
 }
.gallery{
  width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.gallery .left{
  width: 670px;
  height: 335px;
  /*background-color: crimson;*/
  position: relative;
}
.gallery .left .change{
   position: absolute;
  width: 300px;
  height: 20px;
  /*background-color: crimson;*/
  bottom: 20px;
   left:170px;
}

.gallery .left .change ul{
  display: flex;
  flex-direction: row;

}
.gallery .left .change ul li{
  width: 30px;
  height: 15px;
  margin-left: 20px;

  transition: all 0.2s;
}

.gallery .left .change ul li:hover{
  background-color: rgba(0,0,0,0.7);
}


.gallery .right{
  width: 330px;
  height: 335px;
  /*background-color: black;*/
  padding-left: 20px;
  text-align: left;
  overflow: hidden;

}

.gallery .right a:link{
  color: rgba(255,255,255,0.8);
}


.gallery .right ul{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 310px;
 margin-left: -5px;
  /*background-color: black;*/
}

.gallery .right ul li{
  border-right: 2px solid rgba(255,255,255,0.2);
  /*background-color: crimson;*/
  margin-top: 10px;
  margin-left: 10px;
  width: 140px;
  height: 20px;
  line-height: 20px;
}
.squareShap {
  width: 8px;
  height: 8px;
  margin-right: 7px;
  background: rgba(0,161,264,1);
  display: inline-block;
}


</style>
