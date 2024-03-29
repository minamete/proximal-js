import * as math from "mathjs";

// Implements the Douglas-Rachford splitting algorithm (aka: ADMM)
// prox_a: Proximal
// prox_b: Proximal
// shadow: Projection, optional; if not provided, defaults to prox_a

// Applies: T = Id - Prox_A + Prox_B(2Prox_A - Id)

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

  apply(x) {
    return math.add(
      math.subtract(x, this.prox_a.apply(x)),
      this.prox_b.apply(
        math.subtract(math.multiply(2, this.prox_a.apply(x)), x)
      )
    );
  }

  // Returns array [normal, shadow]
  apply_shadow(x) {
    return [this.apply(x), this.shadow.apply(this.apply(x))]
  }
}
