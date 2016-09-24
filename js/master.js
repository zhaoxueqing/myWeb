/**
 * Created by 赵雪青 on 2016/9/4.
 */
function through(obj){
    function hoverDir(obj,ev){
        var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
        var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;
        return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
    }
    obj.onmouseover=function(ev){
        var oEvent=ev||event;
        var oS=obj.children[0];
        var oFrom=oEvent.fromElement||oEvent.relatedTarget;
        if(obj.contains(oFrom)){
            return;
        }
        var dir=hoverDir(obj,oEvent);
        switch (dir){
            case 0:
                oS.style.left='200px';
                oS.style.top='0px';
                break;
            case 1:
                oS.style.left='0px';
                oS.style.top='200px';
                break;
            case 2:
                oS.style.left='-200px';
                oS.style.top='-0px';
                break;
            case 3:
                oS.style.left='0px';
                oS.style.top='-200px';
                break;
        }
        move(oS,{left:0,top:0});
    };
    obj.onmouseout=function(ev){
        var oEvent=ev||event;
        var oS=obj.children[0];
        var oTo=oEvent.toElement||oEvent.relatedTarget;
        if(obj.contains(oTo)){
            return;
        }
        var dir=hoverDir(obj,oEvent);
        switch (dir){
            case 0:
                move(oS,{left:200,top:0});
                break;
            case 1:
                move(oS,{left:0,top:200});
                break;
            case 2:
                move(oS,{left:-200,top:0});
                break;
            case 3:
                move(oS,{left:0,top:-200});
                break;
        }
    };
}
DOMReady(function(){
    var masterBox=document.getElementById('masterBox');
    var aLi=masterBox.children;
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.6)';
        through(aLi[i]);
    }
});