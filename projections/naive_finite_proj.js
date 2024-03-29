import * as math from "mathjs";
import Proximal from "../proximal.js";

/**
 * Projects onto a set of finitely many matrices using the naive method
 * Edge cases: if there are multiple matrices that are closest to x,
 * the first one encountered is chosen.
 * If there are no matrices in the set, the original value is returned.
 * @param {math.Matrix[]} matrices
 */

export default class NaiveFiniteProj extends Proximal {
    constructor(matrices) {
        super();
        this.matrices = matrices;
    }

    /**
     * 
     * @param {math.Matrix} x 
     * @returns {math.Matrix} Proj(x)
     */
    apply(x) {
        let minDist = Infinity;
        let minMatrix = x;
        for (let matrix of this.matrices) {
            let dist = math.norm(math.subtract(matrix, x));
            if (dist < minDist) {
                minDist = dist;
                minMatrix = matrix;
            }
        }
        return minMatrix;
    }
}