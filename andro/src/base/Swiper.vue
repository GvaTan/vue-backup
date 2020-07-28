<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in sliders" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    props:[
      'sliders'
    ],
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          }
        }
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.sliders.length < 3) {
          this.sliders.push(this.sliders.length + 1)
        }
      }, 3000)
    }
  }
</script>
<style scoped>
  img{
    margin-top:-10px;
    width:100%;
  }
</style>
