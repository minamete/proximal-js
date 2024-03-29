import * as math from "mathjs";
import Proximal from "../proximal.js";

/**
 * Implements the Douglas-Rachford splitting algorithm (aka: ADMM)
 * Applies: T = Id - Prox_A + Prox_B(2Prox_A - Id)
 * 
 * @param {Proximal} prox_a Proximal
 * @param {Proximal} prox_b Proximal
 * @param {Proximal} shadow Projection, optional; if not provided, defaults to prox_a
**/
export default class DouglasRachford {
  constructor(prox_a, prox_b, shadow) {
    this.prox_a = prox_a;
    this.prox_b = prox_b;
    if (shadow) {
      this.shadow = shadow;
    } else {
        this.shadow = this.prox_a;
    }
  }

  /**
   * Applies the Douglas-Rachford operator to x
   * @param {math.Matrix} x 
   * @returns {math.Matrix} T(x)
   */
  apply(x) {
    return math.add(
      math.subtract(x, this.prox_a.apply(x)),
      this.prox_b.apply(
        math.subtract(math.multiply(2, this.prox_a.apply(x)), x)
      )
    );
  }

  /**
   * Applies the projection given in the constructor to x
   * @param {math.Matrix} x 
   * @returns {[math.Matrix, math.Matrix]} [x, shadow(x)]
   */
  apply_shadow(x) {
    return [this.apply(x), this.shadow.apply(this.apply(x))]
  }
}
