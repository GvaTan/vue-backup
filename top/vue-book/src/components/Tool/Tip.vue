<template>
<!--  <Tip :show="tip.show" :msg="tip.msg" ></Tip>-->
    <div class="tip" v-if="show">
       {{msg}}
    </div>
</template>

<script>
    export default {
        name: "Tip",
      props:["show","msg"],
      watch:{

      }
    }
</script>

<style scoped>
.tip{
  position: fixed;
  bottom: 50px;
  right: 0px;
  padding-left: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 10px;
  z-index: 10000;
  background-color: rgba(0,154,229,1);
  font-size: 15px;
}
</style>
