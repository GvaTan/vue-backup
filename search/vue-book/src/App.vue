<template>
  <div id="app" :style="{'':''}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'yyyy',
  data(){
    return {
      //白黑搭配(推荐默认)
      color08:{
          font:"#ee1289",
          fontCommon:"#777",
          bg:"rgba(255,255,255,1)",
          searchBg:'rgba(255,255,255,1)',
          basic:"rgba(255,255,255,1)",
          associate:"rgba(0,0,0,0.8)",
          associateLiHover:"rgba(244,90,141,0.2)",
          control:"rgba(32, 32, 32, 0.9)",
          controlPanel:"rgba(0, 0, 0, 0.8)",
          controlFont:"white"
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
    this.changeColor()
    this.changeFontSize()
    // alert(1);
    this.initUser()
  },
  mounted(){
    
  },
  methods:{
    changeColor(){
      let a=localStorage.getItem("theme");
      if(a){
          this.$store.commit("setColor",JSON.parse(a))
      }else{
         this.$store.commit("setColor",this.color08)
      }
     
    },
    changeBg(){ // 改变背景
    let bg=localStorage.getItem("bg");
      if(bg){
         let url="url('"+bg+"')";
         $("body").css("background-image",url);
      }else if(bg==''){
        // 原生
      }else{
        let url="url('"+this.bg[3]+"')";
         $("body").css("background-image",url);
      }
    },
    changeFontSize(){
      this.$store.commit("setFontSize",this.fontSize)
    },
    initUser(){
            //从本地取user。如果能，那么不用从服务端获取用户，只需要通过token获取session
             if( this.$cookie.get("token")||localStorage.getItem("token")){
               console.log("token",this.$cookie.get("token"));
               //通过token获取用户信息
               this.gainUserByToken(this.$cookie.get("token")||localStorage.getItem("token"));
             }else{
               this.$store.commit("setUser",false)
               console.log("需要登陆");
               //需要登陆
             }
          },
        gainUserByToken(token){
            $.ajax({
              url:this.$store.state.passportServiceUrl+'/user/token/'+token+'.action',
              type:'GET',
              dataType:'jsonp',
              success:(data)=>{
                console.log(data);
                if(data.success){
                  this.$store.commit("setUser",data.data)
                  console.log(this.$store.state.user);
                  localStorage.setItem("token",token);
                }else{
                  console.log(data.msg);
                  //  this.$layer.msg(data.msg);
                   this.$store.commit("setUser",false)
                  localStorage.removeItem("token");
                }
              },
              error:(data)=>{
                console.log("失败",data);
                 this.$store.commit("setUser",false)
                 localStorage.removeItem("token");
              }
            });
        }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   background:inherit;
   transition: all 0.5s;
}

/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
     #app{
       background: transparent !important;
     }
     html,body{
       overflow:auto !important;
     }

 }

html,body{
  width:100%;
  min-height:100%;
  background-color:#EEF2F5;
  overflow:hidden;
  z-index: -999;
}

body{
  position: fixed;
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
