<template>
    <div id="pageBean" v-if="data.show">
        <ul>
          <li @click="page(1)">首页</li>
          <li>上一页</li>
          <li v-for="(item,index) in data.pageCount"  @click="page(item)"  :class="{bg:item==data.currentPage}">{{item}}</li>
          <li>下一页</li>
          <li @click="page(data.pageCount)">末页</li>
          <li style="border: none">| 共{{data.records}}条记录</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "PageBean",
        props:["data"],
      methods:{
          page(index){
           this.$emit('toPage',index);
          }
      }
    }
</script>

<style scoped>
#pageBean{
  margin-top: 10px;
  width: 1540px;
  margin: auto;
  position: relative;
}

  ul{
    display: flex;
    flex-direction: row;
    position: absolute;
    right:0px;
    margin-top: 20px;
  }
ul li{
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.7);
  height: 30px;
  line-height: 30px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 5px;
  margin-left: 5px;
}


  .bg{

    color: rgba(255,255,255,1);
    background-color: rgba(244,90,141,1);
    border: 1px solid rgba(244,90,141,1);
  }
</style>
