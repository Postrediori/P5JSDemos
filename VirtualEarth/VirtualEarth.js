const W = 1280;
const H = 720;

let shaderProg;
let renderBuffer;
let earthTexture;
let cloudTexture;

function preload() {
  earthTexture = loadImage('bluemarble.jpg');
  cloudTexture = loadImage('clouds.jpg');
}

function setup() {
  createCanvas(W, H, WEBGL);
  background(0);
  noStroke();
  
  renderBuffer = createGraphics(W, H, WEBGL);
  renderBuffer.noStroke();
  
  shaderProg = createShader(VERTEX_SOURCE, FRAGMENT_SOURCE);
}

function draw() {
  shader(shaderProg);
  
  shaderProg.setUniform("resolution", [width, height]);
  shaderProg.setUniform('time', millis() / 1000.0);
  shaderProg.setUniform("mouse", [mouseX, mouseY]);
  
  shaderProg.setUniform("channel0", earthTexture);
  shaderProg.setUniform("channel1", cloudTexture);
  
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
