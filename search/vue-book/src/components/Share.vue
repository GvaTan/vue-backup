<template>
  <div id="share" :style="{'':''}">
         
         <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'Share',
  data(){
    return {
      color0:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,0.8)",
          basic:"rgba(255,255,255,0)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)"
      },
      color1:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,1)",
          basic:"rgba(255,255,255,1)",
          associate:"rgba(255,255,255,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)"
      },
      color2:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(0,0,0,0.8)",
          basic:"rgba(255,255,255,1)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)"
      },
      fontSize:{
        associate:14
      },
      bg:[
        "https://w.wallhaven.cc/full/r2/wallhaven-r2x92w.jpg",
        "https://w.wallhaven.cc/full/6k/wallhaven-6k1z3x.jpg",
        "https://w.wallhaven.cc/full/39/wallhaven-398j69.png",
        "http://120.55.95.79/group1/M00/00/03/rBEqJl6QMTCAYy2xABnXVqwkt6Q167.jpg"
      ]
    }
  },
  computed:{
    color:{
      get(){
        return this.$store.state.color;
      }
    }
  },
  created(){
    
    this.changeBg()
    // this.changeColor()
    // this.changeFontSize()
  },
  mounted(){
    
  },
  methods:{
    changeColor(){
      this.$store.commit("setColor",this.color1)
    },
    changeBg(){ // 改变背景
      let url="url('"+this.bg[3]+"')";
      $("body").css("background-image",url);
    },
    changeFontSize(){
      this.$store.commit("setFontSize",this.fontSize)
    }
  }
}
</script>

<style>
#share {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   background:inherit;
   transition: all 0.5s;
   /* background-color: red; */
}


html,body{
  /* width:100%;
  min-height:100%; */
  background-color:#EEF2F5;
  overflow-y: auto !important;
}

/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
    
     html,body{
       overflow:auto !important;
     }

 }
body{
  position: absolute;
   width:100%;
   min-height:100%;
   /* background-color: rgba(32,32,32,1); */
    /* background:url(""); */
    background-position: center;
     /* background-color:red; */
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size:cover;
    
}
</style>
