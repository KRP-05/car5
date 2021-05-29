var car1,obstacle,obstacleCount=0,gamestate=0,score=0
function preload()
{
	carimg=loadImage("1.png")
  bg=loadImage("bg.jpg")
  startimg=loadImage("start.png")
  restartimg=loadImage("restart.png")
}

function setup() {
	createCanvas(1080, 880);
  back=createSprite(width/2,400,width,20)
back.addImage(bg)
back.scale=10
ground=createSprite(0,height,width,20)

invisground=createSprite(ground.x,ground.y,width,25)
invisground.visible=false

car=createSprite(50,100,100,200)
car.addImage(carimg)
  car.scale=0.5

restart=createSprite(car.x,250,50,50)
restart.addImage(restartimg)
restart.scale=0.2
restart.visible=false

start=createSprite(car.x,550,50,50)
start.addImage(startimg)
start.visible=false
	
  obstacleGroup=new Group()
  invisGroup=new Group()
}


function draw() {
  background("white")
  rectMode(CENTER);
  car.collide(ground)
camera.position.x = car.x
invisground.x=ground.x
restart.x=car.x
start.x=car.x
ground.x=car.x
car.collide(obstacleGroup)

if(gamestate===0){

start.visible=true
restart.visible=false
car.y=100
obstacleGroup.destroyEach()
invisGroup.destroyEach()
score=0

if(mousePressedOver(start)){
  gamestate=1
}
}
if(gamestate===1){
  start.visible=false
car.velocityY+=3

if(keyIsDown(RIGHT_ARROW)){
  car.x+=5
  if(car.x>2500){
    car.x+=8
  }
}
if(keyIsDown(LEFT_ARROW)){
  car.x-=5
}
if(keyIsDown(32)&&keyIsDown(LEFT_ARROW)){
  car.velocityY=-5
}
if(keyIsDown(RIGHT_ARROW)&&keyIsDown(32)){
  car.velocityY=-5
}

if(car.x>4*width){
  car.x=width/2
}
if(frameCount%200===0){
  score++
}
}
if(car.overlap(invisground)||car.overlap(invisGroup)){
  gamestate=2
  }


if(gamestate===2){
restart.visible=true
obstacleGroup.destroyEach()
  invisGroup.destroyEach()

}
if(mousePressedOver(restart)){
  gamestate=0
}




console.log(gamestate)

createGround()
  drawSprites();
  fill("red")
  textSize(30)
  text(score,car.x,30)
 
}
function createObstacle(){
  ob1=createSprite(500,height,50,50)
  ob1.rotation=45
}
function createGround(){
  if(frameCount%170===0){
    obstacle2=createSprite(car.x+width/2,random(300,600),200,170)
    obstacle2.lifetime=width/4

    invisobs2=createSprite(obstacle2.x,obstacle2.y+10,210,170)
    invisobs2.lifetime=width/4
    invisobs2.shapeColor="red"

    obstacleGroup.add(obstacle2)
    invisGroup.add(invisobs2)
  }
  if(frameCount%90===0){
    obstacle=createSprite(car.x+width/2,random(850,990),200,170)
    invisobs=createSprite(obstacle.x,obstacle.y+10,210,170)

    invisobs.shapeColor="red"

    obstacle.lifetime=width/4
    invisobs.lifetime=width/4

    obstacleCount++
    obstacleGroup.add(obstacle)
    invisGroup.add(invisobs)
  }
 

}


