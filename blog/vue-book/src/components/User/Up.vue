<template>
  <div class="right" style="margin-top:-50px">
    <div class="panel center-block">
      <h3>发布文章</h3>
      <hr class="layui-bg-gray">
      <div>
        <form class="layui-form" action="">
          <div class="layui-form-item">
            <label class="layui-form-label" >标题</label>
            <div class="layui-input-block">
              <input type="text" name="articleTitle" required v-model="inputs.articleTitle"   lay-verify="required" placeholder="请输入文章标题" autocomplete="off" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">描述</label>
            <div class="layui-input-block">
              <input type="text" name="discription" required  v-model="inputs.discription"  lay-verify="required" placeholder="请输入文章的简单描述" autocomplete="off" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">标签</label>
            <div class="layui-input-block">
              <input type="text" name="tags" required  v-model="inputs.tags" lay-verify="required" placeholder="每个标签用空格或者逗号隔开" autocomplete="off" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">文章类型</label>
            <div class="layui-input-block">
<!--              <select name="city" lay-verify="required">-->
<!--                <option value=""></option>-->
<!--                <option value="0">软件</option>-->
<!--                <option value="1">壁纸</option>-->
<!--              </select>-->
              <div id="test12" class="demo-tree-more" disabled></div>
              <span v-if="!classify">正在查询文章分类...</span>
              <span v-if="classify" style="margin-left: 0px;line-height: 50px">当前选择：<b>{{checkedClassifyName}}</b></span>
              <input v-if="checkedClassifyId" name="sort" type="hidden" v-model="checkedClassifyId">
            </div>
          </div>


          <!-- <div class="layui-form-item">
            <label class="layui-form-label" >资源是否有链接</label>
            <div class="layui-input-block" @click="changeIsLink()">
              <input type="radio"  value="1" name="isLink"  title="是"   checked >
              <input type="radio"  value="0"   name="isLink" title="否"   >

            </div>
          </div> -->
          <div class="layui-form-item" style="position: relative" v-show="isLink==0">
            <label class="layui-form-label">上传资源文件</label>
            <div class="layui-input-block">
              <button type="button" class="layui-btn" id="file">
                <i class="layui-icon">&#xe67c;</i>上传文章（壁纸）文件并生成提取密码(注意：文件不能太大，否则出错，若文件很大，请上传到百度云，再选择是)
              </button>
            </div>

          </div>
          <div style="margin-left:400px;margin-top:-38px;line-height:40px;top:0px"> <span v-if="file.tip.show">{{file.tip.msg}}</span>
            <div v-if="file.address">文件地址：<a  :href="'http://pan.anets.top/share/'+file.address" target="_blank">http://pan.anets.top/share/{{file.address}}</a>
              <br>
              提取密码：{{file.password}}
            </div>
            <input v-if="file.address"  type="hidden" name="adresss" style="float: right"  v-model="file.address">
            <input v-if="file.password"  type="hidden" name="password" style="float: right"  v-model="file.password">
            <input v-if="file.fid"  type="hidden" name="shopFid" style="float: right" v-model="file.fid">
          </div>
          <!-- <div class="layui-form-item" v-if="isLink==1">
            <label class="layui-form-label">资源链接地址</label>
            <div class="layui-input-block">
              <input type="text" name="adresss" required v-model="inputs.adresss"  lay-verify="required" placeholder="如果是壁纸，请选择否并上传" autocomplete="off" class="layui-input">
            </div>
          </div>

          <div class="layui-form-item" v-if="isLink==1">
            <label class="layui-form-label">资源提取密码</label>
            <div class="layui-input-block">
              <input type="text" name="password" required v-model="inputs.password"  lay-verify="required" placeholder="请输入资源提取密码" autocomplete="off" class="layui-input">
            </div>
          </div> -->
          <div class="layui-form-item" style="position: relative;margin-top:60px">
            <label class="layui-form-label">预览图上传</label>
            <div class="layui-input-block">
              <button type="button" class="layui-btn" id="image">
                <i class="layui-icon">&#xe67c;</i>上传图片
              </button>
            </div>
            <div style="margin-left:300px;margin-top:-38px;line-height:40px;top:0px"> <span v-if="image.tip.show">{{image.tip.msg}}</span>
              <img v-if="image.path" :src="'http://anets.top/'+image.path" alt="">

              <input v-if="image.path"  type="hidden" name="articleImg" style="float: right"  v-model="image.path">
              <!-- <input v-if="image.fid"  type="hidden" name="previewFid" style="float: right" v-model="image.fid"> -->
            </div>

          </div>
          <!-- <div class="layui-form-item">
            <label class="layui-form-label">是否免费</label>
            <div class="layui-input-block" @click="isFree()">
              <input type="checkbox" name="isfree" :value="isFreez" lay-skin="switch" >
            </div>
          </div> -->
          <!-- <div class="layui-form-item" v-if="isFreez==0">
            <label class="layui-form-label">定价</label>
            <div class="layui-input-inline">
              <input type="number" name="acoin" required v-model="inputs.acoin" lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">(积分)</div>
            <div class="layui-input-inline">
              <input type="number" name="coin" required v-model="inputs.coin" lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">(¥)</div>
          </div> -->
          <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">详情描述</label>
            <div class="layui-input-block">
              <iframe id="myiframe" src="/static/editor/editor.html" width="100%" height="500" frameborder="0">
              </iframe>
              <!-- <button @click="getContent()">ssss</button> -->
              <!-- <textarea name="detail" v-model="inputs.detail" placeholder="请输入资源详情描述" class="layui-textarea"></textarea> -->
            </div>
          </div>
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button v-if="submiting" class="layui-btn layui-btn-disabled"  lay-filter="formDemo">提交中...</button>
              <button v-if="!submiting" class="layui-btn"  lay-submit lay-filter="formDemo">立即提交</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {addSort,updateSort,deleteSort} from "../../api/index"
    export default {
        name: "Up",
        components:{},
      data(){
        return {
          image:{
            fid:null,
            path:null,
            tip:{
              show:false,
              msg:"uploading...,please wait!!(请稍后，正在上传...)"
            }
          },
          file:{
            fid:null,
            address:null,
            password:null,
            tip:{
              show:false,
              msg:"uploading...,please wait!!(请稍后，正在上传...)"
            }
          },
          isLink:1,
          isFreez:0,
          classify:null,
          checkedClassifyId:null,
          checkedClassifyName:"未选",
          inputs:{
            sort:null,
            articleTitle:null,
            tags:null,
            articleImg:null,
            previewFid:null,
            discription:null,
            isquality:0,
            isfree:0,
            acoin:0,
            coin:0,
            shopFid:null,
            adresss:null,
            password:null,
            articleContent:null,
            views:0,
            downloads:0,
            state:1
            
          },
          submiting:false,
        }
      },
      created() {
        // this.$forceUpdate();
        //Demo
        this.initLayui();
        this.gainClassify();



      },
      mounted(){

      },
      watch:{
        classify:{
            handler(newVal,oldVal){
              console.log("newval",newVal);
              if(newVal){
                console.log("初始化-ztree");
                this.initTree();
              }
            },deep:true,immediate:false
          }
      },
      methods:{
        getContent(){
          this.inputs.articleContent=$("#myiframe").contents().find(".note-editable").html();
        },
        gainClassify(){
          $.ajax({
            type:"GET",
            url:"/api/sort/all",
            dataType:"json",
            success:(data)=>{
              var all=[];
              all.push(data.data);
              this.classify=all;
              console.log(this.classify);
            },
            error:function(jqXHR){
              console.log("Error: "+jqXHR.status);
            }
          });
        },
        isFree(){
          // alert($('input[name=isfree]').val());
          this.isFreez=$(".layui-form-onswitch").length;
          this.inputs.isfree=$(".layui-form-onswitch").length;
        },
        //判断是否有链接
        changeIsLink(){
          console.log("改变值",$('input[name=isLink]:checked').val());
          this.isLink=$('input[name=isLink]:checked').val();
        },
          initLayui(){
            this.$nextTick(
              ()=>{
                layui.use('form',()=>{
                 
                  var form = layui.form;
                  form.render();//进行渲染
                  //监听提交
                  form.on('submit(formDemo)', (data)=>{
                    
                    this.inputs.sort=this.checkedClassifyId;
                    this.inputs.articleImg=this.image.path;
                    this.inputs.previewFid=this.image.fid;
                    if(this.isLink==0){
                      this.inputs.shopFid=this.file.fid;
                      this.inputs.adresss=this.file.address;
                      this.inputs.password=this.file.password;

                      if(!this.inputs.shopFid){
                        layer.msg("请上传你的商品或者填写链接");
                        return false;
                      }
                    }
                    if(!this.inputs.sort){
                      layer.msg("请选择分类");
                      return false;
                    }

                    if(!this.inputs.previewFid){
                      layer.msg("请上传预览图");
                      return false;
                    }

                    this.getContent();
                    //提交表单表
                    this.submiting=true;
                    $.ajax({
                      url:"/api/article/add",
                      type:"post",
                      dataType:"json",
                      data:this.inputs,
                      success:(data)=>{
                        console.log(data);
                        if(data.success){
                          console.log("成功，跳转页面");
                          this.$router.push({path:'/user/release'});

                        }else{
                          layer.msg(data.msg);
                          this.submiting=false;
                        }

                      },
                      error:()=>{
                        console.log("错误");
                        this.submiting=false;
                        return false;
                      }
                    });
                    layer.msg("uploading...，Please wait...");

                    return false;
                  });
                });
                //图片上传
                layui.use('upload', ()=>{
                  var upload = layui.upload;

                  //执行实例
                  var uploadInst = upload.render({
                    elem: '#image' //绑定元素
                    ,field:"image"
                    ,url: 'http://anets.top:8082/url/upImg.action?width=170&height=100' //上传接口
                    ,done:(res)=>{
                      //上传完毕回调
                      this.image.tip.show=false;
                      console.log(res.data);
                      this.image.fid=res.data.fid;
                      this.image.path=res.data.path;
                    }
                    ,error: ()=>{
                      //请求异常回调
                      console.log("上传错误");
                      this.image.tip.msg="上传发生异常";
                    },
                    choose:()=>{
                      this.image.tip.msg="uploading...,please wait!!(请稍后，正在上传...)";
                      console.log("uploading");
                      this.image.tip.show=true;
                    }
                  });

                  //执行实例
                  var uploadFile = upload.render({
                    elem: '#file' //绑定元素
                    ,field:"file"
                    ,url: '/api/shop/upShopFile.action' //上传接口
                    ,done:(res)=>{
                      //上传完毕回调
                      this.file.tip.show=false;
                      console.log(res.data);
                      this.file.fid=res.data.fid;
                      this.file.address=res.data.address;
                      this.file.password=res.data.password;
                    }
                    ,error: ()=>{
                      //请求异常回调
                      console.log("上传错误");
                      this.file.tip.msg="上传发生异常";
                    },
                    choose:()=>{
                      this.file.tip.msg="uploading...,please wait!!(请稍后，正在上传...)";
                      console.log("uploading");
                      this.file.tip.show=true;
                    }
                  });
                });
              }
            );
          },
        initTree(){
          layui.use(['tree'], ()=>{
            var tree = layui.tree
            ,layer = layui.layer

            //基本演示
            tree.render({
              elem: '#test12'
              ,data: this.classify
              ,showCheckbox: true  //是否显示复选框
              ,id: 'demoId1'
              ,edit: ['add', 'update', 'del']
              ,isJump: true //是否允许点击节点时弹出新窗口跳转
              ,click: (obj)=>{
                var data = obj.data;  //获取当前点击的节点数据
                console.log();
                //layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
                layer.msg('请勾选一个分类');
              },
              oncheck: (obj)=>{
                // console.log(obj.data); //得到当前点击的节点数据
                // console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
                // console.log(obj.elem); //得到当前节点元素
                // console.log(obj.data.id);
                // console.log(obj.data.children.length);
                if(obj.data.title=="所有"){
                 layer.msg("不能勾选 所有");
                 return;
                }
                if(obj.checked){
                  this.checkedClassifyId=obj.data.id;
                  this.checkedClassifyName=obj.data.title;
                }
              }
              ,operate: async (obj)=>{
                  var type = obj.type; //得到操作类型：add、edit、del
                  var data = obj.data; //得到当前节点的数据
                  var elem = obj.elem; //得到当前节点元素
                  
                  //Ajax 操作
                  var id = data.id; //得到节点索引
                  if(type === 'add'){ //增加节点
                    //返回 key 值
                    
                    var sort={sortName:"未命名",parentSortId:id};
                    // let {data:res}=await addSort(sort);
                    let idz=null;
                    $.ajax({
                            type:"post",
                            url:"/api/sort/add",
                            dataType:"json",
                            async:false,
                            data:sort,
                            success:(res)=>{
                              console.log("success");
                              console.log(res);
                              layer.msg(res.msg);
                              idz=res.data;
                              this.gainClassify();
                            },
                            error:(res)=>{
                               alert("未知错误");
                               this.gainClassify();
                            }
                        })


                        this.gainClassify();
                        // alert(parseInt(idz));
                    // return 0;
                  } else if(type === 'update'){ //修改节点
                     var sort={sortName:elem.find('.layui-tree-txt').html(),sortId:id};
                     $.ajax({
                            type:"post",
                            url:"/api/sort/update",
                            dataType:"json",
                            data:sort,
                            success:(res)=>{
                              console.log("success");
                              console.log(res);
                              layer.msg(res.msg);
                              this.gainClassify();
                            },
                            error:(res)=>{
                                console.log("failed");
                                console.log(res);
                               layer.msg(res.msg);
                               this.gainClassify();
                            }
                        })
                     this.gainClassify();
                    // console.log(elem.find('.layui-tree-txt').html()); //得到修改后的内容
                  } else if(type === 'del'){ //删除节点
                      let {data:res}=await deleteSort(id);
                      layer.msg(res.msg);
                      this.gainClassify();
                  };
                }

            });
          })

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
