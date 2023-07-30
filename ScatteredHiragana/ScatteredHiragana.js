/*
 * Scattered Letters.js
 * Ported to p5js from 'Scattered Letters' by Algirdas Rascius: https://openprocessing.org/sketch/1811
 */

let alphabet = 'あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをん';

// let alphabet = '啊';  // AAAAAAA

let currentSize;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, TWO_PI, 1, 1, 1);
  smooth();
  
  initialize();
}

function draw() {
  if (currentSize > 10) {
    if (!randomLetter(currentSize)) {
      currentSize = currentSize*0.65;
    }
  }
}

function initialize() {
  background(color(0, 0, 1));
  currentSize = 300;
}

function mouseClicked() {
   initialize();
}

function keyPressed() {
   initialize();
}

function isPixelEmpty(p, x, y, w) {
  let index = x + y * w;
  return (p[index*4+0]>=128);
}

function fitsLetter(mask, x, y) {
  // Use pixels[] because get() is painfully slow
  mask.loadPixels();
  loadPixels();
  
  let fits = true;
  for (let dx = 0; dx<mask.width && fits; dx++) {
    for (let dy = 0; dy<mask.height && fits; dy++) {
      if (!isPixelEmpty(mask.pixels, dx, dy, mask.width)) {
        if (!isPixelEmpty(pixels, x+dx, y+dy, width)) {
          fits = false;
        }
      }
    }
  }
  return fits;
}

function randomLetter(letterSize) {
  let intSize = int(letterSize);
  let c = alphabet.charAt(int(random(alphabet.length)));
  
  let g = createGraphics(intSize * 1.42, intSize * 1.42); // Use larger graphics to fit rotated letter
  g.background(color(0, 0, 1, 0));
  g.fill(color(0, 0, 0));
  g.textAlign(CENTER, CENTER);
  g.translate(g.width/2, g.height/2);
  g.rotate(random(TWO_PI));
  g.scale(letterSize/300);
  g.textFont("sans");
  g.textSize(letterSize);
  g.text(c, 0, 0);
  
  let gMask = createGraphics(intSize, intSize);
  gMask.background(color(0, 0, 1, 1));
  gMask.image(g, 0, 0);
  gMask.filter(ERODE);  
  gMask.filter(ERODE);
  
  for (let tries=50; tries>0; tries--) {
    let x = int(random(width-intSize));
    let y = int(random(height-intSize));
    
    if (fitsLetter(gMask, x, y)) {
      image(g, x, y);
      return true;
    }
  }
  
  return false;
}
