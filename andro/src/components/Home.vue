<template>
 <div>
   <Contents></Contents>
   <Bottom></Bottom>
 </div>
</template>

<script>
  import Bottom from './Bottom'
  import Contents from './Contents'
  export default {
        name: "Home",
      components:{
        Bottom,Contents
      },
      data(){
          return {

          }
      },
      methods:{

      },


    }
</script>

<style scoped>

</style>
