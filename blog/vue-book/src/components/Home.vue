<template>
  <div id="home" class="" >



     <Nav></Nav> 
     <div class="banner col-12 p-0 m-0">
         <p class="col-12 col-md-2" id="say">有一个死角，自己走不出来，别人也闯不进去，我把最深沉的秘密放在那里，你不懂我，我不怪你。
           <br><br>
        人长大了要学会世故，圆滑，一笑遮百丑。
        就算要像野草一样坚韧,也不要没了天真与幻想。</p>
     </div>

      <div class="middle col-12">
         <div class="container col-12 col-md-7">
             <h3 style="background-color:#474645;color:white">
                <span>Blog Links</span>&nbsp;快捷入口
              </h3>
         </div>
         <div  class="container col-12 col-md-7 to">
              <ul class="col-12 p-0">
                <li class="col-2 m-0 p-0" v-for="(item,index) in links">
                  <a href="">
                     <img style="width:100%" :src="item.img" alt="">
                  </a>
                </li>
              </ul>
         </div>
         <div class="container col-12 col-md-7" style="overflow:hidden;height:40px;line-height:35px;border:2px #400000 solid; border-right :none; border-left :none;  border-radius: 10%;background-color: #FFFF00;">
				 <div id="moodShow" style="display:block ;"><!-- none -->
				   	<img src="https://www.zjhuiwan.cn/img/33.gif" style="display:inline-block;"><span style="font-weight: bold;">说说：</span>世界这么大还是遇见你,一起走过许多个四季,天南地北,别忘记我们之间的情谊...(脑子混乱的一个周末)<a href="readall?currentPage=1" title="全部" style="font-size: 10px;color: blue;margin-left: 18px;">查看更多&gt;&gt;</a>
				 </div>
			  </div>
      </div>

     <Article></Article>
      
  
  </div>
</template>

<script>
import Nav from './Home/Nav'
import Article from './Home/Article'
export default {
  name: 'Home',
  components:{Nav,Article},
  data(){
    return {
        links:[
          {url:"",img:'http://anets.top/group1/M00/00/05/rBEqJl6VaIaAHEOvAAAh75k9sXQ869.jpg'},
          {url:"",img:'http://anets.top/group1/M00/00/05/rBEqJl6VbBqAEawRAAAU1bR4aJE198.jpg'},
          {url:"",img:'http://anets.top/group1/M00/00/05/rBEqJl6VUMeAE7RvAAAa0omUAsE978.jpg'},
          {url:"",img:'http://anets.top/group1/M00/00/05/rBEqJl6VRZqAfW_kAAAPbhtZDlc700.jpg'},
          {url:"",img:'http://anets.top/group1/M00/00/04/rBEqJl6RJxyASVxBAAAQNhVFh8Q043.jpg'},
        ]
       

    }
  },
  computed:{
    user:{
      get(){
         return this.$store.state.user;
      }
    }
  },
  created(){

  },
  mounted(){
   
  },
  watch:{
   
  },
  methods:{
    
  }
  
}
</script>

<style scoped>
#home{
    /* background:inherit */
    transition: all 0.5s;
}
.banner{
   background-image: url('../../static/images/bg/bg.jpg');
   /* background-color: red; */
   background-repeat: no-repeat;
   background-size: cover;
   height: 260px;
   margin-top:-15px !important;
}
#say{
   color: rgba(0,0,0,0.5);
   /* width:25%; */
   margin-left: -15%;
   position: absolute;
   top:50%;
   left:50%;
   transform: translate(-50%,-50%);
} 
.middle{
  background-color: #efeeeb;
  height: 230px;
  padding-top: 20px;
}

h3{
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  padding: 0px 10px;
  width:150px;
}
/*PHONE屏幕下的专用样式*/
 /* @media screen and (max-width:767px) {
     #topz{
       background: transparent !important;
       margin-top:-8vh;
     }

     #basics{
        margin-top:10vh;
     }
 } */

 .to ul{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding: 0px;
   margin: 0px;
   /* background-color: red; */
   margin-bottom: 25px;
 }
.to ul li img{
  transition: all 0.5s;
}
  .to ul li img:hover{
    filter: contrast(120%);
  }
</style>
