import axios from 'axios'


axios.defaults.baseURL = '/api';
let login=(usermail,password)=>{
   return axios.post("/userLogin",{
     usermail:usermail,
     password:password
   },{
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
export {login}
