//GameState (ESTADOS DEL JUEGO)
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
var n,m;
function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //crear cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  m = 0;
  
  //establecer colisionador para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

  //variables de puntuación y grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Llamar a las funciones fruits y Monster
    fruits();
    Monster();
    
    // Mover el cuchillo con el mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Aumentar la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();




      score=score+2;

    }
    else
    {
      // Cambiar al estado end si el cuchillo toca al enemigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //sonido del fin del juego
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Cambiar la animación del cuchillo en gameover y reiniciar su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }

    
    }

    if(frameCount%2===0){
      fruitGroup.setVelocityYEach(-48+m);
      m+=4;
      
      }

    if (frameCount%60===0){
       m = 0;
  }
    
     
  
  drawSprites();
  //Mostrar puntuación
  textSize(25);
  text("Puntuación : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(650,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/15));
    monster.setLifetime=60;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%60===0){
    fruit=createSprite(Math.round(random(50,600)),650,20,20);
        
  //Aumentar la velocidad de las frutas después de 4 puntos 

      fruit.rotationSpeed= Math.round(random(-2,2));
    fruit.scale=0.4;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    
    fruitGroup.add(fruit);
    

  }
}
