var canvas= document.getElementById("game-canvas");
var ctx= canvas.getContext("2d");

var bgImg= document.createElement("img");
bgImg.src= "images/map.png";
var slimeImg= document.createElement("img");
slimeImg.src= "images/slime.gif";
var towerBtn= document.createElement("img");
towerBtn.src="images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src= "images/tower.png";

var slime={
  x:96,
  y:480-32,
};
var btn={
  x:480,
  y:1,
};

function draw(){
  //將背景圖片畫在canvas上的(0,0)位置
  ctx.drawImage(bgImg,0,0,640,480);
  ctx.drawImage(slimeImg,slime.x,slime.y);
  ctx.drawImage(towerBtn,btn.x,btn.y,40,40);
  ctx.drawImage(towerImg,cursor.x,cursor.y);
}

//取得滑鼠游標位置
var cursor= {x:0, y:0};
$("#game-canvas").on("mousemove", function(event){
  cursor={
    x:event.offsetX,
    y:event.offsetY
  };
});


//執行draw函式
//draw();
//等待一秒再執行 draw
//等待1秒再執行
//setTimeout(draw, 1000);
//1000毫秒=1秒
//每16毫秒執行一次
setInterval(draw, 16);

