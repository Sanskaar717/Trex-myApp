var trex,trexRun,ground,groundI,ground2,cloud,cloudI;
var x=0,ob,obI1,obI2,obI3,obI4,obI5,obI6,cloudG,obG;
var play=5,end=7, gameState=play,trex_Collide,gameOver,gameOverI;
var restart,restartI,hs = 0;
var checkpoint, die, jump;

function preload(){
  trexRun = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_Collide = loadAnimation("trex_collided.png");
  groundI = loadImage("ground2.png");
  cloudI = loadImage("cloud.png");
  obI1 = loadImage("obstacle1.png");
  obI2 = loadImage("obstacle2.png");
  obI3 = loadImage("obstacle3.png");
  obI4 = loadImage("obstacle4.png");
  obI5 = loadImage("obstacle5.png");
  obI6 = loadImage("obstacle6.png");
  gameOverI = loadImage("gameOver.png");
  restartI = loadImage("restart.png");
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(50,height-50,5,5);
  trex.addAnimation("run",trexRun);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("circle",0,0,50);
  trex.addAnimation("collide",trex_Collide);
  
  ground = createSprite(width/2,height-50,width,10);
  ground.addImage(groundI);
  
  ground2 = createSprite(width/2,height-35,width,10);
  ground2.visible = false;
  
  cloudG = new Group();
  obG  = new Group(); 
  
  gameOver = createSprite(width/2,height/2.5,5,5);
  gameOver.addImage(gameOverI);
  gameOver.scale = 0.7;
  gameOver.visible = false;
  
  restart = createSprite(width/2,height/2,5,5);
  restart.addImage(restartI);
  restart.scale = 0.4; 
  restart.visible = false;
}

function draw(){
  
  background("black");
  fill("white");
  text("HIGH SCORE="+hs,370,50);
  if( x > hs){
    hs = x;
  }
  else{
    hs = hs;
  }
  
  if(gameState===play){
  x = x + Math.round(getFrameRate()/60);
  
  ground.velocityX = -(5+x/100);  
    
  if(ground.x < 0){
    ground.x = ground.width/2;
    
  }
    
  if(x%100===0 && x > 0){
    checkpoint.play();
  }
  console.log(trex.y);
  if((touches.length>0||keyDown("space")) && trex.y > height-70){
    trex.velocityY = -13;
    jump.play();
    touches = [];
  }
    
    trex.velocityY = trex.velocityY +0.8;  
      trex.collide(ground2);

  spawnClouds();
  spawnObstacles();

    if(trex.isTouching(obG)){
      gameState=end;
      //trex.velocityY = -10;
      die.play();
    }
      
  }
  
  if(gameState===end){
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("collide",trex_Collide);
    obG.setVelocityXEach(0);
    cloudG.setVelocityXEach(0);
    obG.setLifetimeEach(-1);
    cloudG.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)||touches.length>0){
       reset();
      touches = [];
    }
  }
  
  text("SCORE="+x,500,50);

  drawSprites();
}

function reset(){
  gameState = play;
  x = 0;
  trex.changeAnimation("run",trexRun);
  gameOver.visible = false;
  restart.visible = false;
  obG.destroyEach();
  cloudG.destroyEach();

}

function spawnClouds() {
  if(frameCount%70===0){
    var a=Math.round(random(20,height/2));
    
  cloud = createSprite(590,a,5,5);
  cloud.addImage(cloudI);
  cloud.scale = 0.5;
  
  cloud.velocityX = -4;
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;
    
  cloud.lifetime = width/2; 
  cloudG.add(cloud);  
  }

}

function spawnObstacles(){
  if(frameCount%50===0){
    
    ob = createSprite(width,height-70,5,5);
    
    ob.velocityX = -(5+x/100);
    
    
    var o=Math.round(random(1,6));
    
    switch(o){
      case 1:ob.addImage(obI1);
        break;
      case 2:ob.addImage(obI2);
        break;
      case 3:ob.addImage(obI3);
        break;
      case 4:ob.addImage(obI4);
        break;
      case 5:ob.addImage(obI5);
        break;
      case 6:ob.addImage(obI6);
        break;
        default:break;
    }
     ob.scale = 0.5;
    
    ob.lifetime = width/2;
    obG.add(ob);
  }
}
