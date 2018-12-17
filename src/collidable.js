function CollidableRect(x, y, w, h, c) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	if (c) {
		this.c = c;
	} else {
		this.c = [255, 255, 255];
	}

	this.contains = function(x, y) {
		return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
	}

	this.show = function() {
		fill(this.c[0], this.c[1], this.c[2]);
		rect(this.x, this.y, this.w, this.h);
	}

	this.copyPos = function() {
		return createVector(this.x, this.y);
	}
}

function CollidableEllipse(x, y, radius, c) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	if (c) {
		this.c = c;
	} else {
		this.c = [255, 255, 255];
	}

	this.contains = function(x, y) {
		var d = dist(this.x, this.y, x, y);
		return d < this.radius;
	}

	this.show = function() {
		fill(this.c[0], this.c[1], this.c[2]);
    	ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	}

	this.copyPos = function() {
		return createVector(this.x, this.y);
	}
}
