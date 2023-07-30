'use strict';

const ATLAS_ROWS = 16
const ATLAS_COLS = [
    1, // 0
    1, // 1
    2, // 2
    1, // 3
    1, // 4
    9, // 5
    1, // 6
    7, // 7
    2, // 8
    1, // 9
    9, // 10
    7, // 11
    1, // 12
    7, // 13
    7, // 14
    2  // 15
    ]
const TILE_SIZE = 90;

let previousSecond = 0;
let t = 0;
let img;
let tiles = [];
let tileCols, tileRows;

function preload() {
  img = loadImage('CircuitTiles.png');
}

function setup() {
  tileCols = floor(windowWidth / TILE_SIZE);
  tileRows = floor(windowHeight / TILE_SIZE);
  
  let cw = tileCols * TILE_SIZE;
  let ch = tileRows * TILE_SIZE;
  
  createCanvas(cw, ch);
  
  for (let i = 0; i<ATLAS_ROWS; i++) {
    let tileRow = [];
    for(let j = 0; j<ATLAS_COLS[i]; j++) {
      let tile = createImage(TILE_SIZE, TILE_SIZE);
      tile.copy(img,
        j*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE,
        0, 0, TILE_SIZE, TILE_SIZE);
      tileRow.push(tile);
    }
     tiles.push(tileRow);
  }
  
  frameRate(30);
}

function draw() {
  clear();
  background(255);
  
  randomSeed(int(noise(t) * 373.7681691));
    
  for (let i = 0; i<tileCols; i++) {
    for(let j = 0; j<tileRows; j++) {
      let tile_flags = getTileFlagsByPos(i, j);
      let row = tile_flags;
      let col = int(random(ATLAS_COLS[row]));
      image(tiles[row][col], i*TILE_SIZE, j*TILE_SIZE);
    }
  }
  
  let s = second();
  if (previousSecond != s) {
    previousSecond = s;
    t = millis();
  }
}

//

function randomH(xy) {
  let v = noise(xy[0],xy[1]);
  return fract(v*373.7681691);
}

function randomV(xy) {
  let v = noise(xy[0],xy[1]);
  return fract(v*789.1798684);
}

function coordAdd(ab, cd) {
  return [ab[0]+cd[0],ab[1]+cd[1]];
}
    
function getTileFlagsByPos(x, y) {
  let xy = [x, y];
  let sideNoise = [
    randomH(coordAdd(xy, [t, t])), // Top
    randomV(coordAdd(xy, [t+1, t])), // Right
    randomH(coordAdd(xy, [t, t+1])), // Bottom
    randomV(coordAdd(xy, [t, t])), // Left
  ];
  let flags = (sideNoise[0] > 0.5 ? 1 : 0) +
    (sideNoise[1] > 0.5 ? 2 : 0) +
    (sideNoise[2] > 0.5 ? 4 : 0) +
    (sideNoise[3] > 0.5 ? 8 : 0);
  return flags;
}
