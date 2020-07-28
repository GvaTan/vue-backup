/*
*@author:Gva
*@qq:1632414557
*@version:1.1
*@anets.cn
*/


/*----------------------------------------------------------类定义部分|构造函数----------------------------------------------------------/
/*****************选择器******************/
function Vq(arg){
  this.elements=[];
  switch(typeof arg) {
  	//可以实现window.onload功能
  	case 'function':
  		//如果是函数，直接绑定window.onload功能
  		addEvent(window,'load',arg);
  		break;
  	case "string":
	  		switch(arg.charAt(0)) {
	         	case '#':
			   		this.elements.push(document.getElementById(arg.substring(1)));
			   	  	break;
			   	case ".":
			   		this.elements=getByClassName(document,arg.substring(1));
			   		break;
			   	default :
			   	    this.elements=document.getElementsByTagName(arg);
			   	    break;
	         }
  		break;
  	case "object":
  	     this.elements.push(arg)
  }
}


/*----------------------------------------------------------类方法变量部分----------------------------------------------------------*/
//------------------------------------事件
//绑定事件
Vq.prototype.bind=function(name,fn){
    for(var i=0;i<this.elements.length;i++){
    	addEvent(this.elements[i],name,fn);
    }
    return this;
}
//点击事件
Vq.prototype.click=function(fn){
    for(var i=0;i<this.elements.length;i++){
    	addEvent(this.elements[i],'click',fn);
    }
    return this;
}
//悬浮事件
Vq.prototype.hover=function(fnOver,fnOut){
    for(var i=0;i<this.elements.length;i++){
    	addEvent(this.elements[i],'mouseover',fnOver);
    	addEvent(this.elements[i],'mouseout',fnOut);
    }
    return this;
}

//------------------------------------css样式
//设置与获取样式
Vq.prototype.css=function(attr,value){
    if(arguments.length==2){//设置参数
       for(var i=0;i<this.elements.length;i++){
    	this.elements[i].style[attr]=value;
       }
    }else{//获取样式
        return getStyle(this.elements[0],attr);
    }
    return this;
}

//显示元素
Vq.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
    	this.elements[i].style.display='block';
    }
    return this;
}


//多样式改变
Vq.prototype.animate=function(json,speeds,fn){
	for(var i=0;i<this.elements.length;i++){
    	 moves(this.elements[i], json,speeds,fn);
    }
    return this;
}
//隐藏元素
Vq.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
    	this.elements[i].style.display='none';
    }
    return this;
}

//布局转换，相对定位转成绝对定位，传过参数是父元素，把父元素的一级子元素转成绝对定位
Vq.prototype.relativeToPosition=function(){
	for(var i=0;i<this.elements.length;i++){
		if(getStyle(this.elements[i],"position")=="static"){
           this.elements[i].style["position"]='relative';
		}
    	
    	var j=0;
    	for(j=0;j<this.elements[i].children.length;j++){
            this.elements[i].children[j].style.left=this.elements[i].children[j].offsetLeft+'px';
            this.elements[i].children[j].style.top=this.elements[i].children[j].offsetTop+'px';
    	}
    	for(j=0;j<this.elements[i].children.length;j++){
            this.elements[i].children[j].style["position"]='absolute';
            this.elements[i].children[j].style["margin"]='0';
    	}	
    }
    return this;
}
//------------------------------------元素添加
Vq.prototype.html=function(val){
	for(var i=0;i<this.elements.length;i++){
       this.elements[i].innerHTML=val;
    }
    return this;
}
Vq.prototype.text=function(val){
	for(var i=0;i<this.elements.length;i++){
		// var txt =document.createTextNode(val);
  //   	this.elements[i].appendChild(txt);
       this.elements[i].innerText=val;
    }
    return this;
}

//------------------------------------元素的位置
Vq.prototype.offsetLeft=function(){
    return this.elements[0].offsetLeft;
}
Vq.prototype.offsetTop=function(){
    return this.elements[0].offsetTop;
}
Vq.prototype.offsetBottom=function(){
    return this.elements[0].offsetBottom;
}
Vq.prototype.offsetRight=function(){
    return this.elements[0].offsetRight;
}
//------------------------------------元素属性
//设置与获取属性
Vq.prototype.attr=function(attr,value){
    if(arguments.length==2){//设置参数
       for(var i=0;i<this.elements.length;i++){
    	this.elements[i][attr]=value;
       }
    }else{//获取样式
        return this.elements[0][attr];
    }
}


