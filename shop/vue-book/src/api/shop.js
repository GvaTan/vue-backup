import axios from 'axios'
axios.defaults.baseURL = '/api';


let getReleaseShops=(data)=>{
    return axios.get('shop/queryShopsRelease.action?start='+data.start+"&size="+data.size);
}

let getHotShops=(uid,start,size)=>{
  return axios.get('shop/queryHotShops.action?start='+start+"&size="+size+"&uid="+uid);
}

let getDisabledShop=(sid)=>{
  return axios.get('shop/queryDisabledShop.action?sid='+sid);
}
let getSimilarShops=(key,tags,start,size)=>{
  return axios.get('shop/querySimilarShops.action?key='+key+"&tags="+tags+"&start="+start+"&size="+size);
}


let createOrder=(sid,payType,pay)=>{

  let data = new FormData();
   data.append('sid',sid);
   data.append('payType',payType);
   data.append('pay',pay);
  return axios.post('shop/orderCreate.action',data);
}



//获取订单
let getOrdersBuy=(start,size)=>{
  return axios.get('user/order/buy.action'+"?start="+start+"&size="+size);
}

let getOrdersSell=(start,size)=>{
  return axios.get('user/order/sell.action'+"?start="+start+"&size="+size);
}



//增加商品浏览次数
let getAddView=(sid)=>{
  return axios.get('shop/addView.action'+"?sid="+sid);
}

//增加商品下载次数
let getAddDownload=(sid)=>{
  return axios.get('shop/addDownload.action'+"?sid="+sid);
}

//删除商品
let getDeleteShop=(sid)=>{
  return axios.get('user/shop/delete.action'+"?sid="+sid);
}

// 查找商品
let getShopAllField=(sid)=>{
  return axios.get('shop/queryShop.action'+"?sid="+sid);
}

// // 修改商品
// let updateShop=(sid)=>{
//   return axios.get('shop/update.action'+"?sid="+sid);
// }
export {getShopAllField,getReleaseShops,getHotShops,getDisabledShop,getSimilarShops,createOrder,getOrdersBuy,getOrdersSell, getAddView,getAddDownload,getDeleteShop}
