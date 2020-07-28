let http=require('http');
let fs=require('fs');
let url=require('url');

let data=require('./slider');
function read(callback){
   let books=fs.readFile('./book.json','utf-8',function (err,data) {

     let books=JSON.parse(data);

     callback(books);
   });

}
http.createServer((request,response)=>{
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  response.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (request.method == 'OPTIONS') {
    return response.end();//让option请求快速返回
  }


  let {pathname,query}=url.parse(request.url,true);
  if(pathname=='/page'){
      let offset=parseInt(query.offset);
      let hasMore=true;
      read((books)=>{
        let result=books.reverse().slice(offset,offset+2);
        if(result.length<2){
          hasMore=false;
        }
        response.end(JSON.stringify({hasMore:hasMore,bookss:result}));
        return;
      })
  }
  else if(pathname=='/slider'){
      response.setHeader('Content-Type','application/json;charset=utf-8');
      response.end(JSON.stringify(data));
    return;
  }else if(pathname=='/hot'){
       fs.readFile('./book.json','utf-8',(err,data)=>{
        response.setHeader('Content-Type','application/json;charset=utf-8');
        let dataz=JSON.parse(data).reverse().slice(0,6);
        response.end(JSON.stringify(dataz));
        return;
      });
      return;
  }else if(pathname=='/book'){

       if(query.id){

          switch (request.method) {
            case 'POST':

                let str='';
                request.on('data',(part)=>{
                  str+=part;
                });
                request.on('end',()=>{
                  let book=JSON.parse(str);
                  read((books)=>{
                    let bookId=books.length+2;
                    book.bookId=bookId;
                    books.push(book);

                    fs.writeFile('./book.json',JSON.stringify(books),(err)=>{
                      if(err){
                        response.end('失败');
                        console.log("失败");
                      }else{
                        response.end('成功');
                        console.log("成功");
                      }
                    });
                  });

                });
              break;
              case 'PUT':

                let bookz='';
                request.on('data',(book)=>{
                  bookz+=book;
                });
                request.on('end',()=>{
                  read(books=>{
                    books=books.map(item=>{
                      if(item.bookId==parseInt(query.id)){
                        console.log(bookz);
                        bookz=JSON.parse(bookz);
                        return bookz;
                      }
                      return item;
                    });
                    fs.writeFile('./book.json',JSON.stringify(books),(result)=>{
                      if(result){
                        console.log(result);

                      }else {
                        response.end('ssssss');
                      }

                    });



                    return;
                  });
                });
              read((books)=>{
                query.data;
              });
              break;

            case 'GET':
              // console.log(query.id);

              read(function(books){
                let book=books.find(item=>item.bookId==query.id);
                if(!book){book={}};
                response.setHeader("Content-Type","application/json;charset=utf-8");
                response.end(JSON.stringify(book));
              });
              break;
            case  'DELETE':
              console.log(query.id);


              fs.readFile('./book.json','utf-8',(err,data)=>{
                let dataz=JSON.parse(data).reverse().slice(0,6);
                let as=dataz.filter(item=>item.bookId!==query.id);
                fs.writeFile('./book.json',JSON.stringify(as),function (err) {
                  if(err){
                    response.end('1');
                  }else {
                    response.end('0');
                  } });
                return;
              });

              break;
            default:
              console.log(request.method);
                break;

          }
          return;
       }else{
         fs.readFile('./book.json','utf-8',(err,data)=>{
           response.setHeader('Content-Type','application/json;charset=utf-8');
           data=JSON.parse(data);
           response.end(JSON.stringify(data));
         });
         return;
       }
  }else{
    return;
  }
}).listen(3000);