//------------------------------------元素获取
//获取第n各元素
Vq.prototype.eq=function(n){
    return s(this.elements[n]);
}

//获取元素个数
Vq.prototype.size=function(n){
    return this.elements.length;
}

//在某个元素中找子元素
Vq.prototype.find=function(str){
	
	var aResult=[];
	
	for(var i=0;i<this.elements.length;i++)
	{
		switch(str.charAt(0))
		{
			case '.':	//class
				var aEle=getByClassName(this.elements[i], str.substring(1));
				
				aResult=aResult.concat(aEle);
				break;
			default:	//标签
				var aEle=this.elements[i].getElementsByTagName(str);
				//aEle不是数组,是对象
				//aResult=aResult.concat(aEle);
				appendArr(aResult, aEle);
		}
	}
	
	var newVq=s();
	
	newVq.elements=aResult;
	
	return newVq;
};


//获取元素索引
Vq.prototype.index=function(){
	var obj=this.elements[0];
	var aBrother=obj.parentNode.children;
	var i=0;
	
	for(i=0;i<aBrother.length;i++)
	{
		if(aBrother[i]==obj)
		{
			return i;
		}
	}
};
//-----------------------------------插件扩展
Vq.prototype.extend=function(name,fn){
	Vq.prototype[name]=fn;
}

//------------------------------------其他功能
//切换函数功能，第一次执行第一个，第二次执行第二个，如此循环
Vq.prototype.toggle=function ()
{
	var i=0;
	//获取函数个数
	var _arguments=arguments;
	
	for(i=0;i<this.elements.length;i++)
	{
		addToggle(this.elements[i]);
	}
	
	function addToggle(obj)
	{
		var count=0;
		addEvent(obj, 'click', function (){
			_arguments[count++%_arguments.length].call(obj);
		});
	}
};

//----------------------------------- 音乐相关的功能
Vq.prototype.play=function(){
	for(i=0;i<this.elements.length;i++)
	{ 
	  this.elements[i].play();
	}
}
//暂停播放
Vq.prototype.pause=function(){
	for(i=0;i<this.elements.length;i++)
	{ 
	  this.elements[i].pause();
	}
}
//停止播放
Vq.prototype.stop=function(){
	for(i=0;i<this.elements.length;i++)
	{ 
	  this.elements[i].pause();
	   this.elements[i].load();
	}
}
//重新播放
Vq.prototype.replay=function(){
	for(i=0;i<this.elements.length;i++)
	{ 
	   this.elements[i].load();
	    this.elements[i].play();
	}
}

//获取音乐当前时间
Vq.prototype.currentTime=function(val){
	if(arguments.length==1){
         this.elements[0].currentTime=val;
	}else{
		return this.elements[0].currentTime;
	}
}
//获取音乐总时间
Vq.prototype.duration=function(){
	   return this.elements[0].duration;
	
}

//获取音乐音量
Vq.prototype.volume=function(val){
	if(arguments.length==1){
        this.elements[0].volume=val;
	}else{
		return this.elements[0].volume;
	}
	   
}
//是否开启静音
Vq.prototype.muted=function(val){
	//true or false
        this.elements[0].muted=val;
}
//------------------------------------扩展功能jq不存在的
//右键菜单,阻止默认的菜单事件，显示自定义的菜单事件
Vq.prototype.menu=function(){
	var obj=this.elements[0];
	 s(obj).hide();
	 s(obj).css('position','fixed');
	 	var flag=false;
	 	addEvent(document,'contextmenu',function(ev){
	 		var e=ev||event;
	 		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	 		var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	 		var width=s(obj).css('width');
	 		var height=s(obj).css('height');
	 		width=parseInt(width.substring(0,width.indexOf('px')));
	 		height=parseInt(height.substring(0,height.indexOf('px')));

	 		var x=e.clientX;
            var y=e.clientY;
            var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
            var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
  
            if(y+height>h){
               y=h-height;
            }
            if((x+width)>w){
               x=w-width;
            }

            s(obj).css('left',x+"px");
             s(obj).css('top',y+"px");
	 		if(!flag){
              s(obj).show();
              flag=true;
	 		}else{
	 		   s(obj).hide();
	 		  flag=false;
	 		}
	 		return false;
	 	});

	 	addEvent(document,'scroll',function(){
	 		s(obj).hide();
	 		flag=false;
	 	});
	 
 }
