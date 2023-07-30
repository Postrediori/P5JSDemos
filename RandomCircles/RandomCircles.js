/*jshint esversion: 7 */

const A0 = 150;
const Z = 0.65;

const W = 500;

var bgColor;

var circlesCount;
var circles;

function initialize() {
  background(bgColor);
  circlesCount = 0;
  circles = [];
}

function g(x) {
  return A0 * (x**(-Z));
}

function get_color(k) {
  return color(200, k*10+10, 0);
}

function equal_colors(col1, col2) {
  return col1.every((value, index) => value === col2[index]);
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  
  randomize(k) {
    this.x = int(random(W));
    this.y = int(random(W));
    this.r = int(g(k+1));
  }
  
  intersect(otherCircle) {
    //let c = get(this.x, this.y);
    //if (!equal_colors(c, bgColor.levels)) {
    //  return true;
    //}
    
    var dx = otherCircle.x - this.x;
    var dy = otherCircle.y - this.y;
    var rr = otherCircle.r + this.r;
    return (dx * dx + dy * dy <= rr * rr);
  }
  
  intersectAnyOther() {
    for (var k=0; k<circles.length; k++) {
      if (this.intersect(circles[k])) {
        return true;
      }
    }
    return false;
  }
  
  adjustPosition(k) {
    while (true) {
      this.randomize(k);
      if (!this.intersectAnyOther()) {
        break;
      }
    }
  }
  
  display() {
    fill(get_color(this.r));
    circle(this.x, this.y, this.r*2);
  }
}

function setup() {
  bgColor = color(50, 55, 100);
  
  createCanvas(W, W);
  noStroke();
  
  initialize();
}

function draw() {
  newCircle = new Circle();
  
  newCircle.adjustPosition(circlesCount);
  newCircle.display();
  
  circles.push(newCircle);
  circlesCount += 1;
}

function mousePressed() {
  initialize();
}

function keyPressed() {
  initialize();
}
