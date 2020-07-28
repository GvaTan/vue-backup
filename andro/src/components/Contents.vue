<template>
    <div id="content">
       <div class="video">
<!--         <iframe width="100%" height="100%" frameborder="0" src="http://suo.im/4oIIez" allowFullScreen="true"></iframe>-->
         <video style="width: 100%;height: 100%" src="http://anets.top.img.800cdn.com/sj.mp4"  autoplay="autoplay">
           your browser does not support the video tag
         </video>
       </div>

      <div class="detail">
          <div class="title">
            <a href="javaScript:void(0)" @click="toShowIntroduce()">丝巾介绍</a>
            <a href="javaScript:void(0)" @click="toHiddenIntroduce()">了解更多</a>
          </div>

           <div class="introduce" v-if="showIntroduce">
               <router-link to="/buy"><div style="background-color: crimson;width: 100%;height: 60px;border-radius: 5px;color: white;padding-top: 5px">
                  &nbsp;&nbsp;想拥有一条属于自己的丝巾？点击获得！<br>
                 <span style="display:block;margin-top:12px;text-align:center;background-color:white;color: crimson;width: 30%;margin: auto;border-radius: 15px" ><b>点击此处</b></span>
               </div></router-link>
               <div class="mytext" style="padding-bottom: 50px">
                <h3 style="text-align: center;margin-top: 5px;margin-bottom: 5px"> 水墨画蝶变故事高级真丝</h3>

                 <h5 style="text-align: left;margin-top: 10px;margin-bottom: 10px">
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一个让所有女人男人看了即兴奋又尖叫的从骨子里透着优雅的女神！让您与丝巾的美情缘延续到底...
                 </h5>
                 <img src="http://img01.taobaocdn.com:80/tfscom/TB11lQRc8GE3KVjSZFhXXckaFXa" width="100%" alt="">
                 <p>
                   奥黛丽·赫本说：“当我戴上丝巾的时候，我从没有那样明确地感受到我是一个美丽的女人。我只有一件衬衫，一条裙子，一顶贝雷帽，一双鞋，但却有14条丝巾。”丝巾是女人飘动的情绪，不经意间流露欲语还休的妩媚、飘逸优雅的气质，是女人永不凋零的最爱。
                   <br>丝巾情怀
                   <br>暖风成韵柳叶飘，
                   <br>丝巾映庞美目俏。
                   <br>常感春光依旧在，
                   <br>不觉清霜染树梢。
                 </p>
                 <div>
                   <img src="http://img01.taobaocdn.com:80/tfscom/TB1os7ZcWWs3KVjSZFxXXaWUXXa" width="37%" alt="">
                   <img src="http://img02.taobaocdn.com:80/tfscom/TB17ZwRc.GF3KVjSZFvXXb_nXXa" width="56%" alt="">

                 </div>
                 <img src="http://img04.taobaocdn.com:80/tfscom/TB1iPAPc2WG3KVjSZFPXXXaiXXa" width="29%" style="margin-left: 35%" alt="">
                 <p>
                   《红楼梦》里说："女人是水做的，这句话一下子让女人成了柔软与风情的尤物。清水为质，红尘为妆，上帝就让一个个女人成了这世间一道道摇曳多姿的风景。"女人易做也难做，因为你得保持自己的风景，做性感女人也好，做古典女人也好，但做女人一定要做一个有风情的女人，有风情的女人才具有从骨子里透出来的妩媚与魅力，才能成为男人心目中的女神
                 </p>
                 <img src="http://img01.taobaocdn.com:80/tfscom/TB1Wu7Tc8WD3KVjSZKPXXap7FXa" width="100%" alt="">
                 <p>
                   女人的风情有很多种，我喜欢带丝巾的女人，泰戈尔这样赞美丝巾：“女人最美丽的情怀就是从这不足70cm的方寸丝巾上开始浪漫的演绎的……”从男人的审美眼光来看，一袭丝巾，便是一袭优雅浪漫的标志与开始，丝巾千万种，如若搭配好，一方普通的丝巾足以增添女人从内到外的浪漫，温柔与风情，因此丝巾之于女人，若莲花出于清水，绿萍浮于碧波，清澈剔透又优雅浪漫
                 </p>
                 <img src="http://img02.taobaocdn.com:80/tfscom/TB1PZgZc8Kw3KVjSZTEXXcuRpXa"  style="width:40%;margin-left:30%;" alt="">
                 <p>
                   戴丝巾的女人一般都是比较讲究的女人，她们懂得如何让自己美丽起来，他们明白女人的美丽本身就是一种价值，所以每次出门前他们都会精心收拾好自己。她们总会有丝巾情结，不同的季节，他们的皮肤的勃颈间总会搭一条丝巾，或者素雅如兰，或者妖娆如玫，于脸上的表情成映
                 </p>
                 <img src="http://img04.taobaocdn.com:80/tfscom/TB1YlETc8WD3KVjSZKPXXap7FXa" alt="" width="100%">
                 <p>
                   每条丝巾都有属于它的故事，带上她，无论走在世界的哪一个角落，美好的事情都伴随你左右
                 </p>
                 <img src="http://img04.taobaocdn.com:80/tfscom/TB1prQ_cWWs3KVjSZFxXXaWUXXa" alt="" width="100%">
                 <p>每一个笔触似乎都有了生命灵活灵现，富有魅力，真是让人看到就，甘心戴上她，做一个热爱生活的画家，营造浓浓的价值感和艺术感</p>
                 <img src="http://img04.taobaocdn.com:80/tfscom/TB1KVkZc8Gw3KVjSZFDXXXWEpXa" alt="" width="100%">
                 <p>丝巾是一种优雅的代表，优雅的女人是不会少了丝巾这种有品味的饰品，所以如果你是会打扮的女人，就应该拥有多条美丽的丝巾，因为丝巾的美丽就是你的美丽。</p>
                 <img src="http://img01.taobaocdn.com:80/tfscom/TB1sKUVc9WD3KVjSZSgXXcCxVXa" alt="" width="100%">
                 如果您是喜欢丝巾的女人，我个人真诚的邀请您来到SOUAI堞变美学生活馆。不仅有优质的品牌文化与成熟的经营理念，而且还有专属美学形象顾问为你找到专属色彩丝巾，让您与丝巾的美情缘延续到底。
               </div>
           </div>



        <div class="dir" v-if="!showIntroduce">
          <ul>
            <li>
               <div><img style="margin-top: 5px" src="http://img01.taobaocdn.com:80/tfscom/TB11lQRc8GE3KVjSZFhXXckaFXa" alt="" height="70px" width="100px"></div>
               <div style="padding-left: 10px">
                  <h5 style="text-align: left">第一课：水墨画蝶变故事高级真丝</h5>
                 <p>一个让所有女人男人看了即兴奋又尖叫的从骨子里透着优雅的女神！让您与丝巾的美情缘延续到底...</p>
                 <p><span style="float: right;margin-right: 10px;margin-top:0px;color: crimson">免费</span></p>
               </div>
            </li>

          </ul>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "Contents",
      data(){
          return {
            showIntroduce:true,

          }
      },
      methods:{
        toShowIntroduce(){
          this.showIntroduce=true;
        },
        toHiddenIntroduce(){
          this.showIntroduce=false;
        }
      }
    }
</script>

<style scoped>
#content{
  width:100%;
  height: 90%;
  position: fixed;
  /*background-color: yellow;*/
}
.video{
  width:100%;
  height: 35%;
  background-color: black;
  overflow: auto;
}

  .detail{
    width:100%;
    height:65%;

  }

  .title{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(0,0,0,0.5);


  }
.title a{
  width: 50%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: black;
}
.title a:visited{
  color: black;
}

.title a:link{
  color: black;
}

  .introduce{
    width: 95%;
    text-align: left;
    padding-top: 5px;
    /*background-color: yellow;*/
    margin: auto;
    height: 100%;
    overflow: auto;
  }
.dir{
  height: 100%;
  overflow: auto;
}
  .dir ul{
    list-style: none;
    padding-left: 0px;
  }

.dir ul li{
  width: 98%;
  height: 80px;
  margin: auto;
  margin-left: 1%;
  /*background-color: red;*/
  border-bottom: 1px solid rgba(0,0,0,0.5);
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.dir ul li p{
  font-size: 10px;
  text-align: left;
}

  .mytext img{
    margin-top: 10px;
    margin-bottom: 10px;
  }

</style>
