<template>
  <div id="list" >
      <div v-if="!films" style="color:white" class="container col-2">查询中...</div>
      <table class="layui-table" style="background-color:transparent;color:white">
        <colgroup>
            <col width="20%">
            <col width="20%">
             <col width="30%">
              <col width="10%">
               <col width="20%">
            <col>
        </colgroup>
        <thead style="background-color:transparent;color:white">
            <tr style="background-color:transparent;color:white">
            <th>影名</th>
            <th>导演</th>
            <th>主演</th>
            <th>类型</th>
            <th>更新时间</th>
            </tr> 
        </thead>
        <tbody v-if="films">
            <tr v-for="(item,index) in films">
               <td><a target="_blank" :href="item.url">{{item.namez}}</a></td>
                <td>{{item.director}}</td>
                <td>{{item.star}}</td>
                <td>{{item.types}}</td>
                <td>{{item.timez}}</td>
            </tr>
        </tbody>
        </table>
  </div>
</template>

<script>
import {getFilms} from '../../api/index'
export default {
  name: '',
  data(){
      return {
          films:null
      }
  },
  created(){
      this.initData();
  },
  methods:{
      async initData(){
              
              let {data:result} =await getFilms("*",1,100);
              if(result.success){
                  this.films=result.data.indexItems;
                  console.log(result.data.indexItems[0])
              }else{
                  this.$layer.msg("服务器错误，重试或者稍后访问");
              }
          
      },
  }
}
</script>

<style scoped>

#list{
    background-color: rgba(0, 0, 0, 0.8);
}
tbody tr:hover{
    background-color: rgba(6,47,74,1) !important;
}

th,td{
    border-left: 0px; border-right: 0px
}
th{
    border-top: 0px;
    opacity: 0.8;
}
</style>
