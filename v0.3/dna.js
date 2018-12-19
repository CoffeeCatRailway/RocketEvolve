function DNA(genes, color_) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        
        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxforce);
        }
    }
    if (color_) {
        this.color_ = color_;
    } else {
        this.color_ = getRandomColor();
    }
    
    this.crossover = function(partner) {
        var newgenes = [];
        var midgenes = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i > midgenes) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }

        var newcolor_ = [];
        var midcolor_ = floor(random(this.color_.length));
        for (var i = 0; i < this.color_.length; i++) {
            if (i > midcolor_) {
                newcolor_[i] = this.color_[i];
            } else {
                newcolor_[i] = partner.color_[i];
            }
        }
        return new DNA(newgenes, newcolor_);
    }
    
    this.mutation = function() {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxforce);
            }
        }
        for (var i = 0; i < this.color_.length; i++) {
            if (random(1) < 0.01) {
                this.color_[i] = random(0, 255);
            }
        }
    }
}
