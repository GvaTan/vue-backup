<template>
    <div id="bottom">
          <ul>
<!--            <li "</li>-->
            <router-link to="/buy" tag="li" style="width: 70%;background-color: orange">领取丝巾</router-link>

            <router-link to="/teacher" tag="li" style="width: 30%;background-color:red">咨询</router-link>
          </ul>
    </div>
</template>

<script>
    export default {
        name: "Bottom"
    }
</script>

<style scoped>
#bottom{
  position:fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  background-color:white;
  border-top: 2px solid rgba(0,0,0,0.1);
}

  #bottom ul{
    padding-left: 0px;
  }

#bottom ul li{
  margin-left: 0px;
  height: 60px;
  line-height: 60px;
  color: white;
  /*background-color: black;*/
}
</style>
