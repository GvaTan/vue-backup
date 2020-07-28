<template>
    <div id="classify"  v-if="show">
        <div class="content" style="width: 1530px">
              <div v-for="(item,index) in datas">
                <span>{{item.name}}：</span><ul>
                <li v-if="index==0" @click="change('',0,0)">所有</li>
                <li :class="{bg:item1.keyz==keyzs}" @click="change(item1.keyz,index,index1)"  v-for="(item1,index1) in item.children" :id="item1.keyz">{{item1.name}}</li>
              </ul>
              </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Classify",
      props:["datas","show"],
      data(){
          return {
            keyzs:''
          }
      },
      methods:{
        change(keyz,index,index1){
              // console.log();
          if(keyz==''){
            keyz=this.$route.path.substring(1)
          }
             this.$emit("changeKetz",keyz);
             this.keyzs=keyz;
        }
      }
    }
</script>

<style scoped>

  
#classify{
  width: 100%;
  padding-bottom: 10px;
  background-color: rgba(35,37,38,1);
  margin-top: 20px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.7);
}

#classify .content{
  /*height: 100px;*/
  /*background-color: crimson;*/
  display: flex;
  flex-direction: column;
  margin: auto;
}
#classify .content div{
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
#classify .content ul{
  display: flex;
  margin: 0px;
  padding: 0px;
  flex-direction: row;

}

#classify .content ul li{
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  cursor: default;
}

.bg{

  color: rgba(255,255,255,1);
  background-color: rgba(244,90,141,1);
  /*border: 1px solid rgba(244,90,141,1);*/
  border-radius: 5px;
  padding: 0px 5px;
}
</style>
