import axios from 'axios'
axios.defaults.baseURL = '/api';

//获得文件
let postLogin=(data)=>{
    let formdata = new FormData();
//    formdata.append('sid',sid);
//    formdata.append('payType',payType);
//    formdata.append('pay',pay);
    for(var key in data){
        formdata.append(key,data[key]);
    }
    return axios.post("user/login.action",formdata);
}

//根据分享链接查询文件
export {postLogin}

