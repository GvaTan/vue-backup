<template>
  <div id="history"  class="container p-0  col-12 ">
      <ul class="col-12 col-sm-12">
          <li class="col-2 col-sm-1 p-2 p-sm-3" v-for="(item,index) in  historyView">
             <a  :href="item.url" target="_blank"> <img style="max-width:54px;"  :src="'http://anets.top/'+item.img" alt=""></a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
      return {

      }
  },
  computed:{
      historyView:{
          get(){
              return this.$store.state.historyView;
          }
      },
      color:{
        get(){
            return this.$store.state.color;
        }
     }

  }
}
</script>

<style scoped>
#history{
    /* margin-top: 5vh; */
     border-radius: 5px;
    /* margin-top: 62vh; */
}
#history ul{
    /* background-color: green; */
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0px;
}
#history ul li{
   /* border: 1px solid red; */
}
#history ul li img{
   opacity: 0.95;
   /* background-color: black; */

   transition: all 0.5s;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.1);
}

#history ul li a{
    /* display: inline-block; */
}
#history ul li:hover img{
    opacity: 1;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
}
#history ul li img{
   width:100%;
   height:100%;
   border-radius: 50%;
}

</style>
