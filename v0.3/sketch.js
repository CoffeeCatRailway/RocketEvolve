var population;
var lifespan;
var count;
var generation;
var maxforce;

var targets;
var obstacles;

var rCrashed;

function setup() {
    var cnv = createCanvas(1280,720);
    cnv.id("cnv");

    var name = "Rocket Evolve";
    console.log(name + " setup!");
    document.title = name;

    lifespan = 500;
    count = 0;
    generation = 0;
    maxforce = 0.2;

    rCrashed = 0;

    var minXOff = -50, maxXOff = 50;
    var minYOff = -100, maxYOff = 50;
    var radius = 12;

    targets = [];
    for (var i = 0; i < floor(random(1, 3)); i++) {
        targets[i] = new CollidableEllipse(random(width / 4, width - width / 4), 150 - random(minYOff, maxYOff), radius, getRandomColor());
    }
    
    population = new Population(500);

    var yOff = 150;
    var y = height / 2 - 40;
    var w = width / 4;
    var h = 20;
    var padding = random(width / 10, width / 2);
    obstacles = [];
    for (var i = 0; i < random(2, 5); i++) {
        var nx = random(width / 10, (width - w - width / 10));
        var ny = y + random(-yOff, yOff);
        if (random(1) < 0.5) {
            obstacles[i] = new CollidableEllipse(nx, ny, random(40, 50));
        } else {
            obstacles[i] = new CollidableRect(nx, ny, w + random(-(width / 6), 10), h);
        }
    }
}

function getRandomColor() {
    return [random(0, 255), random(0, 255), random(0, 255)];
}

function splitGeneSets() {
    for (var i = 1; i < population.popsize / 2; i++) {
        population.rockets[i].dna = population.rockets[0].dna;
    }
    for (var i = population.popsize / 2 + 1; i < population.popsize; i++) {
        population.rockets[i].dna = new DNA();
    }
}

function draw() {
    background(22);
    population.run();

    noStroke();
    fill(255);
    text("Lifespan: " + count + "/" + lifespan, 0, 10);
    text("Generation: " + generation, 0, 22);
    text("Crashed/Alive: " + rCrashed + "/" + population.popsize, 0, 34);
    
    if (count >= lifespan) {
        population.evaluate();
        population.selection();
        count = 0;
        generation++;
        rCrashed = 0;
    }
    count++;
    
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
    }

    for (var i = 0; i < targets.length; i++) {
        targets[i].show();
    }
}
