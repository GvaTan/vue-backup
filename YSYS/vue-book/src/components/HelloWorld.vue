<template>
  <div class="hello" style="overflow-x: hidden;position:absolute;height: 100%;padding-bottom: 50px" >

    <Swiper></Swiper>
     <div class="content">
       <div class="info"><span style="float: left;margin-left: 10px">当前参与[{{info.joins}}]人</span> <span style="float: right;margin-right: 10px">总访问量[{{info.visits}}]人</span></div>
          <div class="headers">
               <ul>
                 <li v-for="(item,index) in info.customers" v-if="index<21">
                   <img style="margin-left: 5px" :src="item.headImg" alt="" width="40px" height="40px">
                   <span style="width:120%;margin-left:-10%;height:20px;overflow: hidden;font-size: 12px;">{{item.nickname}}</span>
                 </li>
               </ul>
          </div>
          <div class="actives" >
               <h4 style="margin: auto">活动截止倒计时</h4>
               <div style="margin: auto;margin-top: 10px" class="time"><span>{{time.day|cuts}}</span>  天  <span>{{time.hour|cuts}}</span>  时  <span>{{time.minute|cuts}}</span>  分  <span>{{time.second|cuts}}</span>  秒  </div>

                <div class="customers" id="myscroll" style="height:200px;line-height: 40px;overflow: hidden;position: relative">

                   <div id="rensz" class="moveclass">
                     <ul>
                       <li v-for="(item,index) in info.rewards" id="renli">
                         <img :src="item.headImg" style="border-radius: 50%;" alt="" height="100%">
                         <span style="margin-left: 50px">{{item.name|myFilter}}</span>
                         <span style="left: 35%">{{item.phone}}</span>
                         <span style="right: 10px">{{item.time}}</span>
                       </li>
                     </ul>
                   </div>
                  <div id="rensz1" class="moveclass" style="top:180px">
                    <ul>

                                             <li v-for="(item,index) in info.rewards" id="renli">
                                               <img :src="item.headImg" style="border-radius: 50%;" alt="" height="100%">
                                               <span style="margin-left: 50px">{{item.name|myFilter}}</span>
                                               <span style="left: 35%">{{item.phone}}</span>
                                               <span style="right: 10px">{{item.time}}</span>
                                             </li>
                    </ul>
                  </div>

                </div>
           <div>
             <div style="margin-top: 10px;width:102%;">
               <img src="http://img02.taobaocdn.com:80/tfscom/TB1kqOOdHr1gK0jSZR0XXbP8XXa" alt="" width="100%">
<!--               <img src="http://img01.taobaocdn.com:80/tfscom/TB1EmardxD1gK0jSZFKXXcJrVXa" alt="" width="100%">-->
               <img src="http://img03.taobaocdn.com:80/tfscom/TB1._mNdUD1gK0jSZFGXXbd3FXa" alt="" width="100%">
               <img src="http://img01.taobaocdn.com:80/tfscom/TB17jymdKH2gK0jSZJnXXaT1FXa" alt="" width="100%">

<!--               <img src="http://img03.taobaocdn.com:80/tfscom/TB1CkSpdrr1gK0jSZR0XXbP8XXa" alt="" width="100%">-->
               <img src="http://img02.taobaocdn.com:80/tfscom/TB1BdKOdKH2gK0jSZFEXXcqMpXa" alt="" width="100%">
               <img src="http://img02.taobaocdn.com:80/tfscom/TB1ZaqkdFP7gK0jSZFjXXc5aXXa" alt="" width="100%">

               <img src="http://img01.taobaocdn.com:80/tfscom/TB1zjWodED1gK0jSZFGXXbd3FXa" alt="" width="100%">
               <img src="http://img01.taobaocdn.com:80/tfscom/TB1IBSpdAY2gK0jSZFgXXc5OFXa" alt="" width="100%">
             </div>

           </div>
            <div class="customers" id="myscroll2" style="height:200px;line-height: 40px;overflow: hidden;position: relative">
              <div id="rensz11" class="moveclass">
                <ul>

                  <li v-for="(item,index) in info.rewards">
                    <img :src="item.headImg" style="border-radius: 50%;" alt="" height="100%">
                    <span  style="margin-left: 50px">{{item.name|myFilter}}</span>
                    <span style="left: 35%">已领取<span style="color: red">￥{{item.money}}</span></span>
                    <span style="right: 10px">{{item.time}}</span>
                  </li>
                </ul>
              </div>
              <div id="rensz22" class="moveclass" style="top:180px">
                <ul>

                  <li v-for="(item,index) in info.rewards">
                    <img :src="item.headImg" style="border-radius: 50%;" alt="" height="100%">
                    <span  style="margin-left: 50px">{{item.name|myFilter}}</span>
                    <span style="left: 35%">已领取<span style="color: red">￥{{item.money}}</span></span>
                    <span style="right: 10px">{{item.time}}</span>
                  </li>
                </ul>
              </div>


            </div>
          </div>
     </div>
    <div style="width: 50px;height:20px;position: fixed;bottom: 100px;left:0px;z-index: 9999"><a href="tel:13559473833"><img  src="http://img04.taobaocdn.com:80/tfscom/TB1RXE3doY1gK0jSZFCXXcwqXXa" width="40px" alt=""></a></div>
    <Bottom></Bottom>
    <audio id="music" src="http://anets.cn/soai/music.mp3" autoplay loop>
      您的浏览器不支持 audio 标签。
    </audio>
    <div id="xuanzhuan" class="xuanzhun" @click="play()"  style="position:fixed;top:5px;right:5px;width: 30px;height:30px;"><i style="font-size: 30px;color:crimson;display:block;margin-top: -3px;" class="iconfont icon-yinle1"></i></div>
  </div>
