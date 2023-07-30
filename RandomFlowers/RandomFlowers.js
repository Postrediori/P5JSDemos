/*jshint esversion: 7 */

/**********************************************
 * index.js
 **********************************************/

/*  */
const A0 = 150;
const AMIN = 5;
const Z = 0.45;

const W = 800;

/*  */
let bgColor;

/*  */
function g(x) {
  return A0 * (x**(-Z));
}

function getColor(a) {
  return color(200,a*5+10,0);
}

/*  */
let polygonSize = A0;

function initialize() {
  polygonSize = A0;
  polygonCount = 0;
  polygons = [];
  background(bgColor);
}

/*  */
function setup() {
  bgColor = color(15, 15, 15);
  
  createCanvas(W, W);
  noStroke();
  initialize();
}

function draw() {
  if (polygonSize > AMIN) {
    let newPolygon = new Rose(polygonSize, color(255, 116, 140), radians(random(72)));
    
    newPolygon.adjustPosition();
    newPolygon.display();
    
    polygons.push(newPolygon);
    polygonCount += 1;
    polygonSize = g(polygonCount);
  }
}

function mousePressed() {
  initialize();
}

function keyPressed() {
  initialize();
}
