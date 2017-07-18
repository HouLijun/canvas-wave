window.onload=function () {
    var canvas=document.getElementsByClassName("J_canvas")[0];
    function rendomInt(lowValue,upValue) {
        var cha=upValue-lowValue+1;
        return Math.floor(Math.random()*cha+lowValue);
    }
   if(canvas.getContext){
        var ctx=canvas.getContext("2d");
       ctx.save();
       ctx.translate(250,250);
       function waveLighten(param) {
           ctx.strokeStyle="#fff";
           ctx.beginPath();
           ctx.moveTo(param.startX,param.startY);
           ctx.quadraticCurveTo(param.cpX,param.cpY,param.endX,param.endY);
           ctx.stroke();
           ctx.closePath();
       }
       //计算坐标
        function computed(param,direction) {
            var x=Math.abs(param.endX-param.cpX);
            var y=Math.abs(param.cpY-param.endY);
            var ratio=x/y;

            var startX=param.endX;
            var startY=param.endY;
            var endX=startX+rendomInt(80,100);
            var endY=rendomInt(10,30)*direction;
            var cpX=rendomInt(startX+20,endX-20);//+-20为了防止控制点离起始点太近
            var cpY=Math.floor(Math.abs(startX-cpX)/ratio*direction+startY);//正为朝上，负为朝下

            return {
                startX: startX,
                startY: startY,
                endX:endX,
                endY:endY,
                cpX:cpX,
                cpY:cpY
            }
        }
       var initParam={
           startX:-150,
           startY:-30,
           endX:-100,
           endY:10,
           cpX:-130,
           cpY:0
       };

       function draw(param) {
           waveLighten(param);
           var direction=-1;
/*           setInterval(function () {
               direction*=-1;
               param=computed(param,direction);
               waveLighten(param);
           });*/
       }
       draw(initParam);
       ctx.restore();
     }else{
        alert("不支持canvas");
     }
}