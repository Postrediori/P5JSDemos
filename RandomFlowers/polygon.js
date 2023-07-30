/**********************************************
 * polygon.js
 **********************************************/

var polygonCount = 0;
var polygons = [];

class Polygon {
  constructor(a, c) {
    this.a = a;
    this.c = c;
    this.x = 0;
    this.y = 0;
    this.poly = [];
  }
  
  randomize(k) {
    this.x = random(W);
    this.y = random(W);
    this.generateVertices();
  }
  
  generateVertices() {
    this.poly = [];
  }
  
  intersect(other) {
    return polygonsOverlap(this.poly, other.poly);
  }
  
  intersectAnyOther() {
    for (let p of polygons) {
      if (this.intersect(p)) {
        return true;
      }
    }
    return false;
  }
  
  adjustPosition() {
    while (true) {
      this.randomize();
      if (!this.intersectAnyOther()) {
        break;
      }
    }
  }
  
  display() {
    fill(this.c);
    beginShape();
    for (let c of this.poly) {
      vertex(c.x, c.y);
    }
    endShape(CLOSE);
  }
}
