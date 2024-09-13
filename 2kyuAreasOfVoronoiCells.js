// Find the areas of the Voronoi cells associated with the Point objects in the array p.

function voronoi_areas(p)
{

}


// Given a set of "seed points" in the plane, we can make a pattern called a Voronoi tessellation:

// Voronoi pattern

// The Voronoi cell corresponding to the seed point P consists of all points in the plane that are closer to P than to any other seed point. (In the picture, the black dots are the seed points; their Voronoi cells are each coloured with a different colour.)

// For this kata, you are given the seed points, and you need to calculate the areas of their Voronoi cells.

// The areas should be returned as an array (or vector) with one element for each seed point. Some Voronoi cells will have infinite area; for those, set the corresponding element of the solution to -1.0 .

// This is a straightforward exercise, if tackled the right way. If you find yourself writing very complicated code, step back and take another look. :)

// Hints. 1. The Voronoi cells can be subdivided into triangles. 2. It is not necessary to use square roots or trigonometric functions.

// Note. The seed points are passed using the following Point structure.

// class Point
// {
//  constructor(x,y)
//  {
//   this.x = x;
//   this.y = y;
//  }
// }