</template>

<script>
  import  Swiper from './tool/Swiper'
  import  Bottom from './Bottom'
  import {getConfig,getYsysInfo,addPeples} from "../api/mywx";

  export default {
  name: 'HelloWorld',
  components:{Swiper,Bottom},
  filters:{
    myFilter:function(val){
       let a=val.substring(0,1);
       return a+" * *";
    },
    cuts:function(val){
      if(val.toString().length==1){
        return "0"+val;
      }else{
        return val;
      }

    }
  },
  data () {
    return {

      timenow:{year:0,month:0,day:0,time1:0,time2:0,time3:0},
        info:{joins:4356,visits:10393,customers:[
            {headImg:'http://anets.cn/soai/image/a.jpg',name:"谭洋波",nickname:"小蛆",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/b.jpg',name:"谭洋波",nickname:"明天会更好",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/c.jpg',name:"谭洋波",nickname:"梅花朵朵",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/d.jpg',name:"谭洋波",nickname:"巴山夜雨",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/e.jpg',name:"谭洋波",nickname:"亦心",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/f.jpg',name:"谭洋波",nickname:"艳丽",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/g.jpg',name:"谭洋波",nickname:"Alhygg",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/h.jpg',name:"谭洋波",nickname:"阿扎妹妹",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/i.jpg',name:"谭洋波",nickname:"笑靥如花",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/j.jpg',name:"谭洋波",nickname:"那片海",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/k.jpg',name:"谭洋波",nickname:"周冬雪",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/l.jpg',name:"谭洋波",nickname:"东城柚夜",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/m.jpg',name:"谭洋波",nickname:"梅珍",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/n.jpg',name:"谭洋波",nickname:"帆帆",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/o.jpg',name:"谭洋波",nickname:"磬",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/p.jpg',name:"谭洋波",nickname:"傻女孩",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/q.jpg',name:"谭洋波",nickname:"LiLi",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/r.jpg',name:"谭洋波",nickname:"闲庭信步",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/s.jpg',name:"谭洋波",nickname:"金月",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/t.jpg',name:"谭洋波",nickname:"现在挺好",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/u.jpg',name:"谭洋波",nickname:"初见",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/v.jpg',name:"谭洋波",nickname:"秋水",phone:"15587491751",vx:"1552454",time:"2019-8-20",reward:true,money:8.88}

          ],rewards:[
            {headImg:'http://anets.cn/soai/image/w.jpg',name:"欧jj",nickname:"小蛆",phone:"138***6124",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/x.jpg',name:"唐hh",nickname:"小蛆",phone:"155***0289",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/y.jpg',name:"陈ss",nickname:"小蛆",phone:"138***1285",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/z.jpg',name:"周ss",nickname:"小蛆-",phone:"187***6076",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/1.jpg',name:"林ss",nickname:"小蛆",phone:"181***6650",vx:"1552454",time:"2019-8-20",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/2.jpg',name:"黄ss",nickname:"小蛆",phone:"138***9361",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/3.jpg',name:"曾ss",nickname:"小蛆",phone:"180***0629",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/4.jpg',name:"郑ss",nickname:"小蛆",phone:"138***3608",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/5.jpg',name:"周洋波",nickname:"小蛆",phone:"187***8268",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/6.jpg',name:"张洋波",nickname:"小蛆",phone:"137***0504",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/7.jpg',name:"张洋波",nickname:"小蛆",phone:"138***6022",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/8.jpg',name:"陈洋波",nickname:"小蛆",phone:"138***4030",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/9.jpg',name:"郑洋波",nickname:"小蛆",phone:"136***0795",vx:"1552454",time:"2019-8-20",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/10.jpg',name:"葛洋波",nickname:"小蛆",phone:"150***6278",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/11.jpg',name:"安洋波",nickname:"小蛆",phone:"189***8689",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/19.jpg',name:"许洋波",nickname:"小蛆",phone:"136***9086",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/13.jpg',name:"包洋波",nickname:"小蛆",phone:"153***1102",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/14.jpg',name:"毕洋波",nickname:"小蛆",phone:"155***1751",vx:"1384090",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/15.jpg',name:"蔡洋波",nickname:"小蛆",phone:"153***2355",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/16.jpg',name:"曹洋波",nickname:"小蛆",phone:"188***4302",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/17.jpg',name:"陈洋波",nickname:"小蛆",phone:"153***1931",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/18.jpg',name:"陈洋波",nickname:"小蛆",phone:"138***7242",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/19.jpg',name:"谭洋波",nickname:"小蛆",phone:"15587491751",vx:"1552454",time:"2019-8-19",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/20.jpg',name:"程洋波",nickname:"小蛆",phone:"137***3471",vx:"1552454",time:"2019-8-19",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/21.jpg',name:"崔洋波",nickname:"小蛆",phone:"151***5886",vx:"1552454",time:"2019-8-19",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/22.jpg',name:"柳洋波",nickname:"小蛆--",phone:"159***7374",vx:"1552454",time:"2019-8-19",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/23.jpg',name:"邓洋波",nickname:"小蛆",phone:"132***8688",vx:"1552454",time:"2019-8-19",reward:false,money:8.88},
            {headImg:'http://anets.cn/soai/image/24.jpg',name:"方洋波",nickname:"小蛆",phone:"180***4451",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/25.jpg',name:"陈洋波",nickname:"小蛆",phone:"188***6635",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/26.jpg',name:"方洋波",nickname:"小蛆",phone:"188***6062",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/27.jpg',name:"高洋波",nickname:"小蛆",phone:"136***3622",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/28.jpg',name:"黄洋波",nickname:"小蛆",phone:"138***1722",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/29.jpg',name:"侯洋波",nickname:"小蛆",phone:"180***6807",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/30.jpg',name:"苑洋波",nickname:"小蛆",phone:"185***2678",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/31.jpg',name:"晏洋波",nickname:"小蛆",phone:"155***9277",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/32.jpg',name:"薛洋波",nickname:"小蛆",phone:"198***0824",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/33.jpg',name:"张洋波",nickname:"小蛆",phone:"183***1389",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/34.jpg',name:"洪洋波",nickname:"小蛆",phone:"134***6648",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/35.jpg',name:"胡洋波",nickname:"小蛆",phone:"187***6141",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/36.jpg',name:"陈洋波",nickname:"小蛆",phone:"159***9673",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/37.jpg',name:"郑洋波",nickname:"小蛆",phone:"150***7577",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/38.jpg',name:"江洋波",nickname:"小蛆",phone:"183***3574",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/39.jpg',name:"向洋波",nickname:"小蛆",phone:"173***8885",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/40.jpg',name:"蒋洋波",nickname:"小蛆",phone:"182***0739",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/41.jpg',name:"李洋波",nickname:"小蛆",phone:"132***5393",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/42.jpg',name:"林洋波",nickname:"小蛆",phone:"133***6861",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/43.jpg',name:"刘洋波",nickname:"小蛆",phone:"136***7417",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/44.jpg',name:"刘洋波",nickname:"小蛆",phone:"135***8052",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/45.jpg',name:"罗洋波",nickname:"小蛆",phone:"188***9604",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/46.jpg',name:"裴洋波",nickname:"小蛆",phone:"157***2794",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/47.jpg',name:"邱洋波",nickname:"小蛆",phone:"188***3200",vx:"1552454",time:"2019-8-19",reward:true,money:8.88},
            {headImg:'http://anets.cn/soai/image/48.jpg',name:"陈洋波",nickname:"小蛆",phone:"131***9266",vx:"1552454",time:"2019-8-19",reward:true,money:8.88}
          ]},
         time:{day:0,hour:0,minute:0,second:0},
         lastTime:0,
         config:{
           debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
           appId: '', // 必填，公众号的唯一标识
           timestamp: 0, // 必填，生成签名的时间戳
           nonceStr: '', // 必填，生成签名的随机串
           signature: '',// 必填，签名
           jsApiList: ["onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
         },
       friends:{
         title: 'SOUAI搜爱秋季新品首发', // 分享标题
         desc: '蝶变服饰美学空间让百万人用服饰美学改变生活！', // 分享描述
         link: location.origin+"/soai/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
         imgUrl: location.origin+"/soai"+'/logo.jpg', // 分享图标
         success: function () {
           window.location.href="share.html";
         }
       },
      quans:{
        title: 'SOUAI搜爱秋季新品首发', // 分享标题
        link: location.origin+"/soai/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: location.origin+"/soai"+'/logo.jpg', // 分享图标
        success: function () {
          window.location.href="share.html";
        }
      },
      flag:false
    }
  },created() {


      let a=this.GetQueryString("from");
      if(a==null||a==''){

      }else{
        window.location.href="http://souainet.top/soai/";
      }



      var hour=new Date().getHours();
      if(hour>6&&hour<8){
          this.info.joins=this.randomNum(800,1000);
      }else if(hour>=0&&hour<=6){
          this.info.joins=this.randomNum(5,30);
      }else if(hour>=23){
          this.info.joins=this.randomNum(800,1000);
      }else{
        this.info.joins=this.randomNum(4000,5500);
      }

     this.initYsysInfo();

     this.vxConfig();

     this.countTime2();





  },
    mounted(){
      //滚动
      // s("#renli").relativeToPosition();
      // s("#rensz").relativeToPosition();

       this.move();
       this.moves();
    },
  methods:{
    play(){
      if(this.flag==false){
        s("#music").pause()
        this.flag=true;
        $("#xuanzhuan").removeClass("xuanzhun");
      }else{
        s("#music").play()
        this.flag=false;
        $("#xuanzhuan").addClass("xuanzhun");
      }

    },
    move(){
      var _this=this;
      s("#rensz").translateY(-parseInt(s("#rensz").css("height"))+10+180,false,0.1,function () {
           s("#rensz").translateY(-180,false,0.1,function () {
           s("#rensz").css("top","180px");
         });
         _this.move2();
      })
    },
    move2(){
      var _this=this;
      s("#rensz1").translateY(-parseInt(s("#rensz1").css("height"))+10,false,0.1,function () {
        s("#rensz1").translateY(-180,false,0.1,function () {
          s("#rensz1").css("top","180px");
        });
        _this.move1();
      })
    },
    move1(){
      var _this=this;
      s("#rensz").translateY(-parseInt(s("#rensz").css("height"))+10,false,0.1,function () {
        s("#rensz").translateY(-180,false,0.1,function () {
           s("#rensz").css("top","180px");
        });
        _this.move2();
      })
    },moves(){
      var _this=this;
      s("#rensz11").translateY(-parseInt(s("#rensz11").css("height"))+10+180,false,0.1,function () {
        s("#rensz11").translateY(-180,false,0.1,function () {
          s("#rensz11").css("top","180px");
        });
        _this.moves2();
      })
    },
    moves2(){
      var _this=this;
      s("#rensz22").translateY(-parseInt(s("#rensz22").css("height"))+10,false,0.1,function () {
        s("#rensz22").translateY(-180,false,0.1,function () {
          s("#rensz22").css("top","180px");
        });
        _this.moves1();
      })
    },
    moves1(){
      var _this=this;
      s("#rensz11").translateY(-parseInt(s("#rensz11").css("height"))+10,false,0.1,function () {
        s("#rensz11").translateY(-180,false,0.1,function () {
          s("#rensz11").css("top","180px");
        });
        _this.moves2();
      })
    },
    async initYsysInfo(){

      let {data:s}=await  getYsysInfo()
      this.info.visits=s.peples;
      var str=s.year+"/"+s.month+"/"+s.day+" "+s.hour+":"+s.minute+":"+s.second;

      this.lastTime=new Date(str);
      setInterval(()=>{
        this.countTime();

      },1000);
      addPeples();
    },
    async vxConfig(){
      let {data:s}=await  getConfig();
      this.config.appId=s.appId;
      this.config.timestamp=parseFloat(s.timestamp);
      this.config.nonceStr=s.nonceStr;
      this.config.signature=s.signature;
      console.log(this.config);


      wx.config(this.config);


      wx.ready(()=>{   //需在用户可能点击分享按钮前就先调用




          this.friends.link=location.origin+"/soai/";
          //alert(this.friends.link);
          wx.onMenuShareAppMessage(this.friends);


          wx.onMenuShareTimeline(this.quans);
        wx.updateTimelineShareData(this.quans);


        wx.error(function(res){
          alert(res);
        });


        $("#payssz").bind('click',function(){
          // wx.chooseWXPay({
          //   timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          //   nonceStr: '', // 支付签名随机串，不长于 32 位
          //   package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          //   signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          //   paySign: '', // 支付签名
          //   success: function (res) {
          //        alert("支付成功")
          //   }
          // });
        });

      });



      // wx.chooseWXPay({
      //   timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //   nonceStr: '', // 支付签名随机串，不长于 32 位
      //   package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //   signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //   paySign: '', // 支付签名
      //   success: function (res) {
      //   // 支付成功后的回调函数
      //   }
      // });

      // function onBridgeReady(){
      //   WeixinJSBridge.invoke(
      //     'getBrandWCPayRequest', {
      //       "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
      //       "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
      //       "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
      //       "package":"prepay_id=u802345jgfjsdfgsdg888",
      //       "signType":"MD5",         //微信签名方式：
      //       "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
      //     },
      //     function(res){
      //       if(res.err_msg == "get_brand_wcpay_request:ok" ){
      //         // 使用以上方式判断前端返回,微信团队郑重提示：
      //         //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      //       }
      //     });
      // }
      // if (typeof WeixinJSBridge == "undefined"){
      //   if( document.addEventListener ){
      //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      //   }else if (document.attachEvent){
      //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      //   }
      // }else{
      //   onBridgeReady();
      // }


    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
      var context = "";
      if (r != null)
        context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined" ? "" : context;
    },
    randomNum(minNum,maxNum){
      switch(arguments.length){
        case 1:
          return parseInt(Math.random()*minNum+1,10);
          break;
        case 2:
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
          break;
        default:
          return 0;
          break;
      }
    },
    countTime(){
      var date1 = new Date();
      var s1 = date1.getTime();
      var s2 =this.lastTime;
      var total = (s2 - s1)/1000;


      var day = parseInt(total / (24*60*60));//计算整数天数
      var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
      var hour = parseInt(afterDay/(60*60));//计算整数小时数
      var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
      var min = parseInt(afterHour/60);//计算整数分
      var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数
      afterMin=afterMin.toFixed(0)
      this.time.day=day;
      this.time.hour=hour;
      this.time.minute=min;
      this.time.second=afterMin;
    },
    countTime2(){
      // var date = new Date();
      // this.timenow.year=date.getFullYear();
      // this.timenow.month=date.getMonth();
      // this.timenow.day=date.getDate();
      // "2019-8-20"=this.timenow.year+"-"+this.timenow.month+"-"+(this.timenow.day);
      // "2019-8-19"=this.timenow.year+"-"+this.timenow.month+"-"+(this.timenow.day-1);
      // this.timenow.time3=this.timenow.year+"-"+this.timenow.month+"-"+(this.timenow.day-2);
      // conso.log(date);
    }
  }
}
</script>

<style scoped>
  .xuanzhun{
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 3s linear infinite;
    -moz-animation: rotate 3s linear infinite;
    -o-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;
  }
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
  }
  @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
  }
  @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
  }
  @keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
  }
  .moveclass{
    position: absolute;
    width: 100%;
    z-index: -999;
  }

  .moveclass ul{
    width: 100%;
  }

  .moveclass ul li{
    width: 100%;
  }
  .moveclass ul li *{
    float: left;
  }
