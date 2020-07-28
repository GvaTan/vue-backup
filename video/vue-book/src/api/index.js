import axios from 'axios'
axios.defaults.baseURL = '/api';



let getFilms=(keyword,page,size)=>{
    return axios.get("11Ssm-solr-film/index/search?keyword="+keyword+"&page="+page+"&size="+size);
}

export {getFilms}

