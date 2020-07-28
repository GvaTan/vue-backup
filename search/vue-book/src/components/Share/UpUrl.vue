<template>
  <div id="upUrl" class="container col-12 col-sm-12 col-md-10 col-lg-7">
      <h2>分享你的链接到首页</h2>
      <!-- <hr class="layui-bg-gray"> -->

      <div class="container mt-4 pt-4 col-12 col-lg-7" >
          <form οnsubmit="return false;" class="layui-form" action="">
            <div class="layui-form-item">
                <label class="layui-form-label">网站名</label>
                <div class="layui-input-block">
                <input type="text" name="name" required  lay-verify="required" placeholder="请输入网站名" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">网站地址</label>
                <div class="layui-input-block">
                <input type="text" name="url" required  lay-verify="required" placeholder="务必http或者https开头,比如http://anets.top" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">所属分类</label>
                <div class="layui-input-block">
                 <div id="test12" class="demo-tree-more" style="color:white !important">
                    
                 </div>
                  <span style="margin-top:150px;margin-left:50%">当前所选：<b style="color:#ee1289">{{check.name}}</b></span>
                  <br>
                  <p style="color:#777">提示：分类请选择到最里层的分类，以便正常显示</p>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">图标(Logo)</label>
                <div class="layui-input-block">
                      <button type="button" v-if="!uploading" class="layui-btn" id="test1">
                        <i class="layui-icon">&#xe67c;</i>上传图片
                        </button>
                        <button class="layui-btn layui-btn-disabled" v-if="uploading"> 上传中，请稍后...</button>
                        <br>
                        <p style="color:#777">提示：为了保证体验，图片最少要求宽高>=64px,图片logo可以百度图片去搜</p>
                        <div style="margin-top：10px" v-if="image.img">
                            <img :src="'http://anets.top/'+image.img" alt="">
                        </div>
                </div>
            </div>
             <input type="hidden" name="uid" v-model="uid">
             <input type="hidden" name="parent" v-model="check.wid">
             <input type="hidden" name="isprivate" value="0">
              <input type="hidden" name="views" value="0">
               <input type="hidden" name="state" value="1">
                <input type="hidden" name="likes" value="0">
            <input type="hidden" name="isparent" value="0">
           <input type="hidden" name="img" v-model="image.img">
           <input type="hidden" name="imgfid" v-model="image.imgfid">
            <div class="layui-form-item">
                <label class="layui-form-label">网站标签</label>
                <div class="layui-input-block">
                <input type="text" name="tags" required  lay-verify="required" placeholder="多个标签逗号隔开，比如v.qq.com的标签： 视频 影音" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">描述</label>
                <div class="layui-input-block">
                <textarea name="discription" placeholder="请输入简短描述，网站是干什么的" class="layui-textarea"></textarea>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                </div>
            </div>
            </form>
      </div>
  </div>
</template>

<script>
import {getTree} from '../../api/index'
export default {
  name: 'upUrl',
  data(){
      return {
          trees:null,
          check:{
              name:"未选",
              wid:null
          },
          image:{
              imgfid:null,
              img:null
          },
          uid:null,
          uploading:false
      }
  },
    computed:{
        user:{
            get(){
              return this.$store.state.user;
            }
        }
    },
  created(){
     this.initTree()
  },
  mounted(){
     this.initForm()
     this.initUpFile()
  },
  methods:{
      initForm(){
          layui.use('form', ()=>{
            var form = layui.form;
            
            //监听提交
            form.on('submit(formDemo)', (data)=>{
               
                // layer.msg(JSON.stringify(data.field));
                if(!this.check.wid){
                    layer.msg("请勾选一个具体分类");
                    return false;
                }else{
                    if(this.$store.state.user){
                      this.uid=this.$store.state.user.id;
                    }
                    this.uploading=true;
                    // 提交
                        $.ajax({
                            type:"post",
                            url:"/api/url/add.action",
                            dataType:"json",
                            data:data.field,
                            success:(res)=>{
                              console.log("success");
                              alert("分享成功");
                              window.location.reload();
                              console.log(res);
                               this.uploading=false;
                               
                            },
                            error:(res)=>{
                                console.log("failed");
                                console.log(res);
                                 alert("分享失败"+res.msg);
                                  this.uploading=false;
                            }
                        })
                     return false;
                }

            });
          });
      },
      initUpFile(){
          layui.use('upload', ()=>{
            var upload = layui.upload;
            
            //执行实例
            var uploadInst = upload.render({
                elem: '#test1' //绑定元素
                ,field:"image"
                ,url: '/api/url/upImg.action' //上传接口
                ,done: (res)=>{
                    console.log("成功");
                   console.log(res);
                   this.image.imgfid=res.data.fid;
                   this.image.img=res.data.path;
                }
                ,error: function(res){
                     console.log("失败");
                  console.log(res);
                }
            });
            });
      },
      async initTree(){
         let {data:res} = await getTree();
         console.log(res);
         if(res.success){
             this.trees=res.data;
                   // 初始化树
                layui.use(['tree', 'util'], ()=>{
                var tree = layui.tree
                ,layer = layui.layer
                ,util = layui.util
                //基本演示
                tree.render({
                    elem: '#test12'
                    ,data: this.trees
                    ,showCheckbox: true  //是否显示复选框
                    ,id: 'demoId1'
                    ,isJump: true //是否允许点击节点时弹出新窗口跳转
                    ,click: (obj)=>{
                    var data = obj.data;  //获取当前点击的节点数据
                    layer.msg('不要点我，点框框');
                    },oncheck:(obj)=>{
                    if(obj.checked&&obj.data.children==null){
                       this.check.name=obj.data.title;
                       this.check.wid=obj.data.id;
                       layer.msg('勾选正确');
                    }else{
                         layer.msg('（勾选错误）请勾选最里层的具体分类');
                    }
                    console.log(obj.data); //得到当前点击的节点数据
                    console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
                    console.log(obj.elem); //得到当前节点元素
                    }
                });


                })
         }else{
             this.$layer.msg(res.msg)
         }
      }
  }
}
</script>

<style scoped>
#upUrl{
    background-color: rgba(0, 0, 0, 0.9);
   border-top-right-radius: 10px;
    border-top-left-radius: 10px;
   margin-top: 10vh;
   height: 100vh;
   color:white;
   padding: 10px 10px;
   overflow: auto;
   
}

h2{
    border-left: 5px solid #ee1289;
    /* text-align: center; */
    font-size: 20px;
    padding-left: 10px;
}
</style>
