const W = 800;
const BACKGROUND = 35;
const FOREGROUND = 235;
const CUBE_SIZE = 400;

let renderBuffer;
let textureBuffer;

function setup() {
  createCanvas(W, W, WEBGL);
  renderBuffer = createGraphics(W, W, WEBGL);
  textureBuffer = createGraphics(W, W, WEBGL);
}

function draw() {
  renderBuffer.clear();
  renderBuffer.background(BACKGROUND);

  renderBuffer.smooth();

  renderBuffer.push();
  renderBuffer.translate(0, 0, 0);

  renderBuffer.rotateY(mouseX / float(width) * TAU);
  renderBuffer.rotateX(mouseY / float(height) * TAU);

  drawTexturedCube(renderBuffer, CUBE_SIZE, textureBuffer);

  renderBuffer.pop();

  textureBuffer.clear();
  textureBuffer.background(0);
  textureBuffer.image(renderBuffer, -W/2, -W/2);

  background(BACKGROUND);
  image(textureBuffer, -W/2, -W/2);
}

function drawTexturedCube(ctx, s, img) {
  ctx.fill(BACKGROUND);
  ctx.stroke(FOREGROUND);     
  ctx.strokeWeight(4);
  ctx.texture(img);
  ctx.box(s);
}
