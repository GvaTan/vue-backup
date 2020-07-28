<template>
  <div id="detail" class="container col-12 col-sm-12 col-md-10 col-lg-9">
       <button type="button" class="layui-btn " @click="toRank()" style="position:absolute;right:-40px;top:-60px;transform:translate(-50%,0);margin:auto;background-color:#ee1289">总排行榜</button>
 
      <div v-if="!url" style="text-align:center">
           数据获取中....
      </div>
       <div class="parent" v-if="url" style="margin-top:-70px;position:relative" >
           <img :src="'http://anets.top/'+url.img" alt="">
           <div style="text-align:center;position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0.6);z-index:55;top:0px;left:0px">
                <h4 style="margin-top:40px"> {{url.name}}</h4>
              
                <p style="color:#ee1289;bfont-size:15px;position:absolute;bottom:-20px;right:0px">
                   <span><i class="layui-icon layui-icon-heart-fill" ></i>  {{url.likes}}</span>
                   <i @click="praise(url.wid)" class="layui-icon layui-icon-praise" ></i>  
                   <i @click="tread(url.wid)" class="layui-icon layui-icon-tread" ></i>  </p>
           </div>
       </div>

       <div class="children">
           <ul v-if="url">
               <li v-for="(item,index) in url.children">
                    <div class="head" style="margin-top:-70px;position:relative" >
                        <img :src="'http://anets.top/'+item.img" alt="">
                        <div style="text-align:center;position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0.6);z-index:55;top:0px;left:0px">
                                <h6 style="margin-top:30px"> {{item.name}}</h6>
                            
                                <p style="color:#ee1289;font-size:15px;position:absolute;bottom:-20px;right:0px">
                                <span><i class="layui-icon layui-icon-heart-fill" ></i>  {{item.likes}}</span>
                                <i @click="praise(item.wid)" class="layui-icon layui-icon-praise" ></i>  
                                <i @click="tread(item.wid)" class="layui-icon layui-icon-tread" ></i>  </p>
                        </div>
                    </div>

                    <div>
                        <table class="layui-table" style="background-color:transparent;color:white">
                            <colgroup>
                                <col width="60">
                                <col width="100">
                                 <col width="20">
                                  <col width="200">
                                   <col width="200">
                                   <col width="300">
                                <col>
                            </colgroup>
                            <thead style="background-color:transparent;color:white">
                                <tr style="background-color:transparent;color:white">
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
                                <tr v-for="(item1,index1) in item.children">
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
                                             <i@click="tread(item1.wid)" class="layui-icon layui-icon-tread" ></i> 
                                       </td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
               </li>
           </ul>
       </div>
        <button type="button" class="layui-btn " @click="toUpUrl()" style="position:absolute;left:50%;transform:translate(-50%,0);margin:auto;margin-top:100px;background-color:#ee1289">分享你觉得好用的网址</button>
 
       <button type="button" class="layui-btn" @click="toUpUrl()" style="position:fixed;bottom:20px;right:0px;background-color:#ee1289">为什么没有我想要的网站？点击添加</button>
  </div>
</template>

<script>
import {getSelfAndChildren,getTread,getPraise} from '../../api/index'
export default {
  name: '',
  data(){
      return {
          url:null
      }
  },
  created(){
      if(this.$route.query.wid){
           this.initData(this.$route.query.wid)
      }
      
  },
  methods:{
      async initData(wid){
          let {data:res} = await getSelfAndChildren(wid);
          console.log(res.data);
         if(res.data){
              this.url=res.data;
         }else{
             this.$layer.msg("数据获取为空，没有该分类")
         }
      },
      async praise(wid){//赞功能
          let  {data:res} = await  getPraise(wid);
          this.$layer.msg(res.msg);
          if(res.success){
            //   成功
            this.initData(this.$route.query.wid);
          }
      },
      async tread(wid){//赞功能
          let  {data:res} = await  getTread(wid);
          this.$layer.msg(res.msg);
          if(res.success){
            //   成功
            this.initData(this.$route.query.wid);
          }
      },
      toUpUrl(){
          this.$router.push({path:'/share/upUrl'})
      },
      toRank(){
          this.$router.push({path:'/share/rank'})
      }
  }
}
</script>

<style scoped>
#detail{
      background-color: rgba(0, 0, 0, 0.9);
   border-top-right-radius: 10px;
    border-top-left-radius: 10px;
   margin-top: 10vh;
   height: 100%;
   color:white;
   padding: 10px 10px;
   /* overflow: auto; */
   transition: all 0.5s;
   padding-bottom: 300px;
}

.parent{
    background-color: white;
    width: 250px;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
    
}

.children ul li{
    margin-top:130px;
    /* background-color: red; */

}

.children .head{
   background-color: white;
    width: 150px;
    height:80px;
    overflow: hidden;
}


i{
    cursor:default;
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
