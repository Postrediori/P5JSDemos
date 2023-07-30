/* */
const W = 800;
const H = 600;

let overlay;

/* */
class Sprite {
  constructor( size) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.rotation = 0;
  }
  
  initRandom() {
    this.x = random(W + this.size * 2) - this.size;
    this.y = random(H + this.size * 2) - this.size;
    this.rotation = random(TWO_PI);
  }
  
  drawSprite() {
    let xc = this.x, yc = this.y, size = this.size;
    let r0 = size;
    let phi0 = this.rotation;
    
    strokeWeight(size / 15);
    fill(color(227, 176, 174));
    stroke(color(15, 15, 15));
    beginShape();
    
    const RAYS = 8;
    const RAY_ANGLE = 360.0 / float(RAYS);
    
    let first = true;
    for (let i = 0; i < RAYS; i++) {
      let angle0 = float(i) * RAY_ANGLE + phi0;
      
      let a1 = radians(angle0 - RAY_ANGLE * 0.5);
      let a2 = radians(angle0 - RAY_ANGLE * 0.25);
      let a3 = radians(angle0 + RAY_ANGLE * 0.25);
      let a4 = radians(angle0 + RAY_ANGLE * 0.5);
      
      let x1 = xc + r0 * 0.5 * cos(a1), y1 = yc + r0 * 0.5 * sin(a1);
      let x2 = xc + r0 * cos(a2), y2 = yc + r0 * sin(a2);
      let x3 = xc + r0 * cos(a3), y3 = yc + r0 * sin(a3);
      let x4 = xc + r0 * 0.5 * cos(a4), y4 = yc + r0 * 0.5 * sin(a4);
      
      if (first) {
        vertex(x1, y1);
        first = false;
      }
      bezierVertex(x2, y2, x3, y3, x4, y4);
    }
    endShape(CLOSE);
    
    noStroke();
    fill(color(218, 203, 154));
    circle(xc, yc, r0 / 3);
  }
  
  moveSprite() {
    this.rotation += 0.75;
    
    let t = this.rotation / this.size;
    this.x += (2 + sin(t)) * 0.5;
    this.y += (2 + cos(t)) * 0.5;
    
    if (this.x-this.size>width) {
      this.x = width - this.y;
      this.y = -this.size;
    }
    if (this.y-this.size > height) {
      this.y = height - this.x;
      this.x = -this.size;
    }
  }
}

/* */
const SPRITE_COUNT = 60;
let sprites;

function initSprites() {
  sprites = [];
  for (let i = 0; i<SPRITE_COUNT; i++) {
    let size = 10.0 * (i / (SPRITE_COUNT / 3) + 1);
    let newSprite = new Sprite(size);
    newSprite.initRandom();
    sprites.push(newSprite);
  }
}

function drawSprites() {
  for (let s of sprites) {
    s.drawSprite();
  }
}

function moveSprites() {
  for (let idx in sprites) {
    sprites[idx].moveSprite();
  }
}

/* */
function setup() {
  createCanvas(W, H);
  initSprites();
  overlay = loadImage("Overlay_800x600.jpg");
}

function draw() {
  background(color(235, 235, 235));
  image(overlay, 0, 0);
  
  drawSprites();
  
  moveSprites();
  
  // fill(color(235, 235, 235, 150));
  // rect(0, 0, W, H);
}
