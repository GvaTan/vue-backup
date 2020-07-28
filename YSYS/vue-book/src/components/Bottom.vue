<template>
    <div id="alls">
      <div id="bottom">
        <div style="background-color: #0f1f35;width: 55%" id="share" @click="share=true">分享领豪礼</div>
       <router-link  id="payssz" to="/buy" tag="div"  style="background-color: red;width: 45%">立即抢购</router-link>
      </div>

<!--      <div id="pays" class="pays" v-show="show">-->
<!--      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">-->

<!--          <div class="pay" v-if="show">-->
<!--            <h4 style="border-bottom: 1px solid rgba(0,0,0,0.2);padding-bottom: 7px;width: 98%;margin:auto">搜爱服饰</h4>-->

<!--            <p style="color: rgba(0,0,0,0.7);padding-left: 5px;margin-top: 10px">为了便于联系到您，请准确填写！</p>-->

<!--            <div>-->
<!--              <form class="form">-->
<!--                <div class="content">-->
<!--                  <div>姓名：</div>-->
<!--                  <input type="text" placeholder="姓名必填">-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                  <div>手机号：</div>-->
<!--                  <input type="text" placeholder="手机号必填">-->
<!--                </div>-->
<!--              </form>-->
<!--              <a href="">-->
<!--                <div class="money">-->
<!--                  确认支付+支付20元-->
<!--                </div>-->
<!--              </a>-->

<!--            </div>-->
<!--          </div>-->


<!--      </transition>-->
<!--      </div>-->
      <div v-if="share" @click="share=false" style="position: fixed;padding-left:20px;padding-right:20px;top:0px;left:0px;width:100%;height:100%;background-color: rgba(0,0,0,0.5);z-index:10000"><img style="position: absolute;right:0px" src="http://img03.taobaocdn.com:80/tfscom/TB1bG3.doT1gK0jSZFrXXcNCXXa" alt="">
         <span style="position: absolute;width:85%;top:40%;left:50%;transform:translate(-50%,0);color: white;font-size: 25px;">点击右上角分享到微信群 <br>
           或者朋友圈即可领取奖励</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Bottom",
      data(){
          return {
            share:false
          }
      },created() {
          // $(document).bind('click',(e)=>{
          //   if(e.target.id=="pays"){
          //     this.show=false
          //   }
          // });
      }
    }
</script>

<style scoped>
#bottom{
  position:fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  /*background-color: yellow;*/
  color: white;
  display: flex;
  flex-direction: row;
}
#bottom div{
  text-align: center;
  height: 40px;
  line-height: 40px;
}
  .pays{
    position: fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    z-index:10;

    background-color:rgba(0,0,0,0.7);
  }
  .pay{
    position: fixed;
    padding-top: 10px;
    z-index:11;

    bottom: 0px;
    width: 100%;
    height: 220px;
    background-color:white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: deeppink;
  }
.form{
  width: 98%;
  margin: auto;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
.form .content{
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.form .content div{
  display: inline-block;
  width: 25%;
   background-color: rgba(0,161,214,1);
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}
.form  input{
  outline: none;
 width: 73% ;
  padding-left: 10px;
  border: 0px;
  background-color: rgba(0,0,0,0.1);
}


  .money{
    width: 90%;
    color: white;
    margin: auto;
    margin-top: 10px;
    border-radius: 5px;
    background-color: rgba(0,161,214,1);
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>
