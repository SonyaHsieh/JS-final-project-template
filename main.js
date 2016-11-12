var canvas= document.getElementById("game-canvas");
var ctx= canvas.getContext("2d");
var FPS=50;
var clock =0;
var time=prompt("Time?");
var enemies = [];

var bgImg= document.createElement("img");
bgImg.src= "images/map.2.png";
var slimeImg= document.createElement("img");
slimeImg.src= "images/daigh.gif";
var towerBtn= document.createElement("img");
towerBtn.src="images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src= "images/tower.png";
 
//敵人的移動
//路徑點偵測區
//new為關鍵字
//以funcion 表示類別 x:32, ==> this.x=32;
//時間

function Enemy(){
  this.x=32;
  this.y=448;
  this.speedx=0;  //每秒移動多少pixel
  this.speedy=-64;
  this.speed=64;
  this.pathDes=0;
  this.move=function(){
    this.x=this.x+this.speedx/FPS;
    this.y=this.y+this.speedy/FPS;
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, 
                  this.x, this.y, this.speed/FPS, this.speed/FPS)){
      // 修正位置到目標路徑點
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
      // 指定下一個路徑點為目標路徑點
      this.pathDes++;
      // 重新設定前往目標路徑點的所需的水平/垂直速度
      if (this.x>enemyPath[this.pathDes].x){
        this.speedx=-64;
        this.speedy=0;
      }else if(this.x<enemyPath[this.pathDes].x){
        this.speedx=64;
        this.speedy=0;
      }else if(this.y>enemyPath[this.pathDes].y){
        this.speedx=0;
        this.speedy=-64;
      }else if(this.y<enemyPath[this.pathDes].y){
        this.speedx=0;
        this.speedy=64;
      }
     
  }}
};


function draw(){
  //將背景圖片畫在canvas上的(0,0)位置
 ctx.drawImage(bgImg,0,0,640,480);  
 if(clock%(time*1)==0){
    var newEnemy= new Enemy();
    enemies.push(newEnemy);
  }
  for(var i=0; i<enemies.length; i++){
    //enemies[i]正在操作的敵人
    enemies[i].move();
    ctx.drawImage(slimeImg,enemies[i].x,enemies[i].y);
  }
  clock++;
  ctx.drawImage(towerBtn,575,420,55,55);
  if(isBuilding){
  ctx.drawImage(towerImg,cursor.x,cursor.y);
  }
  ctx.drawImage(towerImg,tower.x,tower.y);
}

//取得滑鼠游標位置
var cursor= {x:0,y:0};
$("#game-canvas").on("mousemove", function(event){
  cursor={
    x:event.offsetX,
    y:event.offsetY
  };
});
//製造城堡&畫塔
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
  }
  }
  else if(isBuilding){
  tower.x=cursor.x-cursor.x%32;
  tower.y=cursor.y-cursor.y%32;
  isBuilding=false;
  }
});




//路徑
//console enemy.x=448
var enemyPath =[
  {x:32,y:448},
  {x:32,y:32},
  {x:256,y:32},
  {x:256,y:320},
  {x:448,y:320},
  {x:448,y:224},
  {x:576,y:224},
  {x:576,y:96},
  {x:576,y:96},
  {x:608,y:96},
];


//執行draw函式
//draw();
//等待一秒再執行 draw
//等待1秒再執行
//setTimeout(draw, 1000);
//1000毫秒=1秒
//每16毫秒執行一次
setInterval(draw, 1000/FPS);

