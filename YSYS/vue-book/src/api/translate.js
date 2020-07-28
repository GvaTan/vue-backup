import axios from 'axios'
axios.defaults.baseURL = '/api';
let getDataFromYoudao=(value)=>{
  return axios.get('api_getTranslate?query='+value);
}
export {getDataFromYoudao}
