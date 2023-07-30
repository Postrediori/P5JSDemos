/**********************************************
 * polygon_types.js
 **********************************************/

/*
 * Rose curve / rhodonea curve
 * Wiki: https://en.wikipedia.org/wiki/Rose_(mathematics)
 */
class Rose extends Polygon {
  constructor(a, c, phi) {
    super(a, c);
    this.phi = phi;
    this.n = 5;
    this.d = 3;
    this.k = this.n / this.d;
  }
  
  roseCoord(angle) {
    let s = this.a * cos(this.k * angle);
    return {x: this.x + s * cos(angle + this.phi), y: this.y + s * sin(angle + this.phi)};
  }
  
  generateVertices() {
    let angleBounds = [
      {start: 504, end: 540}, {start: 0, end: 36},
      {start: 396, end: 468},
      {start: 288, end: 360},
      {start: 180, end: 252},
      {start: 72, end: 144},
    ];
    
    this.poly = [];
    
    for (let bounds of angleBounds) {
      for (let angle = bounds.start; angle<bounds.end; angle += 8) {
        let t = radians(angle);
        this.poly.push(this.roseCoord(t));
      }
    }
  }
}
