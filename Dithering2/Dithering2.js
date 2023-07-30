const W = 800;

let m;
let cam;
let renderBuffer;
let shaderProg;

setup=_=>{
  createCanvas(W, W, WEBGL);
  m = loadModel('hexapod.obj');
  cam = createCamera();
  renderBuffer = createGraphics(W, W, WEBGL);
  shaderProg = createShader(VERTEX_SOURCE, FRAGMENT_SOURCE);
}

draw=_=>{
  // Render scene to buffer
  renderBuffer.clear();
  renderBuffer.background(200);
  
  renderBuffer.push();
  
  renderBuffer.noStroke();
  renderBuffer.rotateY(mouseX / float(width) * TAU);
  renderBuffer.rotateX(mouseY / float(height) * TAU);
  
  renderBuffer.ambientLight(30);
  // Shine a light in the direction the camera is pointing
  renderBuffer.directionalLight(
    240, 240, 240,
    cam.centerX - cam.eyeX,
    cam.centerY - cam.eyeY,
    cam.centerZ - cam.eyeZ
  );
  
  renderBuffer.scale(75);
  renderBuffer.model(m);
  
  renderBuffer.pop();
  
  // Render texure with shader pro-processing
  background(0);
  shader(shaderProg);
  
  shaderProg.setUniform("resolution", [width, height]);
  
  shaderProg.setUniform("channel0", renderBuffer);
  
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