.headers{

  opacity: 0.9;
}

.headers ul{

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
  width: 98%;
  margin: auto;
  margin-top: 10px;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px  solid rgba(0,161,264,0.3);

}
.headers ul li{
  width: 13%;
  height: 70px;
  display: flex;
  flex-direction: column;
  margin-left: 0.5%;


}



.headers ul li span{
  text-align: center;
}
.headers ul li img{
  border-radius: 50%;
}
.info{
  margin-top: -30px;
  color: white;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background-color: rgba(0,0,0,0.7);

}
.info span{
  height: 30px;
  line-height: 30px;
  font-size: 9px;
}
.actives{
  position: relative;
  text-align: center;
  width: 98%;
  margin-top: 10px;

}
  .actives .time{
  }
  .actives .time span{
     background-color: orange;
    display: inline-block;
    width: 38px;
    height: 38px;
    line-height: 38px;
    color: white;
     border-radius: 50%;
  }
.customers{
  width: 98%;
  margin: auto;
  margin-top: 20px;
}
   .customers ul{
     margin-top: 20px;
     list-style: none;
     padding: 0px;
   }

.customers ul li{
  border-bottom:1px solid rgba(0,0,0,0.1);
  padding: 5px 0px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;

  position: relative;
}
.customers ul li span{
  margin-left: 10px;
  position: absolute;
  top:0px;

}



</style>