//拖拽
Vq.prototype.drag=function(){
	
     for(i=0;i<this.elements.length;i++)
	{
	  drag(this.elements[i]);
	}
 }
 //拖拽x
Vq.prototype.dragX=function(distance,fn){	
	
     for(i=0;i<this.elements.length;i++)
	{
	  dragX(this.elements[i],distance,fn);
	}
 }

  //拖拽Y
Vq.prototype.dragY=function(distance,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	  dragY(this.elements[i],distance,fn);
	}
 }

 
//鼠标跟随
Vq.prototype.follow=function(){
	
     for(i=0;i<this.elements.length;i++)
	{
	  follow(this.elements[i]);
	}
 }



//平移x
Vq.prototype.translateX=function(distance,isBuffer,speeds,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	  translateX(this.elements[i],distance,isBuffer,speeds,fn)
	}
 }

 //平移y
Vq.prototype.translateY=function(distance,isBuffer,speeds,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	  translateY(this.elements[i],distance,isBuffer,speeds,fn)
	}
 }

//改变单属性
Vq.prototype.move=function(attr,target,speeds,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	   move(this.elements[i],attr,target,speeds,fn);
	}
 }
//改变多属性
/*
*speeds是逻辑上的速度。默认为1,越大越慢  (可选参数)
*json 封装着多个属性 例如{opacity:90;left:300} 
*fn是回调函数，运行完后调用  (可选参数)
*/
Vq.prototype.moves=function(json,speeds,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	 moves(this.elements[i], json,speeds,fn);
	}
 }

//碰撞
Vq.prototype.crash=function(iSpeedX,iSpeedY){
	
     for(i=0;i<this.elements.length;i++)
	{
	 crash(this.elements[i],iSpeedX,iSpeedY);
	}
 }
 
 //碰撞+重力运动
Vq.prototype.crashInGravity=function(iSpeedX,iSpeedY,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	 crashInGravity(this.elements[i],iSpeedX,iSpeedY,fn);
	}
 }

//弹性运动
 /*oDiv是元素对象
*radius是幅度（可选）
*spped是速度（可选）
*/
Vq.prototype.bounce=function(radius,spped){
	
     for(i=0;i<this.elements.length;i++)
	{
	  bounce(this.elements[i],radius,spped)
	}
 }

//弹性+摩擦运动
/*oDiv是元素对象
*radius是幅度（可选）
*spped是速度（可选）
*/
Vq.prototype.bounceInFriction=function(radius,spped,fn){
	
     for(i=0;i<this.elements.length;i++)
	{
	  bounceInFriction(this.elements[i],radius,spped,fn);
	}
 }


//加速运动
Vq.prototype.riseSpeed=function(start,end,fn){
	
    for(i=0;i<this.elements.length;i++)
	{ 
	  riseSpeed(this.elements[i],start,end,fn)
	}
 }

//减速运动
Vq.prototype.slowSpeed=function(start,end,fn){
	
    for(i=0;i<this.elements.length;i++)
	{ 
	  slowSpeed(this.elements[i],start,end,fn)
	}
 }

//摩擦运动
Vq.prototype.friction=function(start,g,fn){
	
    for(i=0;i<this.elements.length;i++)
	{ 
	  friction(this.elements[i],start,g,fn);
	}
 }

/*----------------------------------------------------------辅助功能----------------------------------------------------------*/
//----------------------------------------简写功能
function S(arg){
   return new Vq(arg);
}

function s(arg){
   return new Vq(arg);
}


//把集合中的元素添加的数组中
function appendArr(arr, list)
{
	for(var i=0;i<list.length;i++)
	{
		arr.push(list[i]);
	}
}

