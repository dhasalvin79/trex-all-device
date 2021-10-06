var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gamestate="play";
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(width/12,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/3,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  trex.setCollider("circle",0,0,40);
 // trex.debug=true;
  invisibleGround = createSprite(width/3,height-10,width,10);
  invisibleGround.visible = false;
  
  console.log("Hello" + 5);
  
  obstaclesGroup=createGroup();
  cloudsGroup=createGroup();
  score = 0;
}

function draw() {
                              background(180);
                              textSize(40);
                              text("Score: "+ score, width/2,height/2);

  if(gamestate=="play"){
                              score = score + Math.round(frameCount/60)  
              if((touches.length>0||keyDown("space"))&& trex.y >= 160) {
                              trex.velocityY = -13;
                              touches=[]
                              
              }
              if(obstaclesGroup.isTouching(trex)){
                              gamestate="end";
              }
              if (ground.x < 0){
                              ground.x = ground.width/2;
              }
                              spawnClouds();
                              spawnObstacles();
  }
  if(gamestate=="end"){
                              obstaclesGroup.setVelocityXEach(0)
                              cloudsGroup.setVelocityXEach(0);
                              obstaclesGroup.setLifetimeEach(50);
                              ground.velocityX=0;
  }
  if(gamestate=="restart"){
    
  }
 
                               trex.velocityY = trex.velocityY + 0.8
                               trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width+20,height-35,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);

 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width/3,height/2,40,10);
    cloud.y = Math.round(random(200/20,200/20+60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}