import Proximal from "../proximal.js";
import * as math from "mathjs";

/**
 * Implements the method of alternating projections
 * Applies: T = Prox_BProx_A
 * @param {Proximal} prox_a Proximal, but projections are recommended
 * @param {Proximal} prox_b Proximal, but projections are recommended
 */
export default class AlternatingProjections {
  constructor(prox_a, prox_b) {
    this.prox_a = prox_a;
    this.prox_b = prox_b;
  }

/**
 * Applies the alternating projections operator to x
 * @param {math.Matrix} x
 * @returns {math.Matrix} T(x)
 */
  apply(x) {
    return this.prox_b.apply(this.prox_a.apply(x));
  }
}
