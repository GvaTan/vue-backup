import axios from 'axios'


axios.defaults.baseURL = '/api';
let addComment=(dataz)=>{
  return axios.post("/commentAdd",dataz,{
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


let addReplay=(dataz)=>{
  return axios.post("/replayAdd",dataz,{
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

let queryReplays=(id)=>{
  return axios.get("/replayQueryByCommentId?commentId="+id);
}
let queryComments=(id)=>{
  return axios.get("/commentQueryByShopId?shopId="+id);
}
export {addComment,queryComments,addReplay,queryReplays}
