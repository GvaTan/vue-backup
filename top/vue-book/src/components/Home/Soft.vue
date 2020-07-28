<template>
    <div>
      <Search @setKeyword="setKeyword"></Search>
      <Navigation></Navigation>
      <Classify :datas="classify" :show="show" @changeKetz="changeKetz"></Classify>
      <div class="content">
           <ul>
             <li v-for="(item,index) in shops">
               <router-link :to="{name:'toSoft',query:{id:item.id}}">
                 <div :style="'width:300px;height:185px;background: url('+'\'http://localhost:8181/upload/soft/thumbnail/s'+item.address+'\');background-size:cover'"
                 ></div>
               </router-link>
               <router-link :to="{name:'toSoft',query:{id:item.id}}">
                {{item.title}}
               </router-link>
             </li>

           </ul>
      </div>
      <div v-if="state"><img src="http://img03.taobaocdn.com:80/tfscom/TB1.bpFhQL0gK0jSZFxXXXWHVXa" alt="">正在查询...</div>
      <PageBean :data="page" @toPage="toPage"></PageBean>
    </div>
</template>

<script>
  import  Classify from "./Classify"
  import  PageBean from "./PageBean"
  import  Search from "./Search"
  import  Navigation from './Navigation'
  import  {shopQuery,treeQuerySoft} from "../../api/Shop";
  export default {
    components:{Classify,PageBean,Search,Navigation},
  name: "Soft",
  data(){
   return {
     shops:[],
     classify:[],
     show:false,
     state:false,
     page:{show:false,currentPage:1,pageSize:0,pageCount:0,records:0},
     query:{currentPage:1,keyword:"",keyz:""},
    }
   },created() {
           this.tree();
           this.queryAll("","soft","");
    },
    watch:{
      query:{
        handler(newval,oldval){
          // alert(newval.keyz);
          this.queryAll(newval.keyword,newval.keyz,newval.currentPage)
        },deep:true
      }
    },methods:{
      async queryAll(keyword,keyz,currentPage){
        this.state=true;
        let {data}=await shopQuery(keyword,keyz,currentPage);
        // console.log(data);
        this.changeData(data);
        this.state=false;
      },
      async tree(){
        let {data}=await  treeQuerySoft();
        this.xunhuan(data);
      },
      xunhuan(data){
        // console.log(data);
        // console.log();

            let obj={name:'分类',children: []};
            for(var j=0;j<data[0].children.length;j++){
              let son={name:'',keyz:''};
              son.name=data[0].children[j].name;
              son.keyz=data[0].children[j].keyz;
              obj.children.push(son);
            }
            this.classify.push(obj);

            this.show=true;


      },
      changeData(data){
        this.shops=[];
        this.shops=data.list;
        this.page.currentPage=data.currentPage;
        this.page.pageCount=data.pageCount;
        this.page.pageSize=data.pageSize;
        this.page.records=data.records;
        this.page.show=true;
      },
      changeKetz(keyz){
        this.query.keyword="";
        this.query.keyz=keyz;
      },
      toPage(index){
        this.query.currentPage=index;
      },
    setKeyword(keyword){
      this.query.keyword=keyword;
    }


  }
  }
</script>

<style scoped>
.content{
  width:1530px;
  margin:auto;
}
.content ul{
  /*width:1530px;*/
  margin-top: 15px;
  /*background-color: crimson;*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -7px;
  /*background-color: crimson;*/
}
.content ul li img{

}
.content ul li{
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 215px;
  margin-left: 7px;
  /*background-color: crimson;*/
}


.content ul li a{
   font-size: 15px;
  margin-top: 5px;
}
</style>
