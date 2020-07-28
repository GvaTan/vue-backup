<template>
    <div>
        <div class="all">
          <h1>产品选择</h1>
          <div>
              <h2>原价值 <del>1899</del>元的简单大气口袋风衣</h2>
             <div class="coat rows">
               <img :src="coat" alt="" width="108px" height="150px">
               <div style="margin-left:2%;width:80%">
                   <div class="item">
                     <ul>
                       <span style="margin-left: 5px">颜色：</span>
                       <li :class="{actives:index[0]['color']==0}" @click="save('coat','color','墨绿色',0)">墨绿色</li>
                       <li :class="{actives:index[0]['color']==1}" @click="save('coat','color','杏白色',1)">杏白色</li>
                       <li :class="{actives:index[0]['color']==2}" @click="save('coat','color','粉色',2)">粉色</li>
                       <li :class="{actives:index[0]['color']==3}" @click="save('coat','color','白色',3)">白色</li>
                     </ul>
                   </div>
                 <div class="item">
                   <ul>
                     <span style="margin-left: 5px">尺码：</span>
                     <li  :class="{actives:index[0]['size']==0}" @click="save('coat','size','S',0)">S</li>
                     <li  :class="{actives:index[0]['size']==1}" @click="save('coat','size','M',1)">M</li>
                     <li  :class="{actives:index[0]['size']==2}" @click="save('coat','size','L',2)">L</li>
                     <li :class="{actives:index[0]['size']==3}" @click="save('coat','size','XL',3)">XL</li>
                   </ul>
                 </div>
                 <div class="item">
                   <ul>
                     <span style="margin-left: 5px">肩宽：</span>
                     <li :class="{actives:index[0]['jian']==0}" @click="save('coat','jian','37',0)">37</li>
                     <li :class="{actives:index[0]['jian']==1}" @click="save('coat','jian','38',1)">38</li>
                     <li :class="{actives:index[0]['jian']==2}" @click="save('coat','jian','39',2)">39</li>
                     <li :class="{actives:index[0]['jian']==3}" @click="save('coat','jian','40',3)">40</li>
                   </ul>
                 </div>
                 <div class="item">
                   <ul>
                     <span style="margin-left: 5px">胸围：</span>
                     <li :class="{actives:index[0]['xiong']==0}" @click="save('coat','xiong','98',0)">98</li>
                     <li :class="{actives:index[0]['xiong']==1}" @click="save('coat','xiong','102',1)">102</li>
                     <li :class="{actives:index[0]['xiong']==2}" @click="save('coat','xiong','106',2)">106</li>
                     <li :class="{actives:index[0]['xiong']==3}" @click="save('coat','xiong','110',3)">110</li>
                   </ul>
                 </div>
                 <div class="item">
                   <ul>
                     <span style="margin-left: 5px">衣长：</span>
                     <li :class="{actives:index[0]['yichang']==0}" @click="save('coat','yichang','102',0)">102</li>
                     <li :class="{actives:index[0]['yichang']==1}" @click="save('coat','yichang','103',1)">103</li>
                     <li :class="{actives:index[0]['yichang']==2}" @click="save('coat','yichang','104',2)">104</li>
                     <li :class="{actives:index[0]['yichang']==3}" @click="save('coat','yichang','105',3)">105</li>
                   </ul>
                 </div>

               </div>
             </div>
          </div>



          <div>
            <h2>原价值<del>698</del>的动人丝巾</h2>
            <div class="coat rows">
              <img :src="sijing" alt="" width="108px" height="150px">
              <div style="margin-left:2%;width:80%">
                <div class="item">
                  <ul>
                    <span style="margin-left: 5px">颜色：</span>
                    <li :class="{actives:index[1]['color']==0}" @click="save('sijing','color','海蓝色',0)">海蓝色</li>
                    <li :class="{actives:index[1]['color']==1}" @click="save('sijing','color','白兰色',1)">白兰色</li>
                    <li :class="{actives:index[1]['color']==2}" @click="save('sijing','color','红色',2)">红色</li>
                    <li :class="{actives:index[1]['color']==3}" @click="save('sijing','color','紫色',3)">紫色</li>
                    <li :class="{actives:index[1]['color']==4}" @click="save('sijing','color','紫色',4)">黄色</li>
                    <li :class="{actives:index[1]['color']==5}" @click="save('sijing','color','白蓝色',5)">白蓝色</li>
                  </ul>
                </div>


              </div>
            </div>
          </div>


          <div>
            <h2>原价值<del>188</del>元的传奇今生口红</h2>
            <div class="coat rows">
              <img src="http://img01.taobaocdn.com:80/tfscom/TB1j__Wdbr1gK0jSZFDXXb9yVXa" alt="" width="108px" height="150px">
              <div style="margin-left:2%;width:80%">
                <div class="item">
                  <ul style="margin-top:60px">
                    <span style="margin-left: 5px">免费：</span>
                    <li :class="{actives:index[2]['note']==0}" @click="save('kouhong','note','传奇今生口红1支',0)">传奇今生口红1支</li>
                  </ul>
                </div>


              </div>
            </div>
          </div>

          <div>
            <h2>原价值<del>1298</del>元的形象设计(不限时)</h2>
            <div class="coat rows">
              <img src="http://img02.taobaocdn.com:80/tfscom/TB1Br0vdq61gK0jSZFlXXXDKFXa" alt="" width="108px" height="150px">
              <div style="margin-left:2%;width:80%">
                <div class="item">
                  <ul>
                    <span style="margin-left: 5px;">免费：</span>
                    <li :class="{actives:index[3]['note']==0}" @click="save('kouhong','note','到店服务',0)">到店服务</li>
                    <span style="margin-top: 30px">地址：厦门市厦禾裕景店823号107蝶变空间生活馆(泉州银行旁)<br>联系电话：13559473833</span>
                  </ul>
                </div>


              </div>
            </div>
          </div>


          <span style="position: absolute;margin-top: 25px;right: 10px">总计:(<del>4073</del> )  598元</span><input @click="myconfirms()" class="btn" type="button" :value="info">
          <div style="width: 100px;height:30px;position: absolute;margin-top: 60px;left:10px;z-index: 9999"><a href="tel:13559473833"><i style="color:#dc143c;font-size: 20px;font-weight: bolder" class="iconfont icon-dianhua"></i><span style="display:inline-block;position: absolute;top:0px;left:25px"> 咨询</span></a></div>
