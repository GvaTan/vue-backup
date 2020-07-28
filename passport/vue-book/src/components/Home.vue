<template>
    <div>
    </div>
</template>

<script>
    export default {
        name: "Home",
      created() {
          if(this.$route.query.from){
            this.$router.push({path:'/user/login',query:{from:this.$route.query.from}});
          }else{
            this.$router.push({path:'/user/login'});
          }
      }
    }
</script>

<style scoped>

</style>
