<template>
    <div id="home" class="container-fluid p-0">
         <Navigator></Navigator>
      <Search></Search>
      <List></List>
    </div>
</template>

<script>
    import Navigator from './Navigator'
    import Search from './Search'
    import List from './List'
    export default {
        name: "Home",
      components:{Navigator,Search,List}
    }
</script>

<style scoped>
#home{
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  /*padding: ;*/
}
</style>