<!--          <div @click="weixin()" style="width: 50px;height:20px;position: absolute;margin-top: 55px;left:50px;z-index: 9999"><i style="color:#dc143c;font-size:28px;" class="iconfont icon-zixun"></i></div>-->
        </div>


      <div v-if="dialog.show" class="masks" style="position: fixed;width:100%;height:100%;top:0px;left:0px;z-index: 20;background-color: rgba(0,0,0,0.4)"></div>
       <div  class="dialog" v-if="dialog.show">
          <h1 style="margin-left: 1%">还差一步:</h1>
         <a  class="btns" style="display:inline-block;width:60%;margin-left:1%;margin-top: 10px;text-align: center" href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4648a3be714ccd3f&redirect_uri=http://souainet.top/soai/ysys_pay&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect">补充收货地址</a>
         <input @click="closeDialog()" class="btnsz" type="button" style="width:35%;margin-left:1%" value="再选选">
       </div>

    </div>
</template>

<script>
  import {setBuyInfo} from "../api/mywx";

  export default {
        name: "Buy",
        data(){
          return {
             objs:[
               {name:"风衣",color:'墨绿色',size:'无',jian:'无',xiong:"无",yichang:"无",note:"无"},
               {name:"丝巾",color:'海蓝色',size:'无',jian:'无',xiong:"无",yichang:"无",note:"无"},
               {name:"口红",color:'1支',size:'无',jian:'无',xiong:"无",yichang:"无",note:"无"},
               {name:"设计",color:'到店服务一次',size:'无',jian:'无',xiong:"无",yichang:"无",note:"无"}
             ],
             index:[
               {color:0,size:-1,jian:-1,xiong:-1,yichang:-1,note:-1},
               {color:0,size:-1,jian:-1,xiong:-1,yichang:-1,note:-1},
               {color:-1,size:-1,jian:-1,xiong:-1,yichang:-1,note:0},
               {color:-1,size:-1,jian:-1,xiong:-1,yichang:-1,note:0}
             ],
            coats:[
              "http://img01.taobaocdn.com:80/tfscom/TB1eSvTdeL2gK0jSZPhXXahvXXa",
              "http://img04.taobaocdn.com:80/tfscom/TB1m7vVdhz1gK0jSZSgXXavwpXa",
              "http://img04.taobaocdn.com:80/tfscom/TB1DlYVdlv0gK0jSZKbXXbK2FXa",
              "http://img01.taobaocdn.com:80/tfscom/TB16nvYdeL2gK0jSZFmXXc7iXXa"
            ],
            coat:"http://img01.taobaocdn.com:80/tfscom/TB16nvYdeL2gK0jSZFmXXc7iXXa",
            sijings:[
              "http://img02.taobaocdn.com:80/tfscom/TB1ZQjVdhD1gK0jSZFsXXbldVXa",
              "http://img01.taobaocdn.com:80/tfscom/TB1RzvWdhz1gK0jSZSgXXavwpXa",
              "http://img04.taobaocdn.com:80/tfscom/TB1MKj0deP2gK0jSZFoXXauIVXa",
              "http://img02.taobaocdn.com:80/tfscom/TB1ZBTVdoz1gK0jSZLeXXb9kVXa",
              "http://img03.taobaocdn.com:80/tfscom/TB1otTSdaL7gK0jSZFBXXXZZpXa",
              "http://img01.taobaocdn.com:80/tfscom/TB12eHVdeT2gK0jSZFvXXXnFXXa"
            ],
            sijing:"http://img01.taobaocdn.com:80/tfscom/TB12eHVdeT2gK0jSZFvXXXnFXXa",
            dialog:{show:false},
            info:"选好了"

          }
        },
       methods:{
          closeDialog(){
            this.dialog.show=false;
            this.info="确认"
          },
          async myconfirms(){
            this.info="保存中...";
            await setBuyInfo(JSON.stringify(this.objs));
            this.info="已保存";
            this.dialog.show=true;
          },
          save(name,type,val,index){
             switch(name){
               case "coat":
                 if(type=="color"){
                   this.objs[0].color=val;
                   this.index[0].color=index;
                   this.coat=this.coats[index];
                 }else if(type=="size"){
                   this.objs[0].size=val;
                   this.index[0].size=index;
                 }else if(type=="jian"){
                   this.objs[0].jian=val;
                   this.index[0].jian=index;
                 }else if(type=="xiong"){
                   this.objs[0].xiong=val;
                   this.index[0].xiong=index;
                 }else{
                   this.objs[0].yichang=val;
                   this.index[0].yichang=index;
                 }
                 break;
               case "sijing":
                 this.objs[1].color=val;
                 this.index[1].color=index;
                 this.sijing=this.sijings[index];
                 break;
               case "kouhong":
                 break;
               case "sheji":
                 break;
             }
          }
       }
    }
