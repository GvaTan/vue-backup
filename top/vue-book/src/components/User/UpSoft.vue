<template>
  <div style="text-align: left">
    <h4>壁纸上传</h4>
    <div class="detail">
      <form id="form1" class="form-horizontal" action="http://localhost:8181/shopUpSoft" role="form" method="post" enctype="multipart/form-data">
        <div class="form-group">
          <label for="img" class="control-label col-md-2" style="background-color:rgba(0,161,241,1);color:white;height:35px;text-align:center;cursor:pointer;margin-left:30px">
            + 上传缩略图
            <input id="img" name="img" type="file" class="form-control" required accept="image/png, image/jpeg, image/gif, image/jpg" style='opacity:0;filter:alpha(opacity=0);'></input>
          </label>
          <b id="tip" style='color:rgba(0,161,241,1);height:30px;line-height:30px;margin-left:20px'> </b>
        </div>

        <div class="form-group">
          <label for="title" class="col-sm-2 control-label">标题</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="title" required name="title" placeholder="请填写标题">
          </div>
        </div>
        <div class="form-group">
          <label for="tags" class="col-sm-2 control-label">标签</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="tags" required name="tags" placeholder="每个标签用逗号隔开">
          </div>
        </div>
        <div class="form-group">
          <label for="isFree" class="col-sm-2 control-label">是否收费</label>
          <div class="col-sm-10">
            <select name="isFree" id="isFree" class="form-control">
              <option value="1" selected>免费</option>
              <option value="0" >付费</option>
            </select>
          </div>
        </div>
        <div class="form-group" v-if="show">
          <label for="acoin" class="col-sm-2 control-label">所需A币</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" name="acoin" id="acoin" placeholder="">
          </div>
        </div>
        <div class="form-group" v-if="show">
          <label for="coin" class="col-sm-2 control-label">所需Coin币</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" name="coin" id="coin" placeholder="">
          </div>
        </div>
        <div class="form-group">
          <label for="url" class="col-sm-2 control-label">下载地址：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="url" required name="url" placeholder="填写网盘链接">
          </div>
        </div>
        <div class="form-group">
          <label for="isPassword" class="col-sm-2 control-label">有无密码</label>
          <div class="col-sm-10">
            <select name="isPassword" id="isPassword" class="form-control">
              <option value="1"  >有</option>
              <option value="0"  selected>无</option>
            </select>
          </div>
        </div>

        <div class="form-group" v-if="show1">
          <label for="password" class="col-sm-2 control-label">下载密码：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="password" required name="password" placeholder="填写下载密码">
          </div>
        </div>
        <div class="form-group">
          <label for="discript" class="col-sm-2 control-label">简单描述：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="discript" required name="discript" placeholder="">
          </div>
        </div>
        <div class="form-group">
          <label for="detail" class="col-sm-2 control-label">详细介绍：</label>
          <div class="col-sm-10">
            <textarea name="detail" class="form-control" id="detail" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div class="form-group" >
          <label for="coin" class="col-sm-2 control-label">所属分类</label>
          <div class="col-sm-10" id="select1" style="display: flex;flex-direction: row;margin-top: 6px">

          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button @click="mysubmit()" class="btn btn-default">提交</button>
          </div>
        </div>
      </form>
    </div>
    <Tip :show="tip.show" :msg="tip.msg" ></Tip>
  </div>
</template>

<script>
  import {treeQuerySoft} from "../../api/Shop";
  import Tip from "../Tool/Tip"
  export default {
    components:{Tip},
    name: "UpSoft",
    data(){
      return {
        show:false,
        show1:false,
        tip:{show:false,msg:""},
        deep:0
      }
    },
    mounted() {
      $("#img").bind("change",function(){
        $("#tip").html(this.value);
      });


      $("#isFree").bind("change", ($event)=> {
        if($event.target.value=='0'){
          this.show=true;
        }else{
          this.show=false;
        }
      });

      $("#isPassword").bind("change", ($event)=> {
        if($event.target.value=='1'){
          this.show1=true;
        }else{
          this.show1=false;
        }
      })

      this.tree();
    },
    methods:{
      async tree(){


        let {data}=await  treeQuerySoft();

        this.xunhuan(data);

      },
      xunhuan(data){
        console.log(data);
        console.log();
        var content="";
        for(var j=0;j<data[0].children.length;j++){
          content+="<span style='margin-left: 20px'>"+data[0].children[j].name+"</span>"+":<input  style='margin-left: 5px' name='treeIds0' type='checkbox' value='"+data[0].children[j].id+"'>";
        }
        $("#select1").html(content);
      },
      mysubmit(){
        this.tip.msg="正在提交...";
        this.tip.show=true;
        $.ajax({
          //几个参数需要注意一下
          type: "POST",//方法类型
          dataType: "application/json",//预期服务器返回的数据类型
          url: "http://localhost:8181/shopUpSoft" ,//url
          data: $('#form1').serialize(),
          success: (result)=> {
            this.tip.msg="投稿状态："+result.state;
            this.tip.show=true;
          },
          error : (result)=> {
            this.tip.msg="投稿状态："+result.state;
            this.tip.show=true;
          }
        });


      }
    }
  }
</script>

<style scoped>
  h4{
    border-left: 5px solid rgba(244,90,141,1);padding-left: 10px
  }

  select{
    color: black;
  }
  .detail{
    margin-bottom: 20px;
  }
</style>