//----------------------------------------兼容功能
/*****************事件绑定|兼容******************/
function addEvent(obj,type,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+type,function(){
			if(false==fn.call(obj)){
				event.cancelable=true;
               return false;
			}
		});
	}else{
		obj.addEventListener(type,function(ev){
			if(false==fn.call(obj)){
				ev.cancelable=true;
               ev.preventDefault();
			}
		},false);
	}
}

/*****************类选择器|兼容******************/
function getByClassName(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	var re=new RegExp('\\b'+sClass+'\\b','i');
	for(i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}
/*****************样式获取|兼容******************/
function getStyle(obj,attr){
    if(obj.currentStyle){
    	return obj.currentStyle[attr];
    }else{
    	return getComputedStyle(obj,false)[attr];
    }
}


/*****************扩展功能******************/

//拖拽
function drag(oDiv){

 	 oDiv.style["position"] ="absolute";
 	  oDiv.style["cursor"] ="default";
	 oDiv.onmousedown=function(e){

	 	var oEvent=e||event;
	 	//获取鼠标位置到div左上角的2个距离
         var distanceX=oEvent.clientX-oDiv.offsetLeft;
         var distanceY=oEvent.clientY-oDiv.offsetTop;

	 	document.onmousemove=function(e){

	 		var oEvent=e||event;
	 		oDiv.style.left=(oEvent.clientX-distanceX)+'px';
	 		oDiv.style.top=(oEvent.clientY-distanceY)+"px";
	 	}

	 	document.onmouseup=function(e){
            document.onmousemove=null;
            document.onmouseup=null;
	 	}


	 }

 }


//拖拽X
function dragY(oDiv,distance,fn){

 	 oDiv.style["position"] ="absolute";
 	  oDiv.style["cursor"] ="pointer";
 	   var origin=parseInt(getStyle(oDiv,'top'));
	 oDiv.onmousedown=function(e){
        
       
	 	var oEvent=e||event;
	 	//获取鼠标位置到div左上角的2个距离
         // var distanceX=oEvent.clientX-oDiv.offsetLeft;
         var distanceY=oEvent.clientY-oDiv.offsetTop;

	 	document.onmousemove=function(e){

	 		var oEvent=e||event;
	 		// oDiv.style.left=(oEvent.clientX-distanceX)+'px';
	 		oDiv.style.top=(oEvent.clientY-distanceY)+"px";
	 		
	 		if(parseInt(getStyle(oDiv,'top'))-origin>parseInt(distance)){
	 			oDiv.style.top=origin+parseInt(distance)+'px';
	 		}
	 		if(parseInt(getStyle(oDiv,'top'))-origin<0){
	 			oDiv.style.top=origin+'px';

	 		}
	 		fn();
	 	}

	 	document.onmouseup=function(e){
            document.onmousemove=null;
            document.onmouseup=null;
	 	}


	 }

 }

 //拖拽Y
function dragX(oDiv,distance,fn){

 	 oDiv.style["position"] ="absolute";
 	  oDiv.style["cursor"] ="pointer";
 	  var origin=parseInt(getStyle(oDiv,'left'));
	 oDiv.onmousedown=function(e){
        
	 	var oEvent=e||event;
	 	//获取鼠标位置到div左上角的2个距离
         var distanceX=oEvent.clientX-oDiv.offsetLeft;
         // var distanceY=oEvent.clientY-oDiv.offsetTop;

	 	document.onmousemove=function(e){
	 		var oEvent=e||event;
	 		oDiv.style.left=(oEvent.clientX-distanceX)+'px';
	 		
	 		if(parseInt(getStyle(oDiv,'left'))-origin>parseInt(distance)){
	 			oDiv.style.left=origin+parseInt(distance)+'px';
	 			
	 		}
	 		if(parseInt(getStyle(oDiv,'left'))-origin<0){
	 			oDiv.style.left=origin+'px'
	 		}
	 		fn();

	 	}

	 	document.onmouseup=function(e){
            document.onmousemove=null;
            document.onmouseup=null;
	 	}


	 }

 }
 //跟随
 //跟随鼠标运动动态提示
function follow(oDiv){

	   	
	   	 	oDiv.style["position"] ="absolute";

	   	 document.onmousemove=function(e){
	   	 	//事件兼容
	   	 	var oEvent=e||event;
	   	 	//获取滚动条的高度，超出可视区的部分
	   	 	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	   	 	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            //计算出绝对坐标（x,y）
	   	 	var x=oEvent.clientX+scrollLeft;
	   	 	var y=oEvent.clientY+scrollTop;
	   	 	x+="px";
	   	 	y+="px";
	   	 	
	   	 	oDiv.style.left=x;
	   	 	oDiv.style.top=y;

	   	 
	   	 }
 }

 /******************   让div匀速动起来,在X轴上平移   **********************
 *oDiv传入的平移元素对象
 *distance是平移长度
 *speeds是速度   1以上最佳   (可选参数)
 *isBuffer是否缓冲，默认true,否则就是匀速(可选参数)
  *fn回调函数(可选参数)
 */
 function translateX(obj,distance,isBuffer,speeds,fn){
 	//计算起始位置
 	if(speeds){
 		if(speeds<0){
           distance*=-1;
           speeds*=-1;
 	    }
 	}else{
 		speeds=1;
 	}

 	 obj.style["position"] ="absolute";
    var startLocation=obj.offsetLeft;


    //计算终点位置
    var target=startLocation+distance;
    

    obj.timer=setInterval(function(){
    	//计算每次的速度   剩下的长度/缩放系数
    	if(isBuffer){
    		 speed=(target-obj.offsetLeft)/8*speeds;
    	}else{
    		 if(distance>0){
    		 	speed=speeds*8;
    		 }else{
    		 	speed=-speeds*8;
    		 }
    	}
    	 speed=speed>0?Math.ceil(speed):Math.floor(speed);


    	 //开始运动
    	 var left=obj.offsetLeft+speed;
    	 obj.style.left=left+"px";



    	 //缓冲终止运动
    	 if(left==target&&isBuffer){
            clearInterval(obj.timer);
            if(fn){
              fn();
            }
    	 }
         //匀速运动
    	 if(isBuffer==false&&Math.abs(target-obj.offsetLeft)<Math.abs(speed)){
                
    	        obj.style.left=target+"px";
    	        clearInterval(obj.timer);
	            if(fn){
	              fn();
	            }
            
    	 }
    }, 30);

 }

 /******************   让div匀速动起来,在Y轴上平移   **********************
 *oDiv传入的平移元素对象
 *distance是平移长度
 *speeds是速度   1以上最佳   (可选参数)
 *isBuffer是否缓冲，默认true,否则就是匀速(可选参数)
  *fn回调函数(可选参数)
 */
  function translateY(obj,distance,isBuffer,speeds,fn){
 	//计算起始位置
 	if(speeds){
 		if(speeds<0){
           distance*=-1;
           speeds*=-1;
 	    }
 	}else{
 		speeds=1;
 	}

 	 obj.style["position"] ="absolute";
    var startLocation=obj.offsetTop;


    //计算终点位置
    var target=startLocation+distance;
    

    obj.timer=setInterval(function(){
    	//计算每次的速度   剩下的长度/缩放系数
    	if(isBuffer){
    		 speed=(target-obj.offsetTop)/8*speeds;
    	}else{
    		 if(distance>0){
    		 	speed=speeds*8;
    		 }else{
    		 	speed=-speeds*8;
    		 }
    	}
    	 speed=speed>0?Math.ceil(speed):Math.floor(speed);


    	 //开始运动
    	 var top=obj.offsetTop+speed;
    	 obj.style.top=top+"px";



    	 //缓冲终止运动
    	 if(top==target&&isBuffer){
            clearInterval(obj.timer);
            if(fn){
              fn();
            }
    	 }
         //匀速运动
    	 if(isBuffer==false&&Math.abs(target-obj.offsetTop)<Math.abs(speed)){
                
    	        obj.style.top=target+"px";
    	        clearInterval(obj.timer);
	            if(fn){
	              fn();
	            }
            
    	 }
    }, 30);

 }

 /*************  单属性运动函数   ***********************
*obj是传入的元素对象
*attr是传入的属性字符串，比如"left",opacity等
*target是传入属性值，如果是opacity，那么值应该按百分制算
*speeds是逻辑上的速度。默认为1,越大越慢   (可选参数)
*fn是回调函数，运行完后调用   (可选参数)
*/
 function move(obj,attr,target,speeds,fn){

  //如果要平移的话，设置为绝对定位，left才会生效
 	if(attr=="left"||attr=="top"||attr=="bottom"||attr=="right"){
         obj.style["position"] ="absolute";
 	}

    var isRun=true;
 	obj.timer=setInterval(function(){
	       //取出当前属性的值
	 	var currentVal=0;
	 	if(attr=="opacity"){
	 		currentVal=parseInt(parseFloat(getStyle(obj, attr))*100);
	 	}else{
	        currentVal=parseInt(getStyle(obj, attr));
	 	}

	 	//计算速度    速度=（总距离-当前运动的）/缩放系数   达到缓冲的效果
	 	var speed=0;
	 	if(speeds){
           speed=(target-currentVal)/(speeds*8);
	 	}else{
	 	   speed=(target-currentVal)/(8);
	 	}
	 	//将计算的速度转成整形，防止无线小数引起的诸多问题
	 	speed=speed>0?Math.ceil(speed):Math.floor(speed);
       
        //运动
        if(attr=="opacity"){
        	obj.style.filter='alpha(opacity:'+(currentVal+speed)+')';
			obj.style.opacity=+(currentVal+speed)/100;
        }else{
        	obj.style[attr]=currentVal+speed+'px';
        }

	 	//检测停止
	 	if(currentVal>=target){
            isRun=false;
	 	}
        //是否回调
	 	if(isRun==false){
        clearInterval(obj.timer);
        if(fn){//回调函数
             fn();//运行回调函数
        }
 	}
 	}, 30);

 }


/*************  多属性运动函数   ***********************
*obj是传入的元素对象
*speeds是逻辑上的速度。默认为1,越大越慢
*json 封装着多个属性 例如{opacity:90;left:300}  (可选参数)
*fn是回调函数，运行完后调用  (可选参数)
*/


// obj, json,speeds,fn
function moves(obj, json,speeds,fn)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;		//这一次运动就结束了——所有的值都到达了
			for(var attr in json)
			{
				//1.取当前的值
				var iCur=0;
				
				if(attr=='opacity')
				{
					iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
				}
				else
				{
					iCur=parseInt(getStyle(obj, attr));
				}
				
				//2.算速度
				var iSpeed=0;
				if(speeds){
	               iSpeed=(json[attr]-iCur)/(8*speeds);
				}else{
				   iSpeed=(json[attr]-iCur)/(8);
				}
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				
				//3.检测停止
				if(iCur!=json[attr])
				{
					bStop=false;
				}
				
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else
				{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}
			
			if(bStop)
			{
				clearInterval(obj.timer);
				
				if(fn)
				{
					fn();
				}
			}
		}, 30)
	}
