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


function draw(){
  //將背景圖片畫在canvas上的(0,0)位置
  ctx.drawImage(bgImg,0,0,640,480);
  ctx.drawImage(slimeImg,slime.x,slime.y);
  ctx.drawImage(towerBtn,575,420,55,55);
  if(isBuilding){
  ctx.drawImage(towerImg,cursor.x,cursor.y);
  }
}

//取得滑鼠游標位置
var cursor= {x:0,y:0};
$("#game-canvas").on("mousemove", function(event){
  cursor={
    x:event.offsetX,
    y:event.offsetY
  };
});
//製造城堡
var isBuilding=false;
function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight){
  if(   pointX>=targetX
     && pointX<=targetX+targetWidth
     && pointY>=targetY
     && pointY<=targetY+targetHeight
     ){
    return true;
  }else{
    return false;
  }
}
var tower={};
$("#game-canvas").on("click", function(){
  if(isCollided(cursor.x, cursor.y, 575,420,55,55) ){
    if(isBuilding){
      isBuilding=false;
    }
      else{
        isBuilding=true;
      }else if(isBuilding=true&&()){
  tower.x=cursor.X
  tower.y=cursor.Y
  }
  );
  }
});


//執行draw函式
//draw();
//等待一秒再執行 draw
//等待1秒再執行
//setTimeout(draw, 1000);
//1000毫秒=1秒
//每16毫秒執行一次
setInterval(draw, 16);

