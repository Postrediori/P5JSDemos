const W = 640;
const H = 720;

const MARGIN = 25;
const PLOT_MARKER_SIZE = 4;
const DIAGRAM_MARKER_SIZE = 2;

/*  */
let bgColor;
let legendColor;
let plotColor;
let plotMarkerColor;
let diagramColor;
let textColor;

/* */
const MAX_ITER = 100;
const PLOT_DX = (W - MARGIN * 2) / MAX_ITER;
const MIN_DIAGRAM_ITER = 15;

const P0 = 0.5;
let P = 0.0;

const EPS = 0.1;
const MAX_R = 4.0;
const R0 = 2.5;
let R = 1.0;
let dR = 0.0;

/*  */
function logisticMap(x, R) {
  return R * x * (1-x);
}

function drRate(R) {
  return sqrt(sqrt(4.0 - R)) * 0.0025;
}

function initialize() {
  R = R0;
  
  preparePlot();
  prepareDiagram();
}

function plotDynamic() {
  strokeWeight(1);
  
  P = P0;
  let lastCrd = {x: MARGIN, y: (H-MARGIN) - (H-MARGIN*2) * P};
  
  let diagramX = (W + MARGIN) + (W - MARGIN * 2) * (R - R0) / (MAX_R - R0);
    
  for (let iter = 0; iter < MAX_ITER; iter++) {
    P = logisticMap(P, R);
    let newCrd = {x: MARGIN + iter * PLOT_DX, y: (H-MARGIN) - (H-MARGIN*2) * P};
    
    stroke(plotColor);
    line(lastCrd.x, lastCrd.y, newCrd.x, newCrd.y);
    
    noStroke();
    fill(plotMarkerColor);
    square(newCrd.x-PLOT_MARKER_SIZE/2, newCrd.y-PLOT_MARKER_SIZE/2, PLOT_MARKER_SIZE);
    
    /* Mark new point on chaos diagram */
    if (iter > MIN_DIAGRAM_ITER) {
      fill(diagramColor);
      circle(diagramX, newCrd.y, DIAGRAM_MARKER_SIZE);
    }
    
    lastCrd = newCrd;
  }
}

function preparePlot() {
  fill(bgColor);
  noStroke();
  rect(MARGIN-PLOT_MARKER_SIZE, MARGIN, W-MARGIN*2+PLOT_MARKER_SIZE, H-MARGIN*2);
  
  stroke(legendColor);
  strokeWeight(2);
  
  line(MARGIN, MARGIN,
       MARGIN, H-MARGIN);
  line(MARGIN, H-MARGIN,
       W-MARGIN, H-MARGIN);
}

function prepareDiagram() {
  fill(bgColor);
  noStroke();
  rect(W+MARGIN, MARGIN, 2*W-MARGIN*2, H-MARGIN*2);
  
  stroke(legendColor);
  strokeWeight(2);
  
  line(W+MARGIN, MARGIN,
       W+MARGIN, H-MARGIN);
  line(W+MARGIN, H-MARGIN,
       W*2-MARGIN, H-MARGIN);
}

/*  */
function setup() {
  bgColor = color('#222222');
  legendColor = color('#606060');
  plotColor = color('#ebebeb');
  plotMarkerColor = color('#4ce600');
  diagramColor = color('#e60000');
  textColor = color('#bdbdbd');
  
  createCanvas(W * 2, H);
  background(bgColor);
  
  /* Text labels */
  fill(textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  
  text('Time', MARGIN + (W - MARGIN * 2) / 2, H - MARGIN / 2);  
  text('Rates', W+MARGIN + (W - MARGIN * 2) / 2, H - MARGIN / 2);
  
  textSize(24);
  text('Polulation vs Time', MARGIN + (W - MARGIN * 2) / 2, MARGIN / 2);  
  text('Bifurcations', W+MARGIN + (W - MARGIN * 2) / 2, MARGIN / 2);
  
  initialize();
}

function draw() {
  preparePlot();
  plotDynamic();
  if (R < MAX_R-EPS) {
    R += drRate(R);
  }
}

function mousePressed() {
  initialize();
}

function keyPressed() {
  initialize();
}
