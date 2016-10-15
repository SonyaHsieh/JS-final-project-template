var canvas= document.getElementByld("game-canvas");
var ctx= canvas.getContext("2d");
var bgImg= document.createElement("img");
bgImg.src= "images/map.png";

function draw(){
  //將背景圖片畫在canvas上的(0,0)位置
  ctx.drawImage(bgImg,0,0);
}

//執行draw函式
//draw();
//等待一秒再執行 draw
//等待1秒再執行
//setTimeout(draw, 1000);
//1000毫秒=1秒
//每16毫秒執行一次
setInterval(draw, 150);