/********************************* 碰撞运动  **********************
*
*/
function crash(oDiv,iSpeedX,iSpeedY)
{

	  if(!iSpeedX){
         iSpeedX=6;
         iSpeedY=6;
	  }else if(!iSpeedY){
         iSpeedY=6;
	  }else{}

	 oDiv.style["position"] ="absolute";
	setInterval(function (){

		var l=oDiv.offsetLeft+iSpeedX;
		var t=oDiv.offsetTop+iSpeedY;
		
		if(t>=document.documentElement.clientHeight-oDiv.offsetHeight)
		{
			iSpeedY*=-1;
			t=document.documentElement.clientHeight-oDiv.offsetHeight;
		}
		else if(t<=0)
		{
			iSpeedY*=-1;
			t=0;
		}
		
		if(l>=document.documentElement.clientWidth-oDiv.offsetWidth)
		{
			iSpeedX*=-1;
			l=document.documentElement.clientWidth-oDiv.offsetWidth;
		}
		else if(l<=0)
		{
			iSpeedX*=-1;
			l=0;
		}
		
		oDiv.style.left=l+'px';
		oDiv.style.top=t+'px';
	}, 30);
}
/********************************* 碰撞+重力运动  **********************
*
*/
function crashInGravity(oDiv,iSpeedX,iSpeedY,fn)
{   


	 if(!iSpeedX){
         iSpeedX=6;
         iSpeedY=6;
	  }else if(!iSpeedY){
         iSpeedY=6;
	  }else{

	  }
	  oDiv.style["position"] ="absolute";
	oDiv.timer=setInterval(function (){
		
		iSpeedY+=3;
		
		var l=oDiv.offsetLeft+iSpeedX;
		var t=oDiv.offsetTop+iSpeedY;
		
		if(t>=document.documentElement.clientHeight-oDiv.offsetHeight)
		{
			iSpeedY*=-0.8;
			iSpeedX*=0.8;
			t=document.documentElement.clientHeight-oDiv.offsetHeight;
		}
		else if(t<=0)
		{
			iSpeedY*=-1;
			iSpeedX*=0.8;
			t=0;
		}
		
		if(l>=document.documentElement.clientWidth-oDiv.offsetWidth)
		{
			iSpeedX*=-0.8;
			l=document.documentElement.clientWidth-oDiv.offsetWidth;
		}
		else if(l<=0)
		{
			iSpeedX*=-0.8;
			l=0;
		}
		
		if(Math.abs(iSpeedX)<1)
		{
			iSpeedX=0;
		}
		
		if(Math.abs(iSpeedY)<1)
		{
			iSpeedY=0;
		}
		

		
		oDiv.style.left=l+'px';
		oDiv.style.top=t+'px';
		if(iSpeedX==0&&iSpeedY==0){
			clearInterval(oDiv.timer);
			if(fn){
                fn();
			}
		}
	}, 30);
}

