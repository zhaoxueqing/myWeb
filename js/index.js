/**
 * Created by 赵雪青 on 2016/7/13.
 */
DOMReady(function () {
    //debugger;
    ;(function(){
        var oUl=document.getElementById('boxNo');
        var aLi=oUl.children;
        oUl.innerHTML+=oUl.innerHTML;
        oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
        var W=oUl.offsetWidth/2;
        var l=0;
        setInterval(function(){
            l-=5;
            oUl.style.left=l%W+'px';
        },30);
    })();
    ;(function(){
        var oLeft = document.getElementById('arr_left');
        var oRight = document.getElementById('arr_right');
        var oDiv = document.getElementById('seasons');
        var aLi = oDiv.getElementsByTagName('li');
        var oImg = oDiv.getElementsByTagName('img')[0];
        var arrImg = [
            'spring',
            'summer',
            'autumn',
            'winter'
        ];
        var n = 0;
        var timer = null;
        function tag(index) {
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className = ''
            }
            oImg.src = 'img/' + arrImg[index] + '.jpg';
            aLi[index].className = 'active';
        }
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;

            aLi[i].onclick = function () {
                clearInterval(timer);
                tag(this.index);
            };
        }
        oRight.onclick = function () {
            clearInterval(timer);
            next();
        };
        function next() {
            n++;
            if (n < aLi.length) {
                tag(n);
            } else {
                n = 0;
                tag(n);
            }
        }
        oLeft.onclick = function () {
            clearInterval(timer);
            n--;
            if (n >= 0) {
                tag(n);
            } else {
                n = aLi.length - 1;
                tag(n);
            }
        };
        oDiv.onmouseover = function () {
            clearInterval(timer);
        };
        oDiv.onmouseout = function () {
            clearInterval(timer);
            timer = setInterval(next, 1000);
        };
        clearInterval(timer);
        timer = setInterval(next, 1000);
    })();
    ;(function(){
        var oEffect_tab=document.getElementById('effect_tab');
        var aLi=oEffect_tab.getElementsByTagName('li');
        var oEffect_div=document.getElementById('effect_div');
        var aDiv=oEffect_div.children;
        var timer=null;
        for(var i=0;i<aLi.length;i++){
            ;(function(index){
                aLi[index].onmouseover=function(){
                    clearInterval(timer);
                    timer=setInterval(function(){
                        for(var i=0;i<aLi.length;i++){
                            aLi[i].className='';
                            aDiv[i].className='';
                        }
                        aLi[index].className='active';
                        aDiv[index].className='active';
                        if(index==2){
                            //滚动条
                            ;(function(){
                                var oBox1=document.getElementById('img_div');
                                var oBox2=document.getElementById('bar');
                                var oContent=document.getElementById('content_img');
                                var oBar=document.getElementById('scroll_bar');
                                var oScroll_img=document.getElementById('tot');
                                oBar.style.height=oBox2.offsetHeight*oBox1.offsetHeight/oContent.scrollHeight+'px';

                                oBar.onmousedown=function(ev){
                                    var oEvent=ev||event;
                                    var disY=oEvent.clientY-oBar.offsetTop;
                                    document.onmousemove=function(ev){
                                        var oEvent=ev||event;
                                        var t=oEvent.clientY-disY;
                                        changeTop(t);
                                    };
                                    document.onmouseup=function(){
                                        document.onmousemove=null;
                                        document.onmouseup=null;
                                        oBar.releaseCapture&&oBar.releaseCapture();
                                    };
                                    oBar.setCapture&&oBar.setCapture();
                                    return false;
                                };
                                function changeTop(t){
                                    if(t<0){
                                        t=0;
                                    }else if(t>oBox2.clientHeight-oBar.offsetHeight){
                                        t=oBox2.clientHeight-oBar.offsetHeight;
                                    }
                                    oBar.style.top=t+'px';
                                    var scale=t/(oBox2.clientHeight-oBar.offsetHeight);
                                    oContent.style.top=-scale*(oContent.offsetHeight-oBox1.clientHeight)+'px';
                                }
                                addWheel(oContent,function(dur){
                                    var t=oBar.offsetTop;
                                    if(dur){
                                        t+=10;
                                        changeTop(t);
                                    }else {
                                        t-=10;
                                        changeTop(t);
                                    }
                                });
                            })();
                        }else if(index==3){
                            //样式转换运动
                            ;(function(){
                                var oUl=document.getElementById('toBig');
                                var oRBtn=document.getElementById('Retractable');
                                var aLi=oUl.children;
                                var aPos=[];
                                for(var i=0;i<aLi.length;i++){
                                    aPos.push({
                                        left:aLi[i].offsetLeft,
                                        top:aLi[i].offsetTop
                                    });
                                }
                                for(var i=0;i<aLi.length;i++){
                                    aLi[i].style.position='absolute';
                                    aLi[i].style.top=aPos[i].top+'px';
                                    aLi[i].style.left=aPos[i].left+'px';
                                    aLi[i].style.margin=0;
                                }
                                var zIndex=9;
                                var bOk=false;
                                for(var i=0;i<aLi.length;i++){
                                    aLi[i].onmouseover=function(){
                                        if(bOk){return ;}
                                        this.style.zIndex+=zIndex;
                                        move(this,{marginLeft:-30,marginTop:-30,width:150,height:150,opacity:0.5});
                                    };
                                    aLi[i].onmouseout=function(){
                                        if(bOk){return ;}
                                        this.style.zIndex-=zIndex;
                                        move(this,{marginLeft:0,marginTop:0,width:90,height:90,opacity:1});
                                    };
                                }
                                //收吐

                                oRBtn.onclick=function(){
                                    if(bOk){return ;}
                                    bOk=true;
                                    for(var i=0;i<aLi.length;i++){
                                        ;(function(index){
                                            setTimeout(function(){
                                                move(aLi[index],{left:0,top:0,width:0,height:0,opacity:0},{complete:function (){
                                                    if(index==aLi.length-1){
                                                        for(var i=aLi.length-1;i>=0;i--){
                                                            ;(function(index){
                                                                setTimeout(function(){
                                                                    move(aLi[index],{left:aPos[index].left,top:aPos[index].top,width:90,height:90,opacity:1},{complete:function(){
                                                                        if(index==0){
                                                                            bOk=false;
                                                                        }
                                                                    }});
                                                                },(aLi.length-1-i)*100);
                                                            })(i);
                                                        }
                                                    }
                                                }});
                                            },i*100);
                                        })(i);

                                    }
                                };
                            })();
                        }
                    },500);
                };
                aLi[index].onmouseout=function(){
                    clearInterval(timer);
                }
            })(i);
        }
    })();
    //双色球
    ;(function(){
        var oBtn=document.getElementById('btnChange');
        var oBall=document.getElementById('ball');
        var oBallLi=oBall.getElementsByTagName('li');
        var timer=null;
        oBtn.onclick=function(){
            clearTimeout(timer);
            setTimeout(function(){
                clearInterval(timer);
            },1000);
            timer=setInterval(change,30);
        };
        function change(){
            var arr=[];
            for (var i=1;i<34;i++){
                arr.push(i);
            }
            arr.sort(function(n1,n2){
                return Math.random()-0.5;
            });
            for(var i=0;i<oBallLi.length-1;i++){
                oBallLi[i].innerHTML=arr[i];
            }
            oBallLi[oBallLi.length-1].innerHTML=parseInt(Math.random()*16+1);
        }
        setTimeout(function(){
            clearInterval(timer);
        },1000);
        timer=setInterval(change,30);
    })();
    //放大镜
    ;(function(){
        var oSmall=document.getElementById('small');
        var oLayer=document.getElementById('layer1');
        var oBig=document.getElementById('big');
        var oImg=oBig.children[0];
        oSmall.onmouseenter=function(){
            oLayer.style.display='block';
            oBig.style.display='block';
        };
        oSmall.onmouseleave=function(){
            oLayer.style.display='none';
            oBig.style.display='none';
        };
        oSmall.onmousemove=function(ev){
            var oEvent=ev||event;
            var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
            var l=oEvent.clientX-getPos(oSmall).left-oLayer.offsetWidth/2;
            var t=oEvent.clientY+scrollT-getPos(oSmall).top-oLayer.offsetHeight/2;
            if(l<0){
                l=0;
            }else if(l>oSmall.offsetWidth-oLayer.offsetWidth){
                l=oSmall.offsetWidth-oLayer.offsetWidth;
            }
            if(t<0){
                t=0;
            }else if(t>oSmall.offsetHeight-oLayer.offsetHeight){
                t=oSmall.offsetHeight-oLayer.offsetHeight;
            }
            oLayer.style.left=l+'px';
            oLayer.style.top=t+'px';
            //
            oImg.style.left=-l/(oSmall.offsetWidth-oLayer.offsetWidth)*(oImg.offsetWidth-oBig.offsetWidth)+'px';
            oImg.style.top=-t/(oSmall.offsetHeight-oLayer.offsetHeight)*(oImg.offsetHeight-oBig.offsetHeight)+'px';

        }
    })();
    //时钟
    ;(function(){
        var oList=document.getElementById('timeList');
        var oCss=document.getElementById('css');
        var oHours=document.getElementById('hours');
        var oMin=document.getElementById('min');
        var oSec=document.getElementById('sec');
        var aLi;
        var css;
        for(var i=0;i<60;i++){
            aLi=document.createElement('li');
            oList.appendChild(aLi);
            css+='.timeList li:nth-of-type('+(i+1)+'){-webkit-transform:rotate('+i*6+'deg);}';
            css+= '.timeList li:nth-of-type(' + (i + 1) + '){-moz-transform:rotate(' + i * 6 + 'deg);}';
            css+='.timeList li:nth-of-type('+(i+1)+'){-ms-transform:rotate('+i*6+'deg);}';
            css+='.timeList li:nth-of-type('+(i+1)+'){transform:rotate('+i*6+'deg);}';
        }
        oCss.innerHTML+=css;
        toTime();
        setInterval(toTime,1000);
        function toTime(){
            var oDate=new Date();
            var iSec=oDate.getSeconds();
            var iMin=oDate.getMinutes()+iSec/60;
            var iHours=oDate.getHours()+iMin/60;
            oHours.style.webkitTransform='rotate('+iHours*30+'deg)';
            oMin.style.webkitTransform='rotate('+iMin*6+'deg)';
            oSec.style.webkitTransform='rotate('+iSec*6+'deg)';
            oHours.style.mozTransform='rotate('+iHours*30+'deg)';
            oMin.style.mozTransform='rotate('+iMin*6+'deg)';
            oSec.style.mozTransform='rotate('+iSec*6+'deg)';
            oHours.style.msTransform='rotate('+iHours*30+'deg)';
            oMin.style.msTransform='rotate('+iMin*6+'deg)';
            oSec.style.msTransform='rotate('+iSec*6+'deg)';
            oHours.style.transform='rotate('+iHours*30+'deg)';
            oMin.style.transform='rotate('+iMin*6+'deg)';
            oSec.style.transform='rotate('+iSec*6+'deg)';

        };
    })();
     //星星评分 负分
    ;(function(){
        var oScore=document.getElementById('score');
        var oStar=document.getElementById('star');
        var aLi=oStar.getElementsByTagName('li');
        var timer=null;
        for(var i=0;i<aLi.length;i++){
            ;(function(index){
                aLi[index].onmouseover=function(){
                    timer=setInterval(function(){
                        for(var i=0;i<aLi.length;i++){
                            if((i>5&&i>index)||(i<5&&i<index)){
                                aLi[i].className='';
                            }else {
                                aLi[i].className='on';
                                var count=(index+1)-(aLi.length+1)/2;
                                oScore.innerHTML=count;
                            }
                        }
                    },500);
                };
                aLi[index].onmouseout=function(){
                    clearInterval(timer);
                }
            })(i);
        }
    })();
    //星星评分 半颗星
    ;(function(){
        var oScore=document.getElementById('score1');
        var oStar=document.getElementById('half_star');
        var aLi=oStar.getElementsByTagName('li');
        var timer=null;
        for(var i=0;i<aLi.length;i++){
            ;(function(index){
                aLi[i].onmouseover=function(){
                    timer=setInterval(function(){
                        for(var i=0;i<aLi.length;i++){
                            if(i>index){
                                aLi[i].className='';
                            }else{
                                if(i%2){
                                    aLi[i].className='half_right';
                                }else {
                                    aLi[i].className='half_left';
                                }
                                oScore.innerHTML=(index+1)/2;
                            }
                        }
                    },300);
                };
                aLi[i].onmouseout=function(){
                    clearInterval(timer);
                }
            })(i);
        }
    })();
    //星星评分一颗星
    ;(function(){
        var oScore=document.getElementById('score2');
        var oStar=document.getElementById('one_star');
        var aLi=oStar.getElementsByTagName('li');
        var timer=null;
        for(var i=0;i<aLi.length;i++){
            ;(function(index){
                aLi[index].onmouseover=function(){
                    timer=setInterval(function(){
                        for(var i=0;i<aLi.length;i++){
                            if(i>index){
                                aLi[i].className='';
                            }else {
                                aLi[i].className='on';
                                oScore.innerHTML=index+1;
                            }
                        }
                    },500);
                };
                aLi[index].onmouseout=function(){
                    clearInterval(timer);
                }
            })(i);
        }
    })();
    //手风琴
    ;(function(){
        var oUl=document.getElementById('accordion');
        var aLi=oUl.children;
        for(var i=1;i<aLi.length;i++){
            aLi[i].style.left=i*50+'px';
        }
        for(var i=0;i<aLi.length;i++){
            ;(function(index){
                aLi[index].onmouseover=function(){
                     for(var i=0;i<aLi.length;i++){
                         if(i>index){
                             move(aLi[i],{'left':oUl.offsetWidth-(aLi.length-i)*50});
                         }else {
                             move(aLi[i],{'left':i*50});
                         }
                     }
                }
            })(i);
        }

    })();
    //右下角悬浮窗兼容IE6
    ;(function(){
        var toTop=document.getElementById('toTop');
        if(window.navigator.userAgent.indexOf('MSIE 6.0')!=-1) {
            window.onscroll = window.onresize = function () {
                var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
                var clientH = document.documentElement.clientHeight;
                toTop.style.top = scrollT + clientH - toTop.offsetHeight + 'px';
            };
        }
        var bOk=false;
        window.onscroll = window.onresize=function(){
            if(bOk){
                clearInterval(toTop.timer);
            }
            bOk=true;
            var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollT>0){
                toTop.style.display='block';
            }else {
                toTop.style.display='none';
            }

            toTop.onclick=function(){
                var start=document.documentElement.scrollTop||document.body.scrollTop;
                var iTarget=0;
                var dis=iTarget-start;
                var count=Math.floor(1000/30);
                var n=0;
                clearInterval(toTop.timer);
                toTop.timer=setInterval(function(){
                    n++;
                    var a=1- n/count;
                    var cur=start+dis*(1-Math.pow(a,3));
                    bOk=false;
                    document.documentElement.scrollTop=document.body.scrollTop=cur;
                    if(n==count){
                        clearInterval(toTop.timer);
                    }
                },30);


            };
        };
    })();
    //天气预报
    ;(function(){
        var oCity=document.getElementById('city');
        var oCitySpan=document.getElementById('cityS');
        var oBtn=document.getElementById('btn');
        var oWeatherH2=document.getElementById('WeatherH2');
        var oWeatherUl=document.getElementById('WeatherUl');
        oCitySpan.onclick=function(){
            oCitySpan.style.display='none';
            oCity.focus();
        };
        oCity.onfocus=function(){
            oCitySpan.style.display='none';
            oCity.focus();
        };
        oCity.onblur=function(){
            if(this.value==''){
                oCitySpan.style.display='block';
            }
        };
        oBtn.onclick=function(){
            oWeatherUl.innerHTML='';
            jsonp({
                url:'http://api.k780.com:88/',
                data:{
                    app:'weather.city'
                },cbName:'jsoncallback',
                success:function(json){
                    if(json.success){
                        var jsonResult=json.result;
                        var arrCity=[];
                        for(var key in jsonResult){
                            arrCity.push(jsonResult[key].citynm);
                            if(oCity.value==jsonResult[key].citynm){
                                jsonp({
                                    url:'http://api.k780.com:88/',
                                    data:{
                                        app:'weather.future',
                                        weaid:jsonResult[key].cityid,
                                        appkey:'10003',
                                        sign:'b59bc3ef6191eb9f747dd4e83c99f2a4'
                                    },
                                    cbName:'jsoncallback',
                                    success:function(json){
                                        if(json.success){
                                            oWeatherH2.innerHTML=oCity.value;
                                            var arr=json.result;
                                            for(var i=0;i<arr.length;i++){
                                                var oLi=document.createElement('li');
                                                oLi.innerHTML='<div><span class="wData">'+arr[i].days+'</span>'+
                                                    '<span class="temperature">'+arr[i].temperature+'</span>'+
                                                    '<span class="wWeek">'+arr[i].week+'</span></div>'+
                                                    '<div><span class="wWeather">'+arr[i].weather+'</span>'+
                                                    '<img src="'+arr[i].weather_icon+'">'+
                                                    '<img src="'+arr[i].weather_icon1+'">'+
                                                    '<span class="wWind">'+arr[i].wind+'</span>'+
                                                    '<span class="windD">'+arr[i].winp+'</span></div>';
                                                oWeatherUl.appendChild(oLi);
                                            }
                                        }

                                    }
                                });
                            }
                        }
                        if (!findArr(oCity.value,arrCity)){
                            oWeatherH2.innerHTML='';
                            var oLi=document.createElement('li');
                            oLi.className='Linot';
                            oLi.innerHTML='别闹,中国找不到您要找的城市，宝宝委屈。。。';
                            oWeatherUl.appendChild(oLi);
                        }
                    }
                }
            })
        };
        jsonp({
            url:'http://api.k780.com:88/',
            data:{
                app:'weather.future',
                weaid:101010100,
                appkey:'10003',
                sign:'b59bc3ef6191eb9f747dd4e83c99f2a4'
            },
            cbName:'jsoncallback',
            success:function(json){
                if(json.success){
                    oWeatherH2.innerHTML='北京';
                    var arr=json.result;
                    for(var i=0;i<arr.length;i++){
                        var oLi=document.createElement('li');
                        oLi.innerHTML='<div><span class="wData">'+arr[i].days+'</span>'+
                            '<span class="temperature">'+arr[i].temperature+'</span>'+
                            '<span class="wWeek">'+arr[i].week+'</span></div>'+
                            '<div><span class="wWeather">'+arr[i].weather+'</span>'+
                            '<img src="'+arr[i].weather_icon+'">'+
                            '<img src="'+arr[i].weather_icon1+'">'+
                            '<span class="wWind">'+arr[i].wind+'</span>'+
                            '<span class="windD">'+arr[i].winp+'</span></div>';
                        oWeatherUl.appendChild(oLi);
                    }
                }

            }
        });
    })();
});