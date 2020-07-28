<template>
    <div class="header">
      <slot name="title"></slot>
      <i class="iconfont icon-fanhui-yuanshijituantubiao" v-show="back" @click="callback"></i>
    </div>
</template>

<script>
    export default {
        name: "Header",
      props:{
          back:{
            type:Boolean,
            default:false
          }
      },
      methods:{
          callback(){
            this.$router.go(-1);
          }
      }
    }
</script>

<style scoped>
.header{
  position: fixed;
  top:0px;
  width: 100%;
  height: 50px;
  background-color: deeppink;

  text-align: center;
  line-height: 50px;
  font-weight: bold;
  color: white;

}
  i{
    position: absolute;
    left:10px;
  }
</style>
