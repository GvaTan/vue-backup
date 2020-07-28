<template>
  <div style="text-align: left">
    <h4>壁纸上传</h4>
    <div class="detail">
      <form id="form1" class="form-horizontal" action="http://localhost:8181/shopUpWallpaper" role="form" method="post" enctype="multipart/form-data">
        <div class="form-group">
          <label for="img" class="control-label col-md-2" style="background-color:rgba(0,161,241,1);color:white;height:35px;text-align:center;cursor:pointer;margin-left:30px">
            + 上传壁纸
            <input id="img" name="img" type="file" class="form-control" required accept="image/png, image/jpeg, image/gif, image/jpg" style='opacity:0;filter:alpha(opacity=0);'></input>
          </label>
          <b id="tip" style='color:rgba(0,161,241,1);height:30px;line-height:30px;margin-left:20px'> </b>
        </div>

        <div class="form-group">
          <label for="title" class="col-sm-2 control-label">壁纸名</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="title" required name="title" placeholder="给壁纸取一个好听的名字">
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
        <div class="form-group" >
          <label for="coin" class="col-sm-2 control-label">所属分类</label>
          <div class="col-sm-10" id="select1" style="display: flex;flex-direction: row;margin-top: 6px">

          </div>
        </div>
        <div class="form-group" >
          <label for="coin" class="col-sm-2 control-label">所属热门标签</label>
          <div class="col-sm-10" id="select2" style="display: flex;flex-direction: row;margin-top: 6px">

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
  import {treeQuery} from "../../api/Shop";
  import Tip from "../Tool/Tip"
  export default {
    components:{Tip},
        name: "UpWallpaper",
      data(){
          return {
            show:false,
            tip:{show:false,msg:""},
            deep:0
          }
      },
      mounted() {
        $("#img").bind("change",function(){
          $("#tip").html(this.value);
        });


        $("select").bind("change", ($event)=> {
            if($event.target.value=='0'){
              this.show=true;
            }else{
              this.show=false;
            }
        })

        this.tree();
      },
      methods:{
          async tree(){


            let {data}=await  treeQuery();

            this.xunhuan(data);

          },
         xunhuan(data){
            console.log(data);
            console.log();
           for(var i=0;i<data[0].children.length;i++){
              if(data[0].children[i].id==4){
                var content="";
                for(var j=0;j<data[0].children[i].children.length;j++){
                  content+="<span style='margin-left: 20px'>"+data[0].children[i].children[j].name+"</span>"+":<input  style='margin-left: 5px' name='treeIds0' type='checkbox' value='"+data[0].children[i].children[j].id+"'>";
                }
                $("#select1").html(content);
              }else{
                var content="";
                for(var j=0;j<data[0].children[i].children.length;j++){
                  content+="<span style='margin-left: 20px'>"+data[0].children[i].children[j].name+"</span>"+":<input  style='margin-left: 5px' name='treeIds1' type='checkbox' value='"+data[0].children[i].children[j].id+"'>";
                }
                $("#select2").html(content);
              }
           }
         },
        mysubmit(){
          this.tip.msg="正在提交...";
          this.tip.show=true;
          $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "application/json",//预期服务器返回的数据类型
            url: "http://localhost:8181/shopUpWallpaper" ,//url
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
