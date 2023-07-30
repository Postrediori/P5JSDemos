
/*******************************************************
 * polygon_types.js
 *******************************************************/
class Triangle extends Polygon {
  constructor(a, c, phi) {
    super(a, c);
    this.phi = phi;
  }
  
  generateVertices() {
    this.poly = [];
    for (let i = 0; i < 3; i++) {
      let t = radians(i * 120) + this.phi;
      this.poly.push({
        x: this.x + this.a * cos(t),
        y: this.y + this.a * sin(t),
      });
    }
  }
}

class Square extends Polygon {
  constructor(a, c, phi) {
    super(a, c);
    this.phi = phi;
  }
  
  generateVertices() {
    this.poly = [];
    for (let i = 0; i < 4; i++) {
      let t = radians(i * 90) + this.phi;
      this.poly.push({
        x: this.x + this.a * cos(t),
        y: this.y + this.a * sin(t),
      });
    }
  }
}

class Pentagon extends Polygon {
  constructor(a, c, phi) {
    super(a, c);
    this.phi = phi;
  }
  
  generateVertices() {
    this.poly = [];
    for (let i = 0; i < 10; i++) {
      let t = radians(i * 36) + this.phi;
      let a = this.a * (i % 2 == 0 ? 2.0 : 1.0);
      this.poly.push({
        x: this.x + a * cos(t),
        y: this.y + a * sin(t),
      });
    }
  }
}

class Hexagon extends Polygon {
  constructor(a, c, phi) {
    super(a, c);
    this.phi = phi;
  }
  
  generateVertices() {
    this.poly = [];
    for (let i = 0; i < 12; i++) {
      let t = radians(i * 30) + this.phi;
      let a = this.a * (i % 2 == 0 ? 2.0 : 1.0);
      this.poly.push({
        x: this.x + a * cos(t),
        y: this.y + a * sin(t),
      });
    }
  }
}

/*  */
const POLY_TRIANGLE = 0;
const POLY_SQUARE = 1;
const POLY_PENTAGON = 2;
const POLY_HEXAGON = 3;

const POLY_TYPES = 4;

function generateRandomPolygon(polyType, size, clr, phi) {
  switch (polyType) {
  case POLY_TRIANGLE:
    return new Triangle(size, clr, phi);
    
  case POLY_SQUARE:
    return new Square(size, clr, phi);
    
  case POLY_PENTAGON:
    return new Pentagon(size, clr, phi);
    
  case POLY_HEXAGON:
    return new Hexagon(size, clr, phi);
  }
  
  return null;
}
