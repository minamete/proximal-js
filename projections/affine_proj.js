import * as math from "mathjs";
import Proximal from "../proximal.js";

export default class AffineProj extends Proximal {
  // Operator for affine projection onto {x: Ax = b}
  // A: m x n matrix
  // b: m x 1 vector

  constructor(A, b) {
    super();
    this.A = A;
    this.b = b;
  }

  // Using the formula P_C(x) = x - A^T(AA^T)^{-1}(Ax - b):
  apply(x) {
    let aaTinv = math.inv(
      math.multiply(this.A, math.transpose(this.A))
    );
    let affineFactor = math.subtract(math.multiply(this.A, x), this.b);

    return math.subtract(
      x,
      math.multiply(math.transpose(this.A), math.multiply(aaTinv, affineFactor))
    );
  }
}
