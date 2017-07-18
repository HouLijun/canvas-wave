window.onload=function () {
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');

        //画布属性
        var cw = canvas.width ;
        var ch = canvas.height ;

        //圆
        function outsideCircle(r) {
            ctx.save();
            ctx.translate(cw/2,ch/2);
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth=5;
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(0, 0, r-10, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.restore();
            ctx.clip();
        }

        //Sin 曲线属性
        var sinParam1={
            nowRange:52, //波浪的高度
            sinX : 0,
            sinY : ch / 2,
            axisLength : cw, //轴长
            waveWidth : 0.015 ,   //波浪宽度,数越小越宽
            waveHeight :10, //波浪高度,数越大越高
            speed :0.06, //波浪速度，数越大速度越快
            xOffset: 0 //波浪x偏移量
        }

        var sinParam2={
            nowRange:51.9,
            sinX :50,
            sinY : ch / 2,
            axisLength : cw, //轴长
            waveWidth : 0.011 ,   //波浪宽度,数越小越宽
            waveHeight :10, //波浪高度,数越大越高
            speed :0.06, //波浪速度，数越大速度越快
            xOffset: 3 //波浪x偏移量
        }



        //绘制sin曲线
        function drawSin(sinParam,color){
            ctx.save();

            var points=[];  //用于存放绘制Sin曲线的点

            ctx.beginPath();
            //在整个轴长上取点
            for(var x = sinParam.sinX; x < sinParam.sinX + sinParam.axisLength; x += 20 / sinParam.axisLength){
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
        //动画
        function draw() {
            ctx.clearRect(0, 0, cw, ch);
            outsideCircle(150);
            drawSin(sinParam1,"#96b4d3");
            drawSin(sinParam2,"rgba(94,150,202,0.8)");
            sinParam1.xOffset += sinParam1.speed;
            sinParam2.xOffset += sinParam2.speed;
            requestAnimationFrame(draw);
        }
        draw();
    }else {
        alert("您的浏览器不支持canvas");
    }
}