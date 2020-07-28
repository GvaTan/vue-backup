<template>
    <div>
      <Search @setKeyword="setKeyword"></Search>
      <Navigation></Navigation>
      <Classify :datas="classify" :show="show" @changeKetz="changeKetz"></Classify>

      <div class="content">
          <ul>
            <li v-for="(item,index) in shops">
              <router-link :to="{name:'toWallpaper',query:{id:item.id}}">
                <div :style="'width:300px;height:185px;background: url('+'\'http://localhost:8181/upload/wallpaper/thumbnail/s'+item.address+'\');background-size:cover'"
                ></div>
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
  import  {shopQuery,treeQuery} from "../../api/Shop";


  export default {
        components:{Search,Navigation,Classify,PageBean},
        name: "Wallpaper",
      data(){
          return {
             shops:[],
             classify:[],
            show:false,
            page:{show:false,currentPage:1,pageSize:0,pageCount:0,records:0},
            query:{currentPage:1,keyword:"",keyz:""},
            state:false
          }
      },created() {
          this.tree();
          this.queryAll("","wallpaper","");
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
      changeData(data){
        this.shops=[];
        this.shops=data.list;
        this.page.currentPage=data.currentPage;
        this.page.pageCount=data.pageCount;
        this.page.pageSize=data.pageSize;
        this.page.records=data.records;
        this.page.show=true;
      },
      async tree(){
        let {data}=await  treeQuery();
        this.xunhuan(data);
      },
      xunhuan(data){
        // console.log(data);
        // console.log();
        for(var i=0;i<data[0].children.length;i++){
          if(data[0].children[i].id==4){
            let obj={name:'',children: []};
            obj.name=data[0].children[i].name;
            for(var j=0;j<data[0].children[i].children.length;j++){
              let son={name:'',keyz:''};
              son.name=data[0].children[i].children[j].name;
              son.keyz=data[0].children[i].children[j].keyz;
              obj.children.push(son);
            }
            this.classify.push(obj);

          }else{

            let obj={name:'',children: []};
            obj.name=data[0].children[i].name;
            for(var j=0;j<data[0].children[i].children.length;j++){
              let son={name:'',keyz:''};
              son.name=data[0].children[i].children[j].name;
              son.keyz=data[0].children[i].children[j].keyz;
              obj.children.push(son);
            }
            this.classify.push(obj);

          }
        }
        this.show=true;
      },
      toPage(index){
        this.query.currentPage=index;
      },
      changeKetz(keyz){
        this.query.keyword="";
        this.query.keyz=keyz;
      },
      setKeyword(keyword){
        this.query.keyword=keyword;
      }
    }
  }
</script>

<style scoped>
  .content{

    width: 1530px;
    margin: auto;
    margin-top: 10px;
  }
.content ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -7px;
}

.content ul li{
  width: 300px;
  height: 185px;
  /*background-color: crimson;*/
  margin-left: 7px;
  margin-top: 10px;
}
</style>
