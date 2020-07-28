<template>
  <div id="" >
    <blockquote class="layui-elem-quote">Welcome! {{user.userName}}</blockquote>
      <!-- {{user}} -->

      <table class="layui-table">
  <colgroup>
    <col width="150">
    <col width="200">
    <col>
  </colgroup>
  <thead>
    <tr>
      <th>用户id</th>
      <th>用户名</th>
      <th>邮箱</th>
      <th>照片</th>
      <th>注册ip</th>
      <th>生日</th>
      <th>年岁</th>
      <th>手机号</th>
      <th>加入时间</th>
    </tr> 
  </thead>
  <tbody>
    <tr>
      <td>{{user.userId|field}}</td>
      <td>{{user.userName|field}}</td>
      <td>{{user.userEmail|field}}</td>
      <td>{{user.userProfilePhoto|field}}</td>
      <td>{{user.userIp|field}}</td>
      <td>{{user.userBirthday|field}}</td>
      <td>{{user.userAge|field}}</td>
      <td>{{user.userTelephoneNumber|field}}</td>
      <td>{{user.userRegistrationTime|field}}</td>
    </tr>
  </tbody>
</table>
      <br><br>
       <blockquote class="layui-elem-quote">S T A F F</blockquote>
        <br>
       <table class="layui-table container col-12 col-md-7" style="">
                            <colgroup>
                                <col width="60">
                                <col width="100">
                                 <col width="20">
                                  <col width="200">
                                   <col width="200">
                                   <col width="300">
                                <col>
                            </colgroup>
    
                            <tbody>
                                <tr class="active"> 
                                      <td>原作</td> <td>GXT  Dev Team(郭哲 靳泽坤 谭洋波)</td>
                                </tr>
                                <tr > 
                                      <td>内容运营</td> <td>谭洋波 郭哲 靳泽坤</td>
                                </tr>
                                <tr class=""> 
                                      <td>本程序的参与人员列表</td> <td> 郭哲 靳泽坤 谭洋波</td>
                                </tr>
                                <tr class="active"> 
                                      <td>监督</td> <td> 郭哲</td>
                                </tr>
                                <tr > 
                                      <td>作画</td> <td>谭洋波</td>
                                </tr>
                                <tr class="active"> 
                                      <td>特效</td> <td>靳泽坤</td>
                                </tr>
                                <tr class=""> 
                                      <td>出演</td> <td>CGB2002</td>
                                </tr>
                                <tr class="active"> 
                                      <td>鸣谢</td> <td> 吴老师 张老师 赵老师</td>
                                </tr>
                                 
                                <tr > 
                                      <td>现阶段维护</td> <td>谭洋波</td>
                                </tr>
                            </tbody>
        </table>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {

    }
  },
    computed:{
        user:{
            get(){
                return this.$store.state.user;
            }
        }
    },
  filters:{
    field(val){
       if(val==null||val==''){
         return '暂无';
       }else{
         return val;
       }
    }
  }
}
</script>

<style scoped>

</style>
