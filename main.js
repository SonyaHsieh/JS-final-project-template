var bgImg= document.createElement("img");
bgImg.src= "images/map.png";
var canvas = document.getElementByld("game-canvas");
var ctx= canvas.getContext("2d");
function draw(){
  //將背景圖片畫在canvas上的(0,0)位置
  ctx.drawImage(bgImg,0,0);
}

//執行draw函式
draw();
