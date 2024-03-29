import * as math from "mathjs";

/**
 * Implements the method of alternating projections
 * Applies: T = Prox_BProx_A
 * @param {Proximal} prox_a Proximal, but projections are recommended
 * @param {Proximal} prox_b Proximal, but projections are recommended
 */
export class AlternatingProjections {
    constructor(prox_a: any, prox_b: any);
    prox_a: any;
    prox_b: any;
    /**
     * Applies the alternating projections operator to x
     * @param {math.Matrix} x
     * @returns {math.Matrix} T(x)
     */
    apply(x: math.Matrix): math.Matrix;
}

/**
 * Implements the Douglas-Rachford splitting algorithm (aka: ADMM)
 * Applies: T = Id - Prox_A + Prox_B(2Prox_A - Id)
 *
 * @param {Proximal} prox_a Proximal
 * @param {Proximal} prox_b Proximal
 * @param {Proximal} shadow Projection, optional; if not provided, defaults to prox_a
**/
export class DouglasRachford {
    constructor(prox_a: any, prox_b: any, shadow: any);
    prox_a: any;
    prox_b: any;
    shadow: any;
    /**
     * Applies the Douglas-Rachford operator to x
     * @param {math.Matrix} x
     * @returns {math.Matrix} T(x)
     */
    apply(x: math.Matrix): math.Matrix;
    /**
     * Applies the projection given in the constructor to x
     * @param {math.Matrix} x
     * @returns {[math.Matrix, math.Matrix]} [x, shadow(x)]
     */
    apply_shadow(x: math.Matrix): [math.Matrix, math.Matrix];
}

/**
 * Implements projections onto affine sets
 * Applies: P_{x: Ax = b}(x) = x - A^T(AA^T)^{-1}(Ax - b)
 * @param {math.Matrix} A m x n matrix
 * @param {math.Matrix} b m x 1 vector
 */
export class AffineProj extends Proximal {
    constructor(A: any, b: any);
    A: any;
    b: any;
    /**
     * Applies the projection onto the affine set
     * @param {math.Matrix} x
     * @returns {math.Matrix} P_{x: Ax = b}(x)
     */
    apply(x: math.Matrix): math.Matrix;
}

/**
 * Projects onto a set of finitely many matrices using the naive method
 * Edge cases: if there are multiple matrices that are closest to x,
 * the first one encountered is chosen.
 * If there are no matrices in the set, the original value is returned.
 * @param {math.Matrix[]} matrices
 */
export class NaiveFiniteProj extends Proximal {
    constructor(matrices: any);
    matrices: any;
    /**
     *
     * @param {math.Matrix} x
     * @returns {math.Matrix} Proj(x)
     */
    apply(x: math.Matrix): math.Matrix;
}

export abstract class Proximal {
    apply(x: any): void;
}
