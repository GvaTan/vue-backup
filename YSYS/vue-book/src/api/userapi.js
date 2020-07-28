import axios from 'axios'
axios.defaults.baseURL = '/api';
let getSession=()=>{
  return axios.get("api_getSession");
}
let login=(usermail,userpassword)=>{

  return axios.get("user_login2?usermail="+usermail+"&password="+userpassword);
}


//获得商品
let getShops=(keyword,payType,classifyId,classifyA)=>{

  return axios.get("shop_getShops?keyword="+keyword+"&payType="+payType+"&classifyId="+classifyId+"&classifyA="+classifyA);
}


//获得私有商品
let getPrivateShops=()=>{
  return axios.get("shop_privateWallpaper");
}



let saveUser=(user)=>{
  console.log(user.name+"========================================");
  var params = new URLSearchParams();
  params.append('web',JSON.stringify( user.web));
  return axios.post("user_saveWeb",params);
}


//保存

export {getSession,login,getShops,getPrivateShops,saveUser}
