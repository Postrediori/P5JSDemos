const W = 750;
let x0 = W / 2, y0 = W / 2;

const PALETTE = [
  '#f1edc8',
  '#ddc98a',
  '#a4caa1',
  '#a3c3e6',
  '#6b99c9'
];

/*
 * Metacircles class
 */
function fy(x, y) {
  return sqrt(x*x+y*y);
}

class Metacircles {
  constructor(size) {
    this.size = size;
    this.metacircles = new Array(this.size);
  }
  
  initRandom() {
    for (let i=0; i<this.size; i++) {
      this.metacircles[i] = [
        random(), random()*5+1,
        random(), random()*5+1,
        (random()+1)/3
      ];
    }
  }
  
  getValue(x, y, t) {
    let s = 0;
    
    for (let i=0; i<this.size; i++) {
      let m = this.metacircles[i];
      
      let x1 = sin(t*m[1]+m[0]*TAU)/2 - x;
      let y1 = sin(t*m[3]+m[2]*TAU)/2 - y;
      
      s += m[4] / fy(x1, y1);
    }
    
    return s / this.size - 1;
  }
}


/*
 * Points class
 */

const SQRT3_2 = 1.732050807568877 / 2;

class Points {
  constructor(s, n) {
    this.s = s;
    this.h = s * SQRT3_2;
    this.n = n;
    this.size = 2 * n + 1;
    this.points = new Array(this.size * this.size);
  }
  
  initPoints() {
    for (let j = -N; j <= N; j++) {
      for (let i = -N; i <= N; i++) {
        let x = x0 - this.s/2 - this.s * i + ((j + N) % 2) * this.s/2;
        let y = y0 + this.h * j;
        
        this.points[(j+this.n)*this.size + (i+this.n)] = [x, y, 0];
      }
    }
  }
  
  getPoint(i, j) {
    return this.points[(j+this.n)*this.size + (i+this.n)];
  }
  
  setValue(i, j, z) {
    this.points[(j+this.n)*this.size + (i+this.n)][2] = z;
  }
}

/*
 * Global variables
 */
const METACIRCLES_COUNT = 5;
let metacircles = new Metacircles(METACIRCLES_COUNT);

const S = 24;
const N = 20;
let points = new Points(S, N);

function setup() {
  createCanvas(W, W);
  strokeWeight(4);
  
  //randomSeed(1337);
  metacircles.initRandom();

  points.initPoints();
}

function draw() {
  background(30);
  
  updateValues(millis() / 5000.);
  
  for (let j = -N; j < N; j++) {
    for (let i = -N; i < N; i++) {
      let p1 = points.getPoint(i, j);
      let p2 = points.getPoint(i+1, j);
      let p3 = points.getPoint(i, j+1);
      let p4 = points.getPoint(i+1, j+1);
      
      for (let s = 0; s < PALETTE.length; s++) {
        stroke(PALETTE[s]);
        let t = (s + 1) / PALETTE.length - 1;
        
        if ((j+N)%2==0) {
          passTriangle(p1, p2, p4, t);
          passTriangle(p1, p3, p4, t);
        }
        else {
          passTriangle(p1, p2, p3, t);
          passTriangle(p2, p3, p4, t);
        }
      }
    }
  }
}

function updateValues(t) {
  for (let j = -N; j <= N; j++) {
    for (let i = -N; i <= N; i++) {
      let x, y;
      [x, y, _] = points.getPoint(i, j);
      
      let x1 = (x - W/2) / W * 2, y1 = (y - W/2) / W * 2;
      let z = metacircles.getValue(x1, y1, t);
      
      points.setValue(i, j, z);
    }
  }
}

function passTriangle(p1, p2, p3, t) {
  let x1, y1, z1;
  [x1, y1, z1] = p1;
  z1 -= t;
  
  let x2, y2, z2;
  [x2, y2, z2] = p2;
  z2 -= t;
  
  let x3, y3, z3;
  [x3, y3, z3] = p3;
  z3 -= t;
  
  if (z1*z2>0 && z2*z3>0) {
    return;
  }
  
  let e = -z1 / (z2 - z1);
  let f = -z2 / (z3 - z2);
  let g = 1 + z3 / (z1 - z3);
  
  if (z2*z3>0) {
    line(
      x1+(x2-x1)*e, y1+(y2-y1)*e,
      x1+(x3-x1)*g, y1+(y3-y1)*g);
  }
  else {
    if (z3*z1<0) {
      line(
        x1+(x3-x1)*g, y1+(y3-y1)*g,
        x2+(x3-x2)*f, y2+(y3-y2)*f);
    }
    else {
      line(
        x1+(x2-x1)*e, y1+(y2-y1)*e,
        x2+(x3-x2)*f, y2+(y3-y2)*f);
    }
  }
}
