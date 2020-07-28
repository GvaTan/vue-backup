<template>
    <div id="swiper">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
          <div id="imgs" class="imgs" v-if="show">

          </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Swiper",
       data(){
          return {
            show:true,


          }
       },
      created() {

      }
    }
</script>

<style scoped>
.imgs{
  width: 100%;
  height: 200px;
  background:url('http://img01.taobaocdn.com:80/tfscom/TB1YDKAdxz1gK0jSZSgXXavwpXa');
  background-size: cover;
}

</style>