/****************** 弹性运动  *********************
*oDiv是元素对象
*radius是幅度（可选）
*spped是速度（可选）
*/

function bounce(oDiv,radius,spped)
{    

	if(!radius){
      radius=550;
      spped=1;
	}else if(!spped){
      spped=1;
	}else{

	}
	var iSpeed=0;
	 oDiv.style["position"] ="absolute";
	 var startLocation=oDiv.offsetLeft;
	setInterval(function (){
		iSpeed+=(startLocation+radius-oDiv.offsetLeft)/100*spped;
		
		oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';
	}, 30);
}


/****************** 弹性+摩擦运动  *********************
*oDiv是元素对象
*radius是幅度（可选）
*spped是速度（可选）
*/

function bounceInFriction(oDiv,radius,spped,fn)
{
	if(!radius){
      radius=550;
      spped=1;
	}else if(!spped){
      spped=1;
	}else{

	}
	var iSpeed=0;
	 oDiv.style["position"] ="absolute";
	 var startLocation=oDiv.offsetLeft;
	
	oDiv.timer=setInterval(function (){
		iSpeed+=(startLocation+radius-oDiv.offsetLeft)/5*spped;
		iSpeed*=0.7;
		oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';
          
		if(startLocation+radius==oDiv.offsetLeft){
			clearInterval(oDiv.timer);
			if(fn){
                fn();
			}
		}
	}, 30);
}


