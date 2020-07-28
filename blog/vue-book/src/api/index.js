import axios from 'axios'
axios.defaults.baseURL = '/api';





let deleteSort=(data)=>{
    return axios.get("sort/delete?id="+data);
}



let getRelease=(start,size)=>{
    return axios.get("article/release?start="+start+"&size="+size);
}



let getNew=(start,size)=>{
    return axios.get("article/new?start="+start+"&size="+size);
}
let getViews=(start,size)=>{
    return axios.get("article/view?start="+start+"&size="+size);
}

let getlike=(start,size)=>{
    return axios.get("article/like?start="+start+"&size="+size);
}


let timeArchiving=()=>{
    return axios.get("article/TimeArchiving");
}


let getArchivingArticles=(year_month)=>{
    return axios.get("article/findArticlesByYearAndMonth?year_month="+year_month);
}

let sortArchiving=()=>{
    return axios.get("article/classifyArchiving");
}


let getSortArchivingArticles=(id)=>{
    return axios.get("article/findArticlesBySortId?sortId="+id);
}

let getSession=()=>{
    return axios.get("user/session");
}

let deleteArticle=(id)=>{
    return axios.get("article/delete?id="+id);
}
let getArticle=(id)=>{
    return axios.get("article/findArticleByArticleId?articleId="+id);
}




let login=(data)=>{
    var formData=new FormData();
    formData.append("email",data.email);
    formData.append("password",data.password);
    return axios.post("user/login",formData);
}
let killSession=(data)=>{
    return axios.get("user/killSession");
}

let  addLike=(id)=>{
    return axios.get("article/addLike?articleId="+id);
}
let addView=(id)=>{
    return axios.get("article/addView?articleId="+id);
}
export {addLike,addView,sortArchiving,getSortArchivingArticles,getArticle,deleteSort,getRelease,getViews,getlike,getNew,timeArchiving,getArchivingArticles,deleteArticle,getSession,login,killSession}

