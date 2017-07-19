window.onload=function () {
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');

        //画布属性
        var cw = canvas.width ;
        var ch = canvas.height ;

        //Sin 曲线属性
        var sinParam1={
            range:0.52, //波浪的高度(占画布高的百分比，用来计算y轴位移)
            sinX : 0,   //x
            axisLength : cw,        //轴长
            palstance : 0.015 ,     //波浪宽度,数越小越宽(角速度)
            amplitude :10,         //波浪高度,数越大越高(振幅)
            speed :0.06,            //波浪速度，数越大速度越快
            xOffset: 0              //波浪x偏移量（初相）
        }

        //绘制sin曲线
        function drawSin(sinParam,color){
            ctx.save();
            var points=[];  //用于存放绘制Sin曲线的点

            ctx.beginPath();
            //在整个轴长上取点
            for(var x = sinParam.sinX; x < sinParam.sinX + sinParam.axisLength; x += 20 / sinParam.axisLength){
                //y=振幅*sin(x*角速度 + 振幅偏移量)+y轴偏移量
                var y=sinParam.amplitude*Math.sin(x*sinParam.palstance+sinParam.xOffset)+ch * sinParam.range;
                points.push([x, y]);
                ctx.lineTo(x, y);
            }

            //封闭路径
            ctx.lineTo(sinParam.axisLength, ch);
            ctx.lineTo(sinParam.sinX, ch);
            ctx.lineTo(points[0][0],points[0][1]);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        };

        function draw() {
            ctx.clearRect(0,0,cw,ch);
            drawSin(sinParam1,"#fff");
            sinParam1.xOffset+=sinParam1.speed;
            requestAnimationFrame(draw);
        }
        draw();
    }else {
        alert("您的浏览器不支持canvas");
    }
}