/***************************减速运动********************
*
*/
function  slowSpeed(oDiv,start,end,fn){
	if(!end){
       end=0;
	}
    var iSpeed=start;
	oDiv.style["position"] ="absolute";
	oDiv.timer=setInterval(function (){
		iSpeed--;
		
		oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';

   

		if(iSpeed<=end){
           clearInterval(oDiv.timer);
           if(fn){
               fn();
           }
		}
	}, 30);
}

/***************************加速运动********************/
function  riseSpeed(oDiv,start,end,fn)
{   
	
	if(!end){
       end=20;
	}
    var iSpeed=start;
	oDiv.style["position"] ="absolute";
	oDiv.timer=setInterval(function (){
		iSpeed++;
		
		oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';


		if(iSpeed>=end){
           clearInterval(oDiv.timer);
           if(fn){
               fn();
           }
		}
	}, 30);
}

/***************************摩擦运动********************/
function friction(oDiv,start,friction,fn)
{   
	if(!start){
       start=20;
       friction=0.95;
	}else if(!friction){
       friction=0.95;
	}
    var location=oDiv.offsetLeft;
	iSpeed=start;
	oDiv.style["position"] ="absolute";
	
	var flag=0;
	oDiv.timer=setInterval(function (){
		iSpeed*=friction;
		oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';
		if(flag==oDiv.offsetLeft){
          clearInterval(oDiv.timer);
          if(fn){
          	fn();
          }
		}
		flag=oDiv.offsetLeft;
       

	}, 30);
}
