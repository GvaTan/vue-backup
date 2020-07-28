import axios from 'axios'
axios.defaults.baseURL = '/api';
let getConfig=()=>{
  return axios.get('api_getVxConfig');
}

let addPeples=()=>{
  return axios.get('ysys_countPeoples');
}

let getYsysInfo=()=>{
  return axios.get('ysys_getYsysInfo');
}

let setBuyInfo=(val)=>{
  let param = new URLSearchParams();
  param.append("info", val);
  return axios.post('ysys_setBuyInfo',param);
}
export {getConfig,addPeples,getYsysInfo,setBuyInfo}



