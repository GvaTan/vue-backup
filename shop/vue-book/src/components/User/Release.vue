<template>
  <div class="right">
    <div class="panel center-block">
      <h3>我发布的商品</h3>
      <hr class="layui-bg-gray">
      <div>
        <table class="layui-table">
          <colgroup>
            <col width="150">
            <col width="220">
            <col>
          </colgroup>
          <thead>
          <tr>

            <th>资源名</th>
            <th>预览图</th>
            <th>标签</th>
            <th>发布地址</th>
            <th>下载地址</th>
            <th>下载密码 </th>
             <th>定价</th>
            <th>点击量</th>
            <th>下载量</th>
            <th>修改时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in layuiShops.shops">

            <td>{{item.name}}</td>
            <td style="padding: 0px;margin: 0px;"><img :src="'http://anets.top/'+item.preview" style="max-width:220px !important;height:150px" alt=""></td>
            <td>{{item.tags}}</td>
            <td><a :href="'http://shop.anets.top/list/'+item.sid+'.html'" target="_blank">http://shop.anets.top/list/{{item.sid}}.html</a></td>
            <td v-if="item.shopFid">
              <a v-if="item.adresss.substring(0,4)!='http'" :href="'http://pan.anets.top/share/'+item.adresss" target="_blank">http://pan.anets.top/share/{{item.adresss}}</a>
              <a target="_blank" v-if="item.adresss.substring(0,4)=='http'" :href="item.adresss">{{item.adresss}}</a>
              </td>
            
            <td v-if="!item.shopFid"><a :href="item.adresss" target="_blank">{{item.adresss}}</a></td>
            <td>{{item.password}}</td>
            <td>Acoin:{{item.acoin}}|coin:{{item.coin}}</td>
            <td>{{item.views}}</td>
            <td>{{item.downloads}}</td>
            <td>{{item.updatetime}}</td>
             <th>

              <router-link tag="a" :to="'/user/update?sid='+item.sid">
                 <button type="button" class="layui-btn layui-btn-sm">
    <i class="layui-icon">&#xe642;</i>
  </button>
              </router-link>
               <button type="button" @click="remove(item.sid)" class="layui-btn layui-btn-sm">
    <i class="layui-icon">&#xe640;</i>
  </button>
     
  
  </th>
          </tr>
          </tbody>
        </table>
        <div id="test1"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import  {getReleaseShops,getDeleteShop} from "../../api/shop";

  export default {
        name: "Release",
    data(){
          return {

            condition:{
              start:1,
              size:4
            },
            layuiShops:{
              count:null,
              limit:null,
              shops:null
            }



          }
    },
    created() {

    },
    mounted(){

      this.gainReleaseShops();
    },
    watch:{
      condition:{
        handler(newVal,oldVal){
            
               this.gainNewReleaseShops();
           
        },deep:true,immediate:false
      }
    },
    methods:{
      async gainNewReleaseShops(){
        let  {data:res}=await getReleaseShops(this.condition);
        console.log(res.data);
        this.layuiShops.shops=res.data.shops;
      },
          async gainReleaseShops(){

             let  {data:res}=await getReleaseShops(this.condition);
             console.log(res.data);

             this.layuiShops.count=res.data.count;
             this.layuiShops.shops=res.data.shops;
             this.layuiShops.limit=res.data.limit;
             this.initPageHelp();
          },
          initPageHelp(){
            layui.use('laypage', ()=>{
              var laypage = layui.laypage;

              //执行一个laypage实例
              laypage.render({
                elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,count: this.layuiShops.count //数据总数，从服务端得到
                ,limit:this.layuiShops.limit
                ,jump: (obj, first)=>{
                  //obj包含了当前分页的所有参数，比如：
                  console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                  console.log(obj.limit); //得到每页显示的条数
                   this.condition.start=obj.curr;
                   this.condition.size=obj.limit;
                  //首次不执行
                  if(!first){
                    //do something
                  }
                }
              });
            });
          },
          async remove(sid){
            let result=window.confirm("确定删除么？删除不可以恢复，或者你可以选择修改！")
            if(result){
              this.$layer.msg("正在删除...");
            let {data:res}=await getDeleteShop(sid);
            this.$layer.msg(res.msg);
            this.gainReleaseShops();
            }else{
              this.$layer.msg("用户取消");
            }
          }
    }

  }
</script>

<style scoped>
  .right{
    padding-top: 20px;
  }

  .right .panel{
    width:100%;
    padding: 20px 20px 20px 10px;
    margin: auto;
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.07);
    margin-top: 20px;
  }


  h3{
    border-left: 5px solid #ee1289;
    padding-left: 10px;
    font-size: 16px;
  }
</style>
