<template>
  <div id="" >
       <table class="layui-table">
        <colgroup>
          <col width="150">
          <col width="200">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>序号</th>
            <th>文章标题</th>
            <th>预览图</th>
            <th>发布地址</th>
            <th>点击量</th>
            <th>喜欢</th>
            <th>评论</th>
            <th>发布时间</th>
             <th>操作</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,index) in articles">
            <td>{{index+1}}</td>
            <td>{{item.articleTitle}}</td>
            <td>
              <img :src="'http://anets.top/'+item.articleImg" alt="">
            </td>
            <td><router-link :to="'/detail/'+item.articleId+'.html'">http://blog.anets.top/detail/{{item.articleId}}.html</router-link></td>
            <td>{{item.articleViews}}</td>
            <td>{{item.articleLikeCount}}</td>
            <td>{{item.articleCommentCount}}</td>
            <td>{{item.articleDate}}</td>
            <td>
             <router-link :to="'/user/modify?id='+item.articleId"> <button type="button" class="layui-btn layui-btn-sm">
                <i class="layui-icon">&#xe642;</i>
              </button></router-link>
              <button @click="remove(item.articleId)" type="button" class="layui-btn layui-btn-sm">
                <i class="layui-icon">&#xe640;</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import {getRelease,deleteArticle} from '../../api/index'
export default {
  name: '',
  data(){
    return {
      articles:[]
    }
  },
  created(){
      this.initData();
  },
  methods:{
     async initData(){
          let {data:res} = await getRelease(0,100);
          this.articles=res.data;
     },
     async remove(id){
         let {data:res} = await deleteArticle(id);
         if(res.success){
              this.initData();
         }
         this.$layer.msg(res.msg);
     }
  }
}
</script>

<style scoped>

</style>
