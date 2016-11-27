//塔
//地圖
//money
//hw
var canvas= document.getElementById("game-canvas");
var ctx= canvas.getContext("2d");
var FPS=50;
var clock =0;
var time=prompt("Time?");
var enemies = [];
var towers =[];
ctx.font="24px Segoe Print";
ctx.fillStyle ="white";
var treeHp=100;
var score=0;
var money=50;

var bgImg= document.createElement("img");
bgImg.src= "images/map.2.png";
var slimeImg= document.createElement("img");
slimeImg.src= "images/amy.png";
var towerBtn= document.createElement("img");
towerBtn.src="images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src= "images/tower.png";
var aimImg= document.createElement("img");
aimImg.src= "images/crosshair.png";
 
//敵人的移動
//路徑點偵測區
//new為關鍵字
//以funcion 表示類別 x:32, ==> this.x=32;
//時間
//hp值

function Enemy(){
  this.hp=5;
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
     //判斷是否到達生命樹
     if(this.pathDes ===enemyPath.length-1){
      this.hp=0;
      treeHp-=10;
     }else{
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
  }
};




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
//當isBuilding=true 塔的圖片顯示在游標上
$("#game-canvas").on("click", function(){
  if(isCollided(cursor.x, cursor.y, 575,420,55,55) ){
    if(isBuilding){
      isBuilding=false;
  }
      else{
        isBuilding=true;
  }
  }
  else if(isBuilding&&money>=30){
  towers.push(new Tower(Tower.x=cursor.x-cursor.x%32,Tower.y=cursor.y-32-(cursor.y-32)%32));
  
  money-=30;
  isBuilding=false;
  }
});
//瞄準敵人
function Tower(x,y){
 this.x=x;
 this.y=y;
 this.range=96;
 this.aimingEnemyId=null;
 this.fireRate=1;//一秒發射一次
 this.readyToShootTime=1;//還有幾秒就發射
 this.damage=2;
 this.searchEnemy=function(){
 this.readyToShootTime-=1/FPS //減少距離下個射擊距離的冷卻時間==>一秒刷新FPS=50次  每次-1/50秒
 for(var i=0; i<enemies.length; i++){
 var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
 if(distance<this.range){
   this.aimingEnemyId= i;
  //判斷是否倒數完畢
  if( this.readyToShootTime<=0){
   this.shoot(i);//將i變id
   this.readyToShootTime=this.fireRate;
   
  }
   return;//結束迴圈
 }
}  
  this.aimingEnemyId= null;
 },//一定要加,
 //發射砲彈
 this.shoot=function(id){ //將攻擊對象的id傳入
//畫線
ctx.beginPath();//開始畫線
ctx.moveTo(this.x,this.y);//先將畫筆移動到(x1,y1)
ctx.lineTo(enemies[id].x,enemies[id].y);//畫一條直線到(x2,y2)
ctx.strokeStyle="red";//設定線條顏色
ctx.lineWidth=3;//設定線條寬度
ctx.stroke();//上色
//扣血
enemies[id].hp=enemies[id].hp-this.damage;
}
};







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
function draw(){
  //將背景圖片畫在canvas上的(0,0)位置
 ctx.drawImage(bgImg,0,0,640,480);  
 //印出文字
 ctx.fillText("hp="+treeHp,20,28);
 ctx.fillText("score="+score,20,60);
 ctx.fillText("money="+money,20,92);
 if(clock%(time*1)==0){
    var newEnemy= new Enemy();
    enemies.push(newEnemy);
  }
  
  for(var i=0; i<enemies.length; i++){
   //enemies刪除~自爆
   if(enemies[i].hp<=0){
    enemies.splice(i,1);
    score+=10;
    money+=10;
   }
   //enemies[i]正在操作的敵人
    enemies[i].move();
    ctx.drawImage(slimeImg,enemies[i].x,enemies[i].y);
  }
  clock++;
  ctx.drawImage(towerBtn,575,420,55,55);
  if(isBuilding){
  ctx.drawImage(towerImg,cursor.x,cursor.y-32);
  }
  //瞄準敵人+塔工廠
  for(var i=0; i<towers.length; i++){
  ctx.drawImage(towerImg,towers[i].x,towers[i].y); 
  towers[i].searchEnemy();
  if(towers[i].aimingEnemyId!=null){
  var id=towers[i].aimingEnemyId;
  ctx.drawImage(aimImg, enemies[id].x, enemies[id].y); 
 }
 }
}

//執行draw函式
//draw();
//等待一秒再執行 draw
//等待1秒再執行
//setTimeout(draw, 1000);
//1000毫秒=1秒
//每16毫秒執行一次
setInterval(draw, 1000/FPS);

