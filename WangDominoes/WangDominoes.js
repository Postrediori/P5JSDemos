'use strict';

const ATLAS_SIZE = 4; // Tile atlas is 4x4
const TILE_SIZE = 90;

let previousSecond = 0;
let t = 0;
let img;
let tiles = [];
let tileCols, tileRows;

function preload() {
  img = loadImage('tiles.png');
}

function setup() {
  tileCols = floor(windowWidth / TILE_SIZE);
  tileRows = floor(windowHeight / TILE_SIZE);
  
  let cw = tileCols * TILE_SIZE;
  let ch = tileRows * TILE_SIZE;
  
  createCanvas(cw, ch);
  
  for (let i = 0; i<ATLAS_SIZE; i++) {
    for(let j = 0; j<ATLAS_SIZE; j++) {
      let tile = createImage(TILE_SIZE, TILE_SIZE);
      tile.copy(img,
        i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE,
        0, 0, TILE_SIZE, TILE_SIZE);
      tiles.push(tile);
    }
  }
  
  frameRate(30);
}

function draw() {
  clear();
  background(255);
  
  for (let i = 0; i<tileCols; i++) {
    for(let j = 0; j<tileRows; j++) {
      let tile_coord = getTileByPos(i, j);
      image(tiles[tile_coord[0]*ATLAS_SIZE+tile_coord[1]], i*TILE_SIZE, j*TILE_SIZE);
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

function getTileIdByFlags(flags) {
  const FLAGS_TO_ID = [
    12, 8, 13, 9,
    0, 4, 1, 5,
    15, 11, 14, 10,
    3, 7, 2, 6
  ];
  return FLAGS_TO_ID[flags];
}
    
function getTileByPos(x, y) {
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
  let tileId = getTileIdByFlags(flags);
  return [tileId % ATLAS_SIZE, floor(tileId / ATLAS_SIZE)];
}
