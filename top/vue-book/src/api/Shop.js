import axios from 'axios'


axios.defaults.baseURL = '/api';

let treeQuery=()=>{
  return axios.get("/treeQueryByKeyz?keyz=wallpaper")
}
let treeQuerySoft=()=>{
  return axios.get("/treeQueryByKeyz?keyz=soft")
}

let shopQuery=(keyword,keyz,currentPage)=>{
  return axios.get("/shopQuery?keyword="+keyword+"&keyz="+keyz+"&currentPage="+currentPage);
}


let shopQueryById=(id)=>{
  return axios.get("/shopQueryById?id="+id);
}
export {treeQuery,shopQuery,shopQueryById,treeQuerySoft}
