/**********************************************
 * polygon_utils.js
 * Generalized polygon intersection utils
 * Ported to JavaScript from C code at http://paulbourke.net/fractals/randomtile/
 **********************************************/

const EPS = 1e-5;

/*
 * Vector substraction
 */
function substractCoords(c1, c2) {
  return {x: (c1.x - c2.x), y: (c1.y - c2.y)};
}

/*
 * Limit angle value in -PI..PI interval
 */
function normalizeAngle(angle) {
  while (angle > PI) {
    angle -= TWO_PI;
  }
  while (angle < -PI) {
    angle += TWO_PI;
  }
  return angle;
}

/*
 * Return the angle between two vectors on a plane
 * The angle is from vector 1 to vector 2, positive anticlockwise
 */
function getAngle2d(c1, c2) {
  let theta1 = atan2(c1.y, c1.x);
  let theta2 = atan2(c2.y, c2.x);
  let dtheta = theta2 - theta1;

  return normalizeAngle(dtheta);
}

/*
 * Check if a point lies within a polygon
 */
function insidePolygon(poly, pt) {
  let angle = 0.0;
  let n = poly.length;
  for (let i = 0; i < n; i++) {
    let c1 = poly[i];
    let c2 = poly[(i+1)%n];
    angle += getAngle2d(substractCoords(c1, pt), substractCoords(c2, pt));
  }
  return abs(angle) >= PI;
}

/*
 * Check if the lines intersect
 */
function lineIntersect(line1, line2) {
  let c1 = line1[0];
  let c2 = line1[1];
  let c3 = line2[0];
  let c4 = line2[1];
  
  let x1 = c1.x, y1 = c1.y;
  let x2 = c2.x, y2 = c2.y;
  let x3 = c3.x, y3 = c3.y;
  let x4 = c4.x, y4 = c4.y;
  
  let denom = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
  let numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
  let numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
  
  // Are the line coincident?
  if (abs(numera)<EPS && abs(numerb)<EPS && abs(denom)<EPS) {
    return true;
  }
  
  // Are the line parallel
  if (abs(denom)<EPS) {
    return false;
  }
  
  // Is the intersection along the the segments
  let mua = numera / denom;
  let mub = numerb / denom;
  if (mua < 0.0 || mua > 1.0 || mub < 0.0 || mub > 1.0) {
    return false;
  }
    
  return true;
}

/*
 * Return True if two polygon intersect.
 * Polygons are define with vertices ordered clockwise.
 */
function polygonsOverlap(poly1, poly2) {
  // Reject if a vertex of poly1 is inside poly2, And visa versa
  for (let p of poly2) {
    if (insidePolygon(poly1, p)) {
      return true;
    }
  }
  for (let p of poly1) {
    if (insidePolygon(poly2, p)) {
      return true;
    }
  }
  
  // Reject any intersecting edges
  let l1 = poly1.length;
  let l2 = poly2.length;
  for (let j = 0; j < l1; j++) {
    for (let i = 0; i < l2; i++) {
      let line1 = [poly1[j], poly1[(j+1) % l1]];
      let line2 = [poly2[i], poly2[(i+1) % l2]];
      if (lineIntersect(line1, line2)) {
        return true;
      }
    }
  }
  
  return false;
}
