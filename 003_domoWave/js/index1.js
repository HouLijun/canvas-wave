var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//range波浪的高度
var nowRange = 50;   //用于做一个临时的range

//画布属性
var mW = canvas.width ;
var mH = canvas.height ;
var lineWidth = 2;

//圆属性
var r = mH / 2; //圆心
var cR = r - 16 * lineWidth; //圆半径

//Sin 曲线属性
var sX = 0;
var sY = mH / 2;
var axisLength = mW; //轴长
var waveWidth = 0.015 ;   //波浪宽度,数越小越宽
var waveHeight = 6; //波浪高度,数越大越高
var speed = 0.09; //波浪速度，数越大速度越快
var xOffset = 0; //波浪x偏移量

ctx.lineWidth = lineWidth;

//画圈函数
var drawCircle = function(){

    ctx.beginPath();
    ctx.strokeStyle = '#1080d0';
    ctx.arc(r, r, cR+5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    ctx.clip();

}

//画sin 曲线函数
var drawSin = function(xOffset){
    ctx.save();

    var points=[];  //用于存放绘制Sin曲线的点

    ctx.beginPath();
    //在整个轴长上取点
    for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
        var y = -Math.sin((sX + x) * waveWidth + xOffset);

        var dY = mH * (1 - nowRange / 100 );

        points.push([x, dY + y * waveHeight]);
        ctx.lineTo(x, dY + y * waveHeight);
    }

    //封闭路径
    ctx.lineTo(axisLength, mH);
    ctx.lineTo(sX, mH);
    ctx.lineTo(points[0][0],points[0][1]);
    ctx.fillStyle = '#1c86d1';
    ctx.fill();

    ctx.restore();
};

var render = function(){
    ctx.clearRect(0, 0, mW, mH);
    drawCircle();

    drawSin(xOffset);

    xOffset += speed;
    requestAnimationFrame(render);
}

render();