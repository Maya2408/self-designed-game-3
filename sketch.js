
var airoplane, plane, dragon1, dragon1Img, dragon2, dragon2Img;
var lightning, lightningImg;
var sky;
var enemyGroup;
var dragon;
var restart, restartImg;
var explosion, explosionImg;

var PLAY = 1;
var END = 0;
var gameState =PLAY;

function preload(){
    plane = loadImage("airoplane.png");
    dragon1Img = loadImage("flying dragon.png");
    dragon2Img = loadImage("flying dragon 2.png");
    lightningImg = loadImage("lightning.png");
    sky = loadImage("skyBackground.jpg");
    restartImg = loadImage("restart.png");
    explosionImg = loadImage("explosion.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  airoplane = createSprite(windowWidth-150, 500);
  airoplane.addImage(plane);
  airoplane.scale=0.5;
  //airoplane.debug = true;

   restart = createSprite(700, 350);
   restart.addImage(restartImg);

  score = 0;

  enemyGroup = new Group();

}


function draw(){
    background(sky);

     if(gameState === PLAY){

      restart.visible = false;
      airoplane.visible = true;

      if(keyDown(UP_ARROW)){
        airoplane.y -= 4;
      }
  
      if(keyDown(DOWN_ARROW)){
        airoplane.y += 4;
      }
  
      if(keyDown(RIGHT_ARROW)){
        airoplane.x += 4;
      }
  
      if(keyDown(LEFT_ARROW)){
        airoplane.x -= 4;
      }

      enemy();
      points();

       if(enemyGroup.isTouching(airoplane)){
        gameState = END;
        airoplane.addImage(explosionImg);
      }
     }
       else if(gameState === END){
         enemyGroup.destroyEach();
         //airoplane.visible = false;
         restart.visible = true;
       }

       if(mousePressedOver(restart)){
         reset();
       }

    drawSprites();
}

function enemy(){
  if(frameCount % 200 === 0){
    dragon = createSprite(0, random(20, 700));
    dragon.velocityX = 3;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: dragon.addImage(dragon1Img);
              break;
      case 2: dragon.addImage(dragon2Img);
              break;
      case 3: dragon.addImage(lightningImg);
              break;
      default: break;
    }
    dragon.lifetime = 400;
    dragon.scale=0.5;
    //dragon.debug = true;

    enemyGroup.add(dragon);
  }
}

function points(){
  score = score + Math.round(getFrameRate()/60);
  textSize(30);
  fill("yellow");
  text("score: " + score, windowWidth-150, 100);
}

function reset(){
  gameState = PLAY;
  score = 0;
  airoplane.addImage(plane);
}