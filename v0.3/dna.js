function DNA(moveGenes, colorGenes, lengthGene, widthGene) {
    if (moveGenes) {
        this.moveGenes = moveGenes;
    } else {
        this.moveGenes = [];
        
        for (var i = 0; i < lifespan; i++) {
            this.moveGenes[i] = p5.Vector.random2D();
            this.moveGenes[i].setMag(maxforce);
        }
    }

    if (colorGenes) {
        this.colorGenes = colorGenes;
    } else {
        this.colorGenes = getRandomColor();
    }

    this.lengthGeneMin = 30;
    this.lengthGeneMax = 50;
    if (lengthGene) {
        this.lengthGene = lengthGene;
    } else {
        this.lengthGene = floor(random(this.lengthGeneMin, this.lengthGeneMax));
    }

    this.widthGeneMin = 5;
    this.widthGeneMax = 15;
    if (widthGene) {
        this.widthGene = widthGene;
    } else {
        this.widthGene = floor(random(this.widthGeneMin, this.widthGeneMax));
    }

    this.selectionChance = 0.01;
    
    this.crossover = function(partner) {
        // Choose a base gene of movement from the parents
        var newMoveGenes = [];
        var midgenes = floor(random(this.moveGenes.length));
        for (var i = 0; i < this.moveGenes.length; i++) {
            if (i > midgenes) {
                newMoveGenes[i] = this.moveGenes[i];
            } else {
                newMoveGenes[i] = partner.moveGenes[i];
            }
        }

        // Choose a color gene from the parents
        var newColorGenes = [];
        for (var i = 0; i < this.colorGenes.length; i++) {
            if (random(100) < this.selectionChance) {
                var div = 4;
                var ca = this.colorGenes[i] / div;
                if (random(10) < this.selectionChance) {
                    ca += random(-ca, ca);
                }

                var cb = partner.colorGenes[i] / div;
                if (random(10) < this.selectionChance) {
                    cb += random(-cb, cb);
                }

                newColorGenes[i] = ca + cb;
            } else {
                if (random(10) < this.selectionChance) {
                    newColorGenes[i] = this.colorGenes[i];
                } else {
                    newColorGenes[i] = partner.colorGenes[i];
                }
            }
        }

        // Choose a length gene from the parents
        var newLengthGene = 0;
        if (random(100) < this.selectionChance) {
                var div = 4;
                var la = this.lengthGene / div;
                if (random(10) < this.selectionChance) {
                    la += random(-la, la);
                }

                var lb = partner.lengthGene / div;
                if (random(10) < this.selectionChance) {
                    lb += random(-lb, lb);
                }

                newLengthGene = la + lb;
        } else {
            if (random(10) < this.selectionChance) {
                newLengthGene = this.lengthGene;
            } else {
                newLengthGene = partner.lengthGene;
            }
        }
        // Choose a length gene from the parents
        var newWidthGene = 0;
        if (random(100) < this.selectionChance) {
                var div = 4;
                var la = this.widthGene / div;
                if (random(10) < this.selectionChance) {
                    la += random(-la, la);
                }

                var lb = partner.widthGene / div;
                if (random(10) < this.selectionChance) {
                    lb += random(-lb, lb);
                }

                newWidthGene = la + lb;
        } else {
            if (random(10) < this.selectionChance) {
                newWidthGene = this.widthGene;
            } else {
                newWidthGene = partner.widthGene;
            }
        }

        this.checkSizeGenes(newLengthGene, newWidthGene);
        return new DNA(newMoveGenes, newColorGenes, newLengthGene, newWidthGene);
    }
    
    this.mutation = function() {
        // Mutate a base gene of movement
        for (var i = 0; i < this.moveGenes.length; i++) {
            if (random(1) < this.selectionChance) {
                this.moveGenes[i] = p5.Vector.random2D();
                this.moveGenes[i].setMag(maxforce);
            }
        }

        // Mutate a color gene
        for (var i = 0; i < this.colorGenes.length; i++) {
            if (random(20) < this.selectionChance) {
                if (random(50) < this.selectionChance) {
                    this.colorGenes[i] = random(0, 255);
                } else {
                    this.colorGenes[i] = this.colorGenes[i] + random(-150, 150);
                }
            }
        }

        // Mutate the length gene
        if (random(20) < this.selectionChance) {
            this.lengthGene = random(this.lengthGeneMin, this.lengthGeneMax);
        }
        // Mutate the width gene
        if (random(20) < this.selectionChance) {
            this.widthGene = random(this.widthGeneMin, this.widthGeneMax);
        }
        this.checkSizeGenes(this.lengthGene, this.widthGene);
    }

    this.checkSizeGenes = function(lengthGene, widthGene) {
        if (lengthGene < this.lengthGeneMin) {
            lengthGene = this.lengthGeneMin;
        }
        if (lengthGene > this.lengthGeneMax) {
            lengthGene = this.lengthGeneMax;
        }

        if (widthGene < this.widthGeneMin) {
            widthGene = this.widthGeneMin;
        }
        if (widthGene > this.widthGeneMax) {
            widthGene = this.widthGeneMax;
        }
    }
}
