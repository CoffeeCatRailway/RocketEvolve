function Population(popsize) {
    this.rockets = []
    this.popsize = Math.floor(popsize);
    this.matingpool = [];
    
    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }
    
    this.evaluate = function() {
        var maxfit = 0;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }
        console.log("Max fitness [" + floor(maxfit) + "]");
        
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }
        
        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
    }
    
    this.selection = function() {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }
    
    this.run = function() {
        for (var i = 0; i < this.popsize; i++) {
            if (this.rockets[i] == null) {
                this.rockets[i] = new Rocket(this.rockets[i - floor(random(1, 50))].dna);
            } else {
                if (!this.rockets[i].crashed) {
                    this.rockets[i].update();
                }
                this.rockets[i].show();
            }
        }

        var slOptPopsize = document.getElementById("slOptPopsize");
        this.popsize = slOptPopsize.value;
    }

    // Console functions
    this.setColorAll = function(colorGenes) {
        if (!colorGenes) {
            colorGenes = [255, 255, 255];
        }
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].dna.colorGenes = colorGenes;
        }
    }

    this.setColorHalfA = function(colorGenes) {
        if (!colorGenes) {
            colorGenes = [255, 255, 255];
        }
        for (var i = 0; i < this.popsize / 2; i++) {
            this.rockets[i].dna.colorGenes = colorGenes;
        }
    }

    this.setColorHalfB = function(colorGenes) {
        if (!colorGenes) {
            colorGenes = [255, 255, 255];
        }
        for (var i = this.popsize / 2; i < this.popsize; i++) {
            this.rockets[i].dna.colorGenes = colorGenes;
        }
    }
}
