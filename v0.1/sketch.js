var population;
var lifespan = 500;
var count = 0;
var generation = 0;
var target;
var targetR = 16;
var maxforce = 0.2;

var rx = 0;
var ry = 0;
var rw = 0;
var rh = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  population = new Population(random(300, 700));
  target = createVector(width/2, 100);
  
  rw = width/2;
  rx = rw/2;
  ry = height/2;
}

function draw() {
  background(0);
  population.run();
  
  noStroke();
  text("Counter: "+count, 0, 10);
  text("Generation: "+generation, 0, 20);
  text("Population size: "+population.popsize, 0, 30);
  
  if (count >= lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    generation++;
  }
  count++;
  
  fill(255);
  rect(rx, ry, rw, rh);
  ellipse(target.x, target.y, targetR, targetR);
}
