<template>
  <div class=" box">
       <div  class="layui-carousel" id="test1">
        <div  carousel-item>
            <div class="item" style="background-image:url('../../static/images/bg/bg.jpg')"></div>
            <!-- <div class="item"></div> -->
        </div>
        </div>
        <!-- 条目中可以是任意内容，如：<img src=""> -->
  </div>
</template>

<script>
export default {
  name: '',
  data(){
      return {

      }
  },
  mounted(){
      layui.use('carousel', function(){
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#test1'
            ,width: '100%' //设置容器宽度
            ,height:'180px'
            ,arrow: 'hover' //始终显示箭头
            ,indicator: 'none' //切换动画方式
        });
        });
  }
}
</script>

<style scoped>
.box{
    /* background-color:red; */
    
}
.item{
        background-size:100% 100%;
}
img{
    width:100%;
    height:200px;
}

</style>
