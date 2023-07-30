const VERTEX_SOURCE = [
  '#version 100',
  'precision mediump float;',
  'attribute vec3 aPosition;',

  'void main(void) {',
    'gl_Position = vec4(aPosition, 1.0);',
  '}',
].join('\n');

const FRAGMENT_SOURCE = [
  '#version 100',
  'precision mediump float;',
  
  'uniform vec2 resolution;',
  'uniform sampler2D channel0;',

  'const float Threshold = 0.5;',
  'const float Multiplicator = 1.0 / 17.0;',
  'const mat4 DitherMatrix = (mat4(',
      '1, 13, 4, 16,',
      '9, 5, 12, 8,',
      '3, 15, 2, 14,',
      '11, 7, 10, 6',
      ') - 8.) * Multiplicator;',

  'float GetLuminance(vec4 c) {',
    'return (0.2126*c.r + 0.7152*c.g + 0.0722*c.b);',
  '}',

  'float AdjustDither( float val, vec2 coord ) {',
      'vec2 coordMod = mod(coord, 4.0);',
      'int xMod = int(coordMod.x);',
      'int yMod = int(coordMod.y);',

      'vec4 col;',
      'if (xMod == 0) col = DitherMatrix[0];',
      'else if (xMod == 1) col = DitherMatrix[1];',
      'else if (xMod == 2) col = DitherMatrix[2];',
      'else if (xMod == 3) col = DitherMatrix[3];',

      'float adjustment = 0.;',
      'if (yMod == 0) adjustment = col.x;',
      'else if (yMod == 1) adjustment = col.y;',
      'else if (yMod == 2) adjustment = col.z;',
      'else if (yMod == 3) adjustment = col.w;',

      'return val + (val * adjustment);',
  '}',

  'void main (void) {',
    'vec2 uv = gl_FragCoord.xy / min(resolution.x, resolution.y);',
    'vec4 c = texture2D(channel0, uv);',
    
    'float luminance = GetLuminance(c);',

    'if (AdjustDither(luminance, uv*resolution)>Threshold) {',
      'gl_FragColor = vec4(1., 1., 1., 1.);',
    '} else {',
      'gl_FragColor = vec4(0., 0., 0., 1.);',
    '}',
  '}',
].join('\n');
