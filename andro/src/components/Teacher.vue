<template>

    <div class="all">

        <div class="header">
          <img src="http://img04.taobaocdn.com:80/tfscom/TB116EKc21G3KVjSZFkXXaK4XXa" alt="" width="100px">
        </div>
      <div class="content" style="overflow: auto">
      <h3>负责人:谭大娇</h3>
        <p>手机(微信同号)：13559473833</p>
        <div class="line"></div>
        <p style="width: 80%;margin: auto;margin-top: 20px;text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搜爱美学首席形象顾问，形象礼仪培训师，优秀的设计师培训导师，色彩搭配美学顾问，有着8年的服装零售经验，从事形象设计4年，有着非常实用且落地的商业系统，学习落地简单轻松，已获得JYPC全国职业资格考试认证</p>
        <h5 style="margin-top: 10px;margin-bottom: 5px">长按咨询</h5>
        <img src="http://img04.taobaocdn.com:80/tfscom/TB1La.Qc9WD3KVjSZSgXXcCxVXa" alt="" width="150px">
      </div>
      <a href="tel:13559473833" style="color: white"><div class="bottom">电话联系她</div></a>
    </div>

</template>

<script>
    export default {
        name: "Teacher"
    }
</script>

<style scoped>
.all{
  position: fixed;
  width:100%;
  height: 100%;
  overflow: auto;
  /*background-color: rgba(0,0,0,0.8);*/
}

.header{
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50%;
  /*background-color: crimson;*/
  margin-top: 3%;
  overflow: hidden;
  border: 2px solid rgba(236,215,48,1);
  box-shadow: 0px 1px 5px rgba(0,0,0,0.2);
}
.header img{
  border-radius: 50px;
  /*border: 1px solid red;*/

}

  .content{
    padding-top: 10%;
   position: absolute;
    width: 90%;
    /*height: 1111px;*/
    padding-bottom: 50px;
    margin: auto;
    margin-top: -30px;
    z-index: -1;
    left:5%;

    border-radius: 5px;
    background-color: rgba(236,215,48,1);
    /*background-color: yellow;*/
  }

  .line {
    width: 80%;
    height: 20px;
    border-bottom: 2px dashed white;
    margin: auto;
  }
  .bottom{
    color: white;
    text-align: center;
    position: fixed;
    height: 40px;
    line-height: 40px;
    width: 95%;
    bottom: 2%;
    margin:auto;
    margin-left: 2.5%;
    background-color: rgba(237,80,80,1);
    border-radius: 5px;
  }

</style>
