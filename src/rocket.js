function Rocket(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;
    
    this.applyForce = function(force) {
        this.acc.add(force);
    }
    
    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, targets[0].x, targets[0].y);
        for (var i = 0; i < targets.length; i++) {
            var newd = dist(this.pos.x, this.pos.y, targets[i].x, targets[i].y);
            if (newd < d) {
                d = newd;
            }
        }
        
        this.fitness = map(d, 0, width, width, 0);
        if (this.completed) {
            this.fitness *= 10;
        }
        if (this.crashed) {
            this.fitness /= 10;
        }
    }
    
    this.update = function() {
        for (var i = 0; i < targets.length; i++) {
            if (targets[i].contains(this.pos.x, this.pos.y)) {
                this.completed = true;
                this.pos = targets[i].copyPos();
                fill(targets[i].c[0], targets[i].c[1], targets[i].c[2]);
            }
        }
        
        for (var i = 0; i < obstacles.length; i++) {
            if (obstacles[i].contains(this.pos.x, this.pos.y)) {
                this.setCrashed(true);
            }
        }
        
        if (this.pos.x > width || this.pos.x < 0) {
            this.setCrashed(true);
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.setCrashed(true);
        }
        
        this.applyForce(this.dna.genes[count]);
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    this.setCrashed = function(c) {
        this.crashed = c;
        if (this.crashed) {
            rCrashed += 1;
        } else {
            rCrashed -= 1;
            if (rCrashed < 0) {
                rCrashed = 0;
            }
        }
    }
    
    this.initD = dist(this.pos.x, this.pos.y, targets[0].x, targets[0].y);
    this.t = targets[0];
    this.show = function() {
        push();
        noStroke();

        this.calcClosestTarget();
        var d = dist(this.pos.x, this.pos.y, this.t.x, this.t.y);

        if (d < this.initD) {
            this.initD = d;
        }

        var r = this.t.c[0] - map(this.initD, 0, 255, 255, 0);
        var g = this.t.c[1] - map(this.initD, 0, 255, 255, 0);
        var b = this.t.c[2] - map(this.initD, 0, 255, 255, 0);
        if (r < this.t.c[0]) r = this.t.c[0];
        if (g < this.t.c[1]) g = this.t.c[1];
        if (b < this.t.c[2]) b = this.t.c[2];

        fill(floor(r), floor(g), floor(b), 150);

        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 36, 5);
        pop();
    }

    this.calcClosestTarget = function() {
        for (var i = 0; i < targets.length; i++) {
            var d1 = dist(this.pos.x, this.pos.y, this.t.x, this.t.y);
            var d2 = dist(this.pos.x, this.pos.y, targets[i].x, targets[i].y);
            if (d2 < d1) {
                this.t = targets[i];
            }
        }
    }
}
