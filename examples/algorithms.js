import AffineProj from "../projections/affine_proj.js";
import DouglasRachford from "../algorithms/douglas_rachford.js";
import * as math from "mathjs";
import AlternatingProjections from "../algorithms/alternating_projections.js";

// Example of DR and alternating projections on a bad angle, 
// with and without the shadow in DR
const A_1 = math.matrix([
    [1, -1] 
]);
const A_2 = math.matrix([
    [1 + 1/30, -1]
])
const b = math.matrix([0])

// Define a point
const projection1 = new AffineProj(A_1, b);
const projection2 = new AffineProj(A_2, b);

// Define DR, alternating algorithm and a tolerance
const dr = new DouglasRachford(projection1, projection2, projection2);
const alt = new AlternatingProjections(projection1, projection2);
const tolerance = 1e-6;

let x = math.matrix([Math.random(), Math.random()]);
let count = 0;
let diff = 1;

// DR, non-shadow
while (diff > tolerance) {
    x = dr.apply(x);
    diff = math.norm(math.subtract(math.matrix([0,0]), x));
    count++;
}
console.log("DR, non-shadow: ", x, count);

// DR, shadow
x = math.matrix([Math.random(), Math.random()]);
let shadow = 0;
count = 0;
diff = 1;
while (diff > tolerance) {
    [x, shadow] = dr.apply_shadow(x);
    diff = math.norm(math.subtract(math.matrix([0,0]), shadow));
    count++;
}
console.log("DR, shadow: ", x, count);

// Alternating
x = math.matrix([Math.random(), Math.random()]);
count = 0;
diff = 1;
while (diff > tolerance) {
    x = alt.apply(x);
    diff = math.norm(math.subtract(math.matrix([0,0]), x));
    count++;
}
console.log("Alternating: ", x, count);