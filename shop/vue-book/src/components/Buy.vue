<template>
    <div >
        <div class="col-md-8 col-sm-12" id="buy">
          <span style="color: #ee1289">商品价格：<i>{{shop.acoin}}</i>Acoin  或 <i>{{shop.coin}}</i>¥  </span>
          <div style="float: right">
            <button class="btn"  @click="acoinPay()" v-if="!show.acoinpaying"> 积分支付： -{{shop.acoin}}</button>
            <button class="btn"  disabled v-if="show.acoinpaying"> 支付中...</button>
            <button class="btn" @click="coinPay()" v-if="!show.coinpaying">余额支付：-{{shop.coin}}¥</button>
            <button class="btn"  disabled v-if="show.coinpaying"> 支付中...</button>
            <button class="btn" @click="payQr()" >扫码支付：-{{shop.coin}}¥</button>
            <button type="button" class="layui-btn" @click="show.free=true">免费下载</button>
          </div>
          <span style="float: right" v-if="user&&user.uid">      可用积分：{{user.acoin}} <i style="background-color:#009688;font-size: 5px" @click="show.free=true">获取</i>  /可用¥：{{user.coin}} <i  style="background-color:#009688;font-size: 5px"><router-link to="/user/info" style="color:white">充值</router-link></i>    </span>


        </div>









       <div class="free" v-if="show.free">
           <i @click="show.free=false" style="background-color:transparent;color: #777;position: absolute;top:-25px;right:-25px;font-size: 20px" class="iconfont icon-guanbi"></i>
           <h3>免费下载</h3>
           <hr class="layui-bg-gray">
            <div>
                <p>
                  新用户注册免费获取2积分
                  <br>
                  上传任意资源都可以获取积分1Acoin
                  <br>
                   上传优质资源通过审核后可以获取积分5-100Acoin或coin(¥)

                </p>
              <br>
              <fieldset class="layui-elem-field">
                <legend>资源类型：</legend>
                <div class="layui-field-box">
                  比如一张你喜欢的壁纸，一个你收藏的软件或教程，一首你喜欢的的ASMR音声资源等等...

                </div>
              </fieldset>
              <br>
              <button type="button" class="layui-btn center-block" style="float: right"><router-link to="/user/upload" target="_blank" style="">去上传</router-link></button>
              <button type="button" class="layui-btn center-block" style="float: right"><router-link to="/user" target="_blank" style="">新用户注册免费送积分</router-link></button>
            </div>
       </div>



      <div class="free qr" v-if="show.qr">
        <i @click="show.qr=false" style="background-color:transparent;color: #777;position: absolute;top:-25px;right:-25px;font-size: 20px" class="iconfont icon-guanbi"></i>
        <h3>扫码支付</h3>
        <hr class="layui-bg-gray">
        <div>
          <img :src="qrPay.img" alt="">

          <br>

          <router-link to="" target="_blank" tag="a" style="float: right">查看记录</router-link>
          <span style="float: right;height: 30px;line-height: 30px">支付成功后会自动跳转</span>
        </div>
      </div>


      <div class="free money" v-if="show.topup">
        <i @click="show.topup=false" style="background-color:transparent;color: #777;position: absolute;top:-25px;right:-25px;font-size: 20px" class="iconfont icon-guanbi"></i>
        <h3>余额（coin）不足</h3>
        <hr class="layui-bg-gray">
        <div>
          <br>
          <router-link to="" target="_blank" tag="a" style="margin: auto">充值</router-link>
          <br>
          <br>
        </div>
      </div>

      <div class="free  money" v-if="show.integral">
        <i @click="show.integral=false" style="background-color:transparent;color: #777;position: absolute;top:-25px;right:-25px;font-size: 20px" class="iconfont icon-guanbi"></i>
        <h3>积分（acoin）不足</h3>
        <hr class="layui-bg-gray">
        <div>
          <br>
          <router-link to="" target="_blank" tag="a" style="margin: auto">上传资源获取积分</router-link>
          <br>
          <br>
        </div>
      </div>
    </div>
</template>

