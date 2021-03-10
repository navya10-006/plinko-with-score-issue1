var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];
var count = 1;
var line;
var divisionHeight=300;
var score =0;
var gameState = 'play';
var scoreD = Math.round(random(1,100));
function setup() {
  var canvas = createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,375));
    }
}

function mousePressed(){
  if(count <= 5){
    particle = new Particle(mouseX,10,10,10);
    count++;
  }
}
 
function draw() {
  background("black");
  Engine.update(engine);
  console.log(count);
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }
  for (var k = 0; k < divisions.length; k++) { 
    divisions[k].display();
  }
  if(particle != null){
    particle.display();
    if(particle.body.position.y > 650){
      if(particle.body.position.x < 300){
        score = score+500;
        particle = null;
      }
      else if(particle.body.position.x <600){
        score = score+100;
        particle = null;
      }
      else if(particle.body.position.x <900){
        score = score+200;
        particle = null;
      }
    }
  }
  textSize(20)
  text("Score : "+score,20,30);
  text(""+scoreD,20,550);
  text(""+(scoreD+50),100,550);
  text(""+(scoreD+100),180,550);
  text(""+(scoreD+150),260,550);
  text(""+(scoreD+200),340,550);
  text(""+(scoreD+250),420,550);
  text(""+(scoreD+300),500,550);
  text(""+(scoreD+350),580,550);
  text(""+(scoreD+400),660,550);
  text(""+(scoreD+450),740,550);
  if(count>5 && particle == null){
    gameState = 'end';
  }
  if(gameState === 'end'){
    textSize(40);
    text("Game Over",350,400);
  }
}