import * as math from "mathjs";
import Proximal from "../proximal.js";

/**
 * Implements projections onto affine sets
 * Applies: P_{x: Ax = b}(x) = x - A^T(AA^T)^{-1}(Ax - b)
 * @param {math.Matrix} A m x n matrix
 * @param {math.Matrix} b m x 1 vector
 */
export default class AffineProj extends Proximal {
  constructor(A, b) {
    super();
    this.A = A;
    this.b = b;
  }

  /**
   * Applies the projection onto the affine set
   * @param {math.Matrix} x
   * @returns {math.Matrix} P_{x: Ax = b}(x)
   */
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