</script>

<style scoped>
  .dialog{
    position: fixed;
    width: 98%;
    height: 100px;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: white;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.4);
    border-radius: 5px;
    z-index: 21;
    padding: 5px 10px;
    text-align: left;
  }
.all{
  width:100%;
  padding: 2%;
  font-size: 15px;
}

  h1{
    width:100px;
    font-size: 20px;
    margin:auto;
  }

h2{

  height:20px;
  line-height: 20px;
  font-size: 17px;
  border-left: 5px solid crimson;
  padding-left: 10px;
}


.btn{
  padding: 5px 30px;
  border-radius: 5px;
  border: 0px;
  background-color: crimson;
  color: white;
  position: absolute;
  right: 10px;
  margin-top: 55px;
  margin-bottom:5px;
}

.btns{
  padding: 5px 30px;
  border-radius: 5px;
  border: 0px;
  background-color: crimson;
  color: white;
}

  .btnsz{
    padding: 5px 30px;
    border-radius: 5px;
    border: 0px;
    background-color: white;
    border: 1px solid crimson;
    outline: none;
    color: crimson;
  }
  .item{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 14px;
    margin-top: -5px;
  }
.item ul{
   display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-left: -5px;
}

.item  span{
  height: 27px;
  line-height: 27px;
}
.item ul li{

  margin-left: 2px;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 2px 5px;
  border-radius: 4px;
}
.actives{
  background-color: rgba(244,90,141,1);
  color: white;
}
  .rows{
    display: flex;
    flex-direction: row;
  }
</style>
