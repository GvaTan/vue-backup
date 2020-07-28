<template>
  <div id="rank" class="container col-12 col-sm-12 col-md-10 col-lg-9">
      <h2>网址排行榜（热度榜）</h2>

      <div>
          <table class="layui-table" v-if=" urlsz">
                            <colgroup>
                                <col width="60">
                                <col width="100">
                                 <col width="20">
                                  <col width="200">
                                   <col width="200">
                                   <col width="300">
                                <col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>排名</th>
                                    <th>网站名</th>
                                    <th>Logo</th>
                                    <th>网站地址</th>
                                    <th>标签</th>
                                    <th>描述</th>
                                    <th>浏览</th>
                                    <th>时间</th>
                                    
                                    <th>状态</th>
                                    <th>喜欢</th>
                                    <th>操作</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr v-for="(item1,index1) in urlsz">
                                    <td>
                                        <span v-if="index1==0" class="layui-badge">{{index1+1}}</span>
                                        
                                        <span v-if="index1==1" class="layui-badge layui-bg-green">{{index1+1}}</span>

                                        <span v-if="index1==2" class="layui-badge layui-bg-cyan">{{index1+1}}</span>

                                        <span v-if="index1!=0&&index1!=1&&index1!=2">{{index1+1}}</span>
                                    </td>
                                    <td>{{item1.name}}</td>
                                    <td><img style="width:20px;height:20px;" :src="'http://anets.top/'+item1.img" alt=""></td>
                                    <td><a target="_blank" :href="item1.url">{{item1.url}}</a></td>
                                    <td>{{item1.tags}}</td>
                                    <td>{{item1.discription}}</td>
                                    <td>{{item1.views}}</td>
                                     
                                      <td>{{item1.updatetime}}</td>
                                       <td>{{item1.state}}</td>
                                       <td>{{item1.likes}}</td>
                                       <td style="color:#ee1289;font-size:15px;">
                                            <i @click="praise(item1.wid)" class="layui-icon layui-icon-praise" ></i>  
                                             <i@click="tread(item1.wid)" class="layui-icon layui-icon-tread"></i> 

                                             <router-link :to="'/share/update?wid='+item1.wid"><i class=" layui-icon layui-icon-edit"></i></router-link>
                                       </td>
                                </tr>
                            </tbody>
                            </table>
                            <button type="button" class="layui-btn " @click="toUpUrl()" style="position:absolute;left:50%;transform:translate(-50%,0);margin:auto;margin-top:20px;background-color:#ee1289">分享你觉得好用的网址</button>
 
      </div>
       
       <button type="button" class="layui-btn" @click="toUpUrl()" style="position:fixed;bottom:20px;right:0px;background-color:#ee1289">为什么没有我想要的网站？点击添加</button>

  </div>
</template>

<script>
import {getRank,getPraise,getTread} from "../../api/index"
export default {
  name: '',
  data(){
      return {
         urlsz:null
      }
  },
  created(){
      this.initDataRank();
  },
  methods:{
    async initDataRank(){
      let {data:res} = await getRank();
      this.urlsz=res.data;
      this.initHistoryView();
    },
    async praise(wid){//赞功能
          let  {data:res} = await  getPraise(wid);
          this.$layer.msg(res.msg);
          if(res.success){
            //   成功
             this.initDataRank();
          }
      },
      async tread(wid){//赞功能
          let  {data:res} = await  getTread(wid);
          this.$layer.msg(res.msg);
          if(res.success){
            //   成功
            this.initDataRank();
          }
      },
      toUpUrl(){
          this.$router.push({path:'/share/upUrl'})
      },
  }
}
</script>

<style scoped>
#rank{
      background-color: white;
   border-top-right-radius: 10px;
    border-top-left-radius: 10px;
   margin-top: 10vh;
   height: 100%;
   color:#777;
   padding: 10px 10px;
   /* overflow: auto; */
   transition: all 0.5s;
   padding-bottom: 90px;
   
   
}

h2{
    border-left:5px solid #ee1289;
    padding-left: 10px;
    font-size: 25px;
}

</style>
