<template>
    <div style="text-align: left">
      <h4>资金信息</h4>
      <div class="detail">
         <ul>
           <li>Coin币：{{user.coin}}</li>
           <li>A币：{{user.acoin}}</li>
         </ul>
      </div>
      <h4>申请提现</h4>
      <div class="">
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">提现用户</label>
            <div class="col-sm-10">
              <input type="text" disabled class="form-control" id="firstname" name="id" v-model="user.usermail">
            </div>
          </div>
          <div class="form-group">
            <span style="margin-left: 150px">可提现金额：5Coin=5元</span>
          </div>

          <div class="form-group">
            <label for="lastname" class="col-sm-2 control-label">提现金额</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" id="lastname" placeholder="单位：元">
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-sm-2 control-label">收款方式</label>
            <div class="col-sm-10">
              <select name="" id="" class="form-control">
                <option value="" selected>微信</option>
                <option value="" selected>支付宝</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-sm-2 control-label">收款账号</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="lastname" placeholder="请填写正确的收款账号，否则无法正常到账！">
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-sm-2 control-label">收款姓名</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="lastname" placeholder="请填写收款人真实姓名">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-default">提交</button>
            </div>
          </div>
        </form>

      </div>
    </div>
</template>

<script>
    export default {
        name: "Account",
      data(){
          return {
            user:{id:1,name:"",usermail:"",head:"",coin:0,acoin:0,saying:""}
          }
      },computed:{
        userz:{
          get(){
            return this.$store.state.user;
          }
        }
      },watch:{
        userz:{
          handler(newval,oldval){
            if(newval!=null){
              // alert(1);
              this.user=newval;
            }
          },immediate:true,deep:true
        }
      }
    }
</script>

<style scoped>
h4{
  border-left: 5px solid rgba(244,90,141,1);padding-left: 10px
}

  .detail{
    margin-bottom: 20px;
  }
</style>
