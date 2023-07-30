const W = 800;

let m;
let cam;
let renderBuffer;
let shaderProg;

setup=_=>{
  createCanvas(W, W, WEBGL);
  m = createMobius(240, 100);
  cam = createCamera();
  renderBuffer = createGraphics(W, W, WEBGL);
  shaderProg = createShader(VERTEX_SOURCE, FRAGMENT_SOURCE);
}

draw=_=>{
  // Render scene to buffer
  renderBuffer.clear();
  renderBuffer.background(200);
  //orbitControl(2, 1, 0.05);
  
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
  
  //renderBuffer.box(150);
  renderBuffer.model(m);
  
  renderBuffer.pop();
  
  // Render texure with shader pro-processing
  background(0);
  shader(shaderProg);
  
  shaderProg.setUniform("resolution", [width, height]);
  
  shaderProg.setUniform("channel0", renderBuffer);
  
  //image(renderBuffer, -W/2, -W/2);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

// Mobius model by Paul Wheeler https://openprocessing.org/sketch/1353109
// createMobius([radius], [stripWidth], [detailX], [detailY])
function createMobius(radius = 40, stripWidth = 20, detailX = 48, detailY = 2) {
  const SPREAD = 0.1;

  return new p5.Geometry(
    detailX,
    detailY,
    // This needs to be an anonymous function not an arrow expression in order
    // for the binding of "this" to be correct
    function() {
      // create strips of vertices
      
      // the strip actually makes two revolutions, once for triangles facing
      // out, and one for triangles facing in.
      const angle = 4 * PI / detailX;
      const offset = -stripWidth / 2;
      const interval = stripWidth / detailY;
      
      // for each row
      for (let j = 0; j <= detailY; j++) {
        // for each column
        for (let i = 0; i <= detailX; i++) {
          let u = i * angle;
          let v = offset + interval * j;
          
          let x = (radius + v * Math.cos(0.5 * u)) * Math.cos(u) - Math.sin(u / 2) * 2 * SPREAD;
          let y = (radius + v * Math.cos(0.5 * u)) * Math.sin(u);
          if (u < TWO_PI) {
            y += Math.sin(u) * SPREAD;
          } else {
            y -= Math.sin(u) * SPREAD;
          }
          
          let z = v * Math.sin(0.5 * u) + Math.sin(u / 4) * 4 * SPREAD;
          
          this.vertices.push(new p5.Vector(x, y, z));
        }
      }
      
      // Because our geometry is made up of strips of vertices based on detailX
      // and detailY we can use computeFaces, but in order for this to work it
      // is important that the number of vertices per strip be equal to
      // detailX + 1 and the number of strips be equal to detailY + 1.
      this.computeFaces();
      this.computeNormals();
      
      this.gid = `mobius|${radius}|${stripWidth}|${detailX}|${detailY}`;
    }
  );
}
