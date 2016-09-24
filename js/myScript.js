/**
 * Created by 赵雪青 on 2016/8/20.
 */

function toDouble(n){
    return n<10 ? '0'+n : ''+n;
}
function findArr(n,arr){
    for(var i=0;i<arr.length;i++){
        if(n==arr[i]){
            return true;
        }
    }
    return false;
}
function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}
function jsonp(json){
    json = json||{};
    if(!json.url)return;
    json.cbName = json.cbName||'cb';
    json.data = json.data||{};
    json.timeout = json.timeout||10000;
    var timer = null;
    json.data[json.cbName] = 'show'+Math.random();
    json.data[json.cbName] = json.data[json.cbName].replace('.','');
    var arr = [];
    for(var name in json.data){
        arr.push(name+'='+encodeURIComponent(json.data[name]));
    }
    var str = arr.join('&');

    window[json.data[json.cbName]]=function(result){
        json.success&&json.success(result);
        clearTimeout(timer);
        oH.removeChild(oS);
    };
    var oH = document.getElementsByTagName('head')[0];
    var oS = document.createElement('script');
    oS.src=json.url+'?'+str;
    oH.appendChild(oS);
    timer = setTimeout(function(){
        window[json.data[json.cbName]]=null;
        json.error&&json.error('请求超时');
    },json.timeout);
}
function json2url(json){
    var arr = [];
    for(var key in json){
        arr.push(key+'='+encodeURIComponent(json[key]));
    }
    return arr.join('&');
}
function getPos(obj){
    var l = 0;
    var t = 0;

    while(obj){
        l+=obj.offsetLeft;
        t+=obj.offsetTop;
        obj = obj.offsetParent;
    }

    return {left:l,top:t};
}
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else {
        obj.attachEvent('on'+sEv,fn);
    }
}
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent=ev||event;
        //鼠标向下
        var dur=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
        fn&&fn(dur);
        oEvent.preventDefault&&oEvent.preventDefault();
        return false;
    }
    if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        addEvent(obj,'DOMMouseScroll',wheel);
    }else {
        addEvent(obj,'mousewheel',wheel);
    }
}
function DOMReady(fn){
    if(document.addEventListener){
        addEvent(document,'DOMContentLoaded',function(){
            fn&&fn();
        });
    }else {
        addEvent(document,'readystatechange',function(){
            if(document.readyState=='complete'){
                fn&&fn();
            }
        });
    }
}
function getStyle(obj, sName) {
    return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}
function move(obj, json, options) {
    options = options || {};
    options.duration = options.duration || 1000;
    options.type = options.type || 'ease-out';
    var start = {};
    var dis = {};
    for (var key in json) {
        start[key] = parseInt(getStyle(obj, key));
        dis[key] = json[key] - start[key];
    }
    var count = Math.floor(options.duration / 30);
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        n++;
        for (var key in json) {
            switch (options.type) {
                case 'linear':
                    var a = n / count;
                    var cur = start[key] + dis[key] * a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var cur = start[key] + dis[key] * Math.pow(a, 3);
                    break;
                case 'ease-out':
                    var a = 1 - n / count;
                    var cur = start[key] + dis[key] * (1 - Math.pow(a, 3));
                    break;
            }
            if (key == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity=' + cur * 100 + ')';
            } else {
                obj.style[key] = cur + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    }, 30)
}
function ajax(json){
    //参数初始化
    json = json||{};
    if(!json.url)return;
    json.data = json.data||{};
    json.time = json.time||15000;
    json.type = json.type||'get';
    //解决缓存
    json.data.t = Math.random();

    //创建ajax对象
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //判断提交方式
    switch(json.type.toLowerCase()){
        case 'get':

            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
        default:
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
    }
    //接收
    oAjax.onreadystatechange=function(){
        //判断ajax状态是否完成
        if(oAjax.readyState==4){
            //如果完成就去掉超时
            clearTimeout(timer);
            //判断http状态是否成功
            if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
                //返回响应结果
                json.success&&json.success(oAjax.responseText);
            }else{
                //返回错误信息
                json.error&&json.error(oAjax.status);
            }
        }
    };
    //超时
    var timer = setTimeout(function(){
        //如果超时，就取消接收。
        oAjax.onreadystatechange = null;

        //返回超时信息。
        json.error&&json.error('亲，网络不给力，已超时！呵呵。');
    },json.time);
}
function setCookie(sName,sValue,iDay){
    if(iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie = sName+'='+sValue+'; PATH=/; EXPIRES='+oDate.toGMTString();
    }else{
        document.cookie = sName+'='+sValue+'; PATH=/';
    }
}
function getCookie(sName){
    var arr = document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');
        if(arr2[0]==sName){
            return arr2[1];
        }
    }
}
function removeCookie(sName){
    setCookie(sName,1,-1);
}
//弧度转角度
function a2d(n){
    return n*180/Math.PI;
}
//角度转弧度
function d2a(n){
    return n*Math.PI/180;
}
