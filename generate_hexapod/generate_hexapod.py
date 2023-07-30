#!/usr/bin/env python3
# Generate 3D hexapod with SDF library
#
# Original code by Michael Fogleman (@FogleBird):
#   https://twitter.com/FogleBird/status/1356456231876108288
# SDF library source code:
#   https://github.com/fogleman/sdf
# Python package:
#   https://pypi.org/project/sdf-fork/
#

from sdf import *

s = sphere(0.75)
s = s.translate(Z * -3) | s.translate(Z * 3)
s = s.union(capsule(Z * -3, Z * 3, 0.5), k=1)

f = sphere(1.5)
f = f.union(s.orient(X), s.orient(Y), s.orient(Z), k=1)

f.save('hexapod.stl')
