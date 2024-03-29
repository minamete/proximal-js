import AffineProj from "../projections/affine_proj.js";
import * as math from "mathjs";

// Example of an affine projection
const A = math.matrix([
    [1, -1] 
]);
const b = math.matrix([1])

// Define a point
const x = math.matrix([4, 2]);
const projection = new AffineProj(A, b);

console.log(projection.apply(x));
