window.onload=function () {
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');

        //画布属性
        var cw = canvas.width ;
        var ch = canvas.height ;

        //Sin 曲线属性
        var sinParam1={
            nowRange:52, //波浪的高度
            sinX : 0,
            axisLength : cw,        //轴长
            waveWidth : 0.015 ,   //波浪宽度,数越小越宽(角速度)
            waveHeight :10, //波浪高度,数越大越高
            speed :0.06, //波浪速度，数越大速度越快
            xOffset: 0 //波浪x偏移量


        }

        //绘制sin曲线
        function drawSin(sinParam,color){
            ctx.save();
            var points=[];  //用于存放绘制Sin曲线的点

            ctx.beginPath();
            //在整个轴长上取点
            for(var x = sinParam.x; x < sinParam.sinX + sinParam.axisLength; x += 20 / sinParam.axisLength){
                //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                var y = -Math.sin((sinParam.sinX + x) * sinParam.waveWidth + sinParam.xOffset);

                var dY = ch * (1 - sinParam.nowRange / 100 );

                points.push([x, dY + y * sinParam.waveHeight]);
                ctx.lineTo(x, dY + y * sinParam.waveHeight);
            }

            //封闭路径
            ctx.lineTo(sinParam.axisLength, ch);
            ctx.lineTo(sinParam.sinX, ch);
            ctx.lineTo(points[0][0],points[0][1]);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        };
        drawSin();
    }else {
        alert("您的浏览器不支持canvas");
    }
}