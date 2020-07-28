<template>
    <div>
         <div id="download">
              <div class="btn">立即下载</div>
         </div>
        <div class="buy">
            <div class="content">
                 <div class="pay">
                    <ul>
                      <li><span>微信支付</span></li>
                      <li><span>coin币支付</span></li>
                      <li><span>a币支付</span></li>
                      <li><span>免费获取</span></li>
                    </ul>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "download"
    }
</script>

<style scoped>
#download{
   margin-bottom: 100px;
}


  .btn{
    border: 1px solid rgba(244,90,141,1);
    transition: all 0.3s;
    padding: 5px 20px;
  }
.btn:hover{
  color: white;
  background-color: rgba(244,90,141,1);
}

.pay ul{
  display: flex;
  flex-direction: row;
}


.pay ul li{
  width:100px;
  border-left:  1px dotted whitesmoke;
}
.pay ul li:first-child{
  border-left:  0px dotted whitesmoke;
}
  .buy{
    position: fixed;
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    z-index: 999;
  }

.buy .content{
  position: absolute;
  padding: 20px 30px;
  background-color: black;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
}
</style>
