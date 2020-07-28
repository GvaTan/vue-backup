import axios from 'axios';

axios.defaults.baseURL='http://localhost:3000';

let getSliders=()=>{
  return axios.get('/slider');
};
let getHots=()=>{
  return axios.get('/hot');
};

let getBook=()=>{
  return axios.get('book');
}

let deleteBook=(id)=>{
  return axios.delete('book?id='+id);
}


let getById=(id)=>{
  return axios.get('book?id='+id);
};


let updateById=(id,data)=>{
  return axios.put('book?id='+id,data);
};


let add=(data)=>{
  return axios.post('book?id=we',data);
};


let getLimited=(offset)=>{
  return axios.get('page?offset='+offset);
};
export {getSliders,getHots,getBook,deleteBook,getById,updateById,add,getLimited};


