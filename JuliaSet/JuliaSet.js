const W = 1280;
const H = 720;

let shaderProg;

function setup() {
  createCanvas(W, H, WEBGL);
  noStroke();
  background(0);
  
  shaderProg = createShader(VERTEX_SOURCE, FRAGMENT_SOURCE);
}

function draw() {
  shader(shaderProg);
  
  shaderProg.setUniform("resolution", [width, height]);
  shaderProg.setUniform('time', millis() / 1000.0);
  
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
