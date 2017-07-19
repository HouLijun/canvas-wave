window.onload=function () {
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');

        //画布属性
        var cw = canvas.width ;
        var ch = canvas.height ;
        //圆属性
        var radius=150;

        //圆
        function circle(r) {
            ctx.save();
            ctx.translate(cw/2,ch/2);
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth=5;
            //外圆
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            //内圆
            ctx.beginPath();
            ctx.arc(0, 0, r-10, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.restore();
            ctx.clip();
        }

        //Sin 曲线属性
        var sinParam1={
            sinX : -radius,               //起始点x
            sinY:0,                       //y轴偏移量
            axisLength : 2*radius,       //轴长
            palstance : 0.015 ,     //波浪宽度,数越小越宽(角速度)
            amplitude :10,         //波浪高度,数越大越高(振幅)
            speed :0.06,            //波浪速度，数越大速度越快
            xOffset: 0              //波浪x偏移量（初相）
        }
        var sinParam2={
            sinX : -radius,                 //起始点x
            sinY:3,                         //y轴偏移量
            axisLength : 2*radius,        //轴长
            palstance : 0.01 ,     //波浪宽度,数越小越宽(角速度)
            amplitude :10,         //波浪高度,数越大越高(振幅)
            speed :0.06,            //波浪速度，数越大速度越快
            xOffset: 10              //波浪x偏移量（初相）
        }



        //绘制sin曲线
        function drawSin(sinParam,color){
            ctx.save();
            //原点移到中心点
            ctx.translate(cw/2,ch/2);
            ctx.beginPath();
            //在整个轴长上取点
            for(var x = sinParam.sinX; x < sinParam.sinX + sinParam.axisLength; x++){
                //y=振幅*sin(x*角速度 + 振幅偏移量)+y轴偏移量         
                var y=sinParam.amplitude*Math.sin(x*sinParam.palstance+sinParam.xOffset)+sinParam.sinY;                    

                ctx.lineTo(x, y);
            }

            //封闭路径
            ctx.lineTo(radius, radius);
            ctx.lineTo(sinParam.sinX, radius);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        };
        //绘制动画
        var t;
        function draw() {
            clearTimeout(t);
            ctx.clearRect(0, 0, cw, ch);
            circle(radius);
            drawSin(sinParam1,"#96b4d3");
            drawSin(sinParam2,"rgba(94,150,202,0.8)");
            sinParam1.xOffset -= sinParam1.speed;
            sinParam2.xOffset -= sinParam2.speed;
            t=setTimeout(function () {
                draw();
            },20);
        }
        draw();
    }else {
        alert("您的浏览器不支持canvas");
    }
}
