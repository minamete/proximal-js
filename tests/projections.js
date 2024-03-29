import affineProj from "../projections/affine_proj.js";
import * as math from "mathjs";

// Define a projection matrix
const A = math.matrix([
    [1, -1] 
]);
const b = math.matrix([0])

// Define a point
const x = math.matrix([3, 2]);
const projection = new affineProj(A, b);

console.log(projection.apply(x));