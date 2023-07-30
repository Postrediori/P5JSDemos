# p5.js Demos

A collection of graphics demos for Processing+[p5.js](https://p5js.org/). Demos are available at OpenProcessing: https://openprocessing.org/user/275829

## Dithering

Post-processing with a dithering shader of a Möbius strip. The demo creates a custom **[p5.Geometry](https://p5js.org/reference/#/p5.Geometry)** object as described by an article by Paul Wheeler: [Custom 3D Geometry in P5.js](https://www.paulwheeler.us/articles/custom-3d-geometry-in-p5js/).

[![Dithering screenshot](images/Dithering.jpg)](Dithering/)

## Dithering-2

Post-processing with a dithering shader of a scene with a hexapod 3D object.

Script for generating the hexapod 3D mesh is can be found at [generate_hexapod](generate_hexapod/). The script uses [sdf module](https://github.com/fogleman/sdf) for Python by [Michael Fogleman](https://github.com/fogleman/) for creating a procedural mesh.

[![Dithering-2 screenshot](images/Dithering2.jpg)](Dithering2/)

## Infinity Cube

Demo that uses off-screen rendering and texturing to 'infinite inner cubes' illusion.

[![Infinity Cube screenshot](images/InfinityCube.jpg)](InfinityCube/)

## Infinity Cube-2

Different cube design and rendering using **[TESS](https://p5js.org/reference/#/p5/beginShape)** shape.

Bare JS+WebGL version: https://postrediori.gitlab.io/EndlessCube/

[![Infinity Cube-2 screenshot](images/InfinityCube2.jpg)](InfinityCube2/)

## Julia Set

WebGL 2D shader with a Julia set.

[![Julia Set screenshot](images/JuliaSet.jpg)](JuliaSet/)

## Logistic Map

Visualising bifurcation plot for the logistic map. 

[![Logistic Map screenshot](images/LogisticMap.jpg)](LogisticMap/)

## Marching Triangles

Simple contour detection with marching triangles algorithm.

[![Marching Triangles screenshot](images/MarchingTriangles.jpg)](MarchingTriangles/)

## Marching Triangles-2

Multiple levels of contour detection with marching triangles algorithm.

[![Marching Triangles-2 screenshot](images/MarchingTriangles2.jpg)](MarchingTriangles2/)

## Random Circles

Filling 2D space with random circles. Size decay function described in [Random space filling of the plane](http://paulbourke.net/fractals/randomtile/) by Paul Bourke.

[![Random Circles screenshot](images/RandomCircles.jpg)](RandomCircles/)

## Random Polygons

Filling 2D space with random 3-, 4-, 5- and -6sided polygons. Polygon intersection code from [Random space filling of the plane](http://paulbourke.net/fractals/randomtile/) by Paul Bourke.

[![Random Polygons screenshot](images/RandomPolygons.jpg)](RandomPolygons/)

## Random Flowers

Filling 2D space flower shapes called [Rose curve](https://en.wikipedia.org/wiki/Rose_(mathematics)) or rhodonea curve.

[![Random Flowers screenshot](images/RandomFlowers.jpg)](RandomFlowers/)

## Raspberry Heaven

Re-creation of [Raspberry Heaven music video](https://www.youtube.com/watch?v=NBzKXP9cnIQ). A simple simulation of particles falling in wind.

[![Raspberry Heaven screenshot](images/RaspberryHeaven.jpg)](RaspberryHeaven/)

## Scattered Letters

Filing 2D space with non-overlapping letters. A port to p5.js of [Scattered Letters](https://openprocessing.org/sketch/1811) by Algirdas Rascius.

Original blog post (archived): [Scattered Letters](https://web.archive.org/web/20090913054525/http://mydigiverse.com/2009/05/scattered-letters/)

[![Scattered Letters screenshot](images/ScatteredLetters.jpg)](ScatteredLetters/)

## Scattered Hiragana

Tiling 2D space with hiragana symbols.

[![Scattered Hiragana screenshot](images/ScatteredHiragana.jpg)](ScatteredHiragana/)

## Virtual Earth

Simple 2D shader with a rotating 3D globe made with rendering of an illusion of depth.

Earth surface and clouds texture by NASA:
* [Collection: Blue Marble](https://visibleearth.nasa.gov/collection/1484/blue-marble)
  * [Blue Marble: Land Surface, Shallow Water, and Shaded Topography](https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography)
  * [Blue Marble: Clouds](https://visibleearth.nasa.gov/images/57747/blue-marble-clouds)

[![Virtual Earth screenshot](images/VirtualEarth.jpg)](VirtualEarth/)

## Wang Dominoes

Tiling 2D space with a random pattern using [Wang dominoes](https://en.wikipedia.org/wiki/Wang_tile).

[![Wang Dominoes screenshot](images/WangDominoes.jpg)](WangDominoes/)

## Wang Circuits

Tiling 2D space with a random electronic circuit using Wang dominoes.

[![Wang Circuits screenshot](images/WangCircuits.jpg)](WangCircuits/)