<script>
import {createOrder,getAddDownload} from '../api/shop'
    export default {
        name: "Buy",
      props:["shop"],
      data(){
          return {
            
            show:{
              free:false,
              qr:false,
              topup:false,
              integral:false,
              coinpaying:false,
              acoinpaying:false
            },
            qrPay:{
              img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585291893684&di=a594685aa8f2763ab22c518f9c50f299&imgtype=0&src=http%3A%2F%2Fimg.atobo.com%2FProductImg%2FEWM%2FUWeb%2F3%2F9%2F2%2F3%2F7978%2F39237978%2F1.gif"
            }
          }
      },
      computed:{
        user:{
          get(){
            return this.$store.state.user;
          }
        }
      },
      methods:{
        //支付成功后增加下载次数并跳转页面到购买详情
          async addDownload(sid){
             let {data:res}=await getAddDownload(sid);
             console.log(res);
             this.$router.push({path:'/user/order'});
          },
        async coinPay(){
          if(!this.user){
            this.$layer.msg("请先登录");
            return;
          }
          if(this.user.coin<this.$props.shop.coin){
            //余额不足
            this.show.topup=true;
          }else{
            this.show.coinpaying=true;
            let {data:res} = await createOrder(this.$props.shop.sid,'1',this.$props.shop.acoin);
            if(res.success){
              console.log('success');
              console.log(res.data);
            }else{
              console.log('faild',res);
              this.$layer.msg(res.msg);
            }
             this.show.coinpaying=false;
             //支付成功后更新用户信息
             this.$store.commit("setUser",true)
             //支付成功添加下载次数并跳转
             this.addDownload(this.$props.shop.sid);
          }
        },
        async acoinPay(){
          if(!this.user){
            this.$layer.msg("请先登录");
            return;
          }
          if(this.user.acoin<this.$props.shop.acoin){
            //余额不足
            this.show.integral=true;
          }else{
            this.show.acoinpaying=true;
            console.log("支付中...");
            let {data:res} = await createOrder(this.$props.shop.sid,'0',this.$props.shop.acoin);
            if(res.success){
              console.log('success');
              console.log(res.data);
            }else{
              console.log('faild',res);
              this.$layer.msg(res.msg);
            }
            this.show.acoinpaying=false;
             this.$store.commit("setUser",true)
             //支付成功添加下载次数并跳转
             this.addDownload(this.$props.shop.sid);
            
          }
        },
        payQr(){
          // alert(1);
          if(!this.user){
            this.$layer.msg("请先登录");
            return;
          }
          this.$layer.msg("目前仅支持通过上传资源赚取积分，该功能正在开发，敬请期待！！");
          // this.show.qr=true;
        }
      }
    }
</script>

<style scoped>

  .qr a{
    color: #ee1289;
    padding: 5px 10px;
    border-radius: 5px;

  }
  .qr a:hover{
    background-color: #ee1289;
    color: white;

  }
  .money a{
    text-align: center;
  text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #ee1289;
    color: white;
    border: 1px solid #ee1289;
  }
  .money a:hover{
    background-color: white;
    color: #ee1289;
  }
#buy{
  background-color: white;
  padding: 15px 20px;
  position: fixed;
  bottom: 0px;
  left:0px;
  padding-left: 60px;
  box-shadow: 1px -1px 5px 0px rgba(0,0,0,0.1);
  border-right: 5px solid #ee1289;

}


h3 {
  font-size: 18px;
  border-left: 5px solid #009688;
  padding-left: 10px;
}

span{
float: left;
  /*height: 45px;*/
  line-height: 36px;
}

i{
  color: white;
  background-color: #ee1289;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 5px;
}
  .btn{
    padding: 5px 10px;
    border: 1px solid #ee1289;
    color: white;
    background-color: #ee1289;

    transition: all 0.5s;
  }
button{
  margin-left: 20px;
  /*border: 1px solid #ee1289;*/
}
button:hover{
  background-color: white;
  color: #ee1289;
  border: 1px solid #ee1289;

}
button a{
  text-decoration: none;
  display: block;
  color: white;
}
button:hover a{
  color: #ee1289;
}

  .free{
    position: fixed;
    background-color: white;
    box-shadow: -3px 3px 20px 1px rgba(0,0,0,0.1);
    border-radius: 5px;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding: 15px 20px;
  }
</style>
