/**
 * Created by 赵雪青 on 2016/8/20.
 */
function drag(oDiv){
    var x=0;
    var y=0;
    oDiv.addEventListener('touchstart', function(ev){
        var disX=ev.targetTouches[0].pageX-x;
        var disY=ev.targetTouches[0].pageY-y;

        // 当前手指的ID
        var id=ev.targetTouches[0].identifier;
        function fnMove(ev){
            // 判断是否是这根手指
            if(ev.targetTouches[0].identifier==id){
                x=ev.targetTouches[0].pageX-disX;
                y=ev.targetTouches[0].pageY-disY;
                oDiv.style.WebkitTransform='translate('+x+'px,'+y+'px)';
            }
        }
        function fnEnd(ev){
            if(ev.changedTouches[0].identifier==id){
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            }

        }
        document.addEventListener('touchmove', fnMove, false);
        document.addEventListener('touchend', fnEnd, false);

        ev.preventDefault();
    }, false);
}
 DOMReady(function(){
     var oWishBtn=document.getElementById('wishBtn');
     var oLayer=document.getElementById('layer');
     var oSendForm=document.getElementById('send-form');
     var oClose=document.getElementById('close');
     var oSendBtn=document.getElementById('send-btn');
     var oContent=document.getElementById('content');
     var oUsername=document.getElementById('username');
     var oWishMain=document.getElementById('wishMain');
     var oPhiz=document.getElementById('phiz');
     var aImg=oPhiz.getElementsByTagName('img');
     var URL='wish.php';
     var zIndex=9;
     oWishBtn.onclick=function(){
         oLayer.style.display='block';
         oSendForm.style.display='block';
     };
     oClose.onclick=function(){
         oLayer.style.display='none';
         oSendForm.style.display='none';
     };
     oSendBtn.onclick=function(){
         if(oUsername.value==''||oContent.value==''){
             alert('请您先输入昵称和心愿吧！');
             return;
         }
         oLayer.style.display='none';
         oSendForm.style.display='none';
         ajax({
             url:URL,
             data:{
                 act:'add',
                 username:oUsername.value,
                 content:oContent.value
             },
             success:function(str){
                 var json=eval('('+str+')');
                 if(!json.error){
                     getAll();
                 }else {
                     alert('添加心愿失败！');
                 }
             }
         });

         //wish.php?act=add&username=xxx&content=xxx
         oUsername.value='';
         oContent.value='';
     };
     //创建心愿
     function createWish(Username,Content,time,id){
         var oDate=new Date();
         oDate.setTime(time*1000);
         var t=oDate.getFullYear()+'-'+toDouble(oDate.getMonth())+'-'+toDouble(oDate.getDate())+' '+toDouble(oDate.getHours())+':'+toDouble(oDate.getMinutes())+':'+toDouble(oDate.getSeconds());
         var oDiv=document.createElement('div');
         oDiv.className='wishContent';
         oDiv.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
         oDiv.style.opacity=0.7;
         oDiv.style.filter='alpha(opacity=70)';
         for(var i=0;i<aImg.length;i++){
             aImg[i].onclick=function(){
                 oContent.value+='['+this.alt+']';
             };
         }
         //替换表情
         var arr1=['[抓狂]','[抱抱]','[害羞]','[酷]','[嘻嘻]','[太开心]','[偷笑]','[钱]','[花心]','[挤眼]'];
         var arr2=['zhuakuang','baobao','haixiu','ku','xixi','taikaixin','touxiao','qian','huaxin','jiyan'];
         for(var i=0;i<arr1.length;i++){
             if(Content.indexOf(arr1[i])!=-1){
                 Content=Content.replace(arr1[i],' <img src="./img/phiz/'+arr2[i]+'.gif">');
                 i--;
             }
         }
         oDiv.innerHTML='<div class="wishH"><span>昵称：'+Username+'</span><b>No:'+id+'</b></div>'+
             '<div class="wishXXX">'+
             '<div class="wishL'+(id%5+1)+'"></div>'+
             '<div class="wishR">'+Content+'</div>'+
             '</div>'+
             '<div class="wishTime">'+t+'</div>'+
             '<div class="wishClose" id="wishClose"></div>';
         rndPosition(oDiv);
         var oWishClose=oDiv.getElementsByTagName('div')[5];
         //	wish.php?act=delete&id=0;
         //删除心愿
         oWishClose.onclick=function(){
             var sure= confirm('你确定要删除吗？');
             if(sure) {
                 ajax({
                     url: URL,
                     data: {
                         act: 'delete',
                         id: id
                     },
                     success: function (str) {
                         var json = eval('(' + str + ')');
                         if (!json.error) {
                             alert('删除心愿成功！！');
                             getAll();
                         } else {
                             alert('删除心愿失败！！');
                         }
                     }
                 });
             }
         };
         if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
             drag(oDiv);
         }
         else {
             oDiv.onmousedown=function(ev){
                 zIndex++;
                 this.style.zIndex=zIndex;
                 var oEvent=ev||event;
                 var disX=oEvent.clientX-oDiv.offsetLeft;
                 var disY=oEvent.clientY-oDiv.offsetTop;
                 document.onmousemove=function(ev){
                     var oEvent=ev||event;
                     var l=oEvent.clientX-disX;
                     var t=oEvent.clientY-disY;
                     if(l<0){
                         l=0;
                     }else if(l>document.documentElement.clientWidth-oDiv.offsetWidth){
                         l=document.documentElement.clientWidth-oDiv.offsetWidth;
                     }
                     if(t<0){
                         t=0;
                     }else if(t>document.documentElement.clientHeight-oDiv.offsetHeight-130){
                         t=document.documentElement.clientHeight-oDiv.offsetHeight-130;
                     }
                     oDiv.style.left=l+'px';
                     oDiv.style.top=t+'px';
                 };
                 document.onmouseup=function(){
                     document.onmousemove=null;
                     document.onmouseup=null;

                     oDiv.releaseCapture&&oDiv.releaseCapture();
                 };
                 oDiv.setCapture&&oDiv.setCapture();
                 return false;
             };
             }
         return oDiv;
     }
     //	wish.php?act=get
     getAll();
     //获取所有心愿
     function getAll(){
         oWishMain.innerHTML='';
         ajax({
             url:URL,
             data:{
                 act:'get'
             },
             success:function(str){
                 var json=eval('('+str+')');
                 if(!json.error){
                     var arr=json.msg;
                     for(var i=0;i<arr.length;i++){
                         var oDiv=createWish(arr[i].username,arr[i].content,arr[i].time,arr[i].id);
                         oWishMain.appendChild(oDiv);
                     }
                 }
             }
         });
     }
     function rndPosition(obj){
         obj.style.left=parseInt(Math.random()*(document.documentElement.clientWidth-252))+'px';
         obj.style.top=Math.round(Math.random()*(document.documentElement.clientHeight-130-252))+'px';
     }
 });