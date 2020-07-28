<template>
    <div class="right">
      <div class="panel center-block">
        <h3>基本信息</h3>
        <hr class="layui-bg-gray">
        <div>
          用户名：{{user.username}} &nbsp;&nbsp; | &nbsp;&nbsp; 邮箱:{{user.usermail}} &nbsp;&nbsp;|&nbsp;&nbsp; (积分)Acoin:{{user.acoin}} &nbsp;&nbsp;| &nbsp;&nbsp;coin(可提现):{{user.coin}}
        </div>
      </div>
      <div class="panel">
        <h3>我的收入</h3>
        <hr class="layui-bg-gray">
        <div>
          <table class="layui-table">
            <colgroup>
              <col width="150">
              <col width="200">
              <col>
            </colgroup>
            <thead>
            <tr>
              <th>订单编号</th>
              <th>商品名</th>
              <th>买家</th>
              <th>收入类型</th>
              <th>收入</th>
              <th>订单状态</th>
              <th>创建时间</th>
            </tr>
            </thead>
            <tbody v-if="orders">
                <tr v-for="(item,index) in orders" :key="index">
                <td>{{item.ticket}}</td>
                <td>{{item.shop.name}}</td>
                <td>{{item.buyer.username}}</td>
                <!-- <td><a target="_blank" :href="'http://pan.anets.top/#/share/'+item.shop.adresss">http://pan.anets.top/#/share/{{item.shop.adresss}}</a></td>
                <td>{{item.shop.password}}</td> -->
                  <td>{{item.paytype}}</td>
                  <td>{{item.pay}}</td>
                    <td>{{item.paystatu}}</td>
                    <td>{{item.updatetime}}</td>
              </tr>
            </tbody>
          </table>
           <div id="test1"></div>
        </div>
      </div>
    </div>
</template>

<script>
import {getOrdersSell} from '../../api/shop'
    export default {
        name: "Info",
      data(){
        return {
            orders:null,
            condition:{
              start:1,
              size:5,
              count:null,
              limit:null
            }
        }
      },
      created(){
        this.initOrders();
      },
      computed:{
        user:{
          get(){
            return this.$store.state.user;
          }
        }
      },
        methods:{
          async initOrders(){
            console.log("查询中");
              let {data:res} = await getOrdersSell(this.condition.start,this.condition.size);
              console.log(res);
              if(res.success){
                  this.orders=res.data.aorders;
                  this.condition.count=res.data.count;
                  this.condition.limit=res.data.limit;
                  this.initPageHelper();
              }else{
                this.$layer.msg(res.msg);
              }
          },
          initPageHelper(){
             layui.use('laypage', ()=>{
              var laypage = layui.laypage;
              
              //执行一个laypage实例
              laypage.render({
                elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,count: this.condition.count //数据总数，从服务端得到
                ,limit:this.condition.limit
                 ,jump: (obj, first)=>{
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数
                    this.condition.start=obj.curr;
                    this.condition.limit=obj.limit;
                    this.initNewOrders();
                    //首次不执行
                    if(!first){
                      //do something
                    }
                  }
              });
            });
          },
          async initNewOrders(){
            console.log("查询中");
              let {data:res} = await getOrdersSell(this.condition.start,this.condition.size);
              console.log(res);
              if(res.success){
                  this.orders=res.data.aorders;
                  this.condition.count=res.data.count;
                  this.condition.limit=res.data.limit;
              }else{
                this.$layer.msg(res.msg);
              }
          }
        }
    }
</script>

<style scoped>
  .right{
    padding-top: 20px;
  }

  .right .panel{
    width:100%;
    padding: 20px 20px 20px 10px;
    margin: auto;
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.07);
    margin-top: 20px;
  }


  h3{
    border-left: 5px solid #ee1289;
    padding-left: 10px;
    font-size: 16px;
  }
</style>
