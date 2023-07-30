const VERTEX_SOURCE = `#version 100
precision mediump float;
attribute vec3 aPosition;

void main(void) {
  gl_Position = vec4(aPosition, 1.0);
}`;

const FRAGMENT_SOURCE = `#version 100
precision mediump float;
  
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

uniform sampler2D channel0;
uniform sampler2D channel1;

#define PI 3.1415926

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  vec2 m = mouse / resolution.xy;

  if (length(uv)>1.) {
    gl_FragColor = vec4(vec3(0.), 1.0);
    return;
  }

  float rotation = m.x; // time * .05;
  float tilt = (0.5 - m.y)*PI; // sin(time * .25);
  float precession = 0.;

  vec2 tilt_v = vec2(sin(tilt), cos(tilt));
  vec2 precession_v = vec2(sin(precession), cos(precession));

  float sx = uv.x * precession_v.y - uv.y * precession_v.x;
  float sy = uv.y * precession_v.y + uv.x * precession_v.x;
  float sz = sqrt(1.0 - sx * sx - sy * sy);

  float y = sy * tilt_v.y - sz * tilt_v.x;
  float z = sy * tilt_v.x + sz * tilt_v.y;

  float theta = acos(-y);
  float phi = atan(z, sx);

  float u = 1.0 - (phi / (2.0 * PI) + 0.5) - mod(rotation, 1.);
  float v = -theta / PI;

  u = mod(u, 1.);
  v = mod(v, 1.);

  vec3 planet_color = texture2D(channel0, vec2(u, v)).rgb;

  float cloud_intensity = texture2D(channel1, vec2(u, v)).r;

  planet_color = mix(planet_color, vec3(1.), cloud_intensity);

  gl_FragColor = vec4(planet_color * sz, 1.0);
}`;
