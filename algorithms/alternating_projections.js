// Implements the method of alternating projections, for solving 
// convex feasibility problems.
// prox_a: Projection
// prox_b: Projection

// Applies: T = Prox_BProx_A

export default class AlternatingProjections {
  constructor(prox_a, prox_b) {
    this.prox_a = prox_a;
    this.prox_b = prox_b;
  }

  apply(x) {
    return this.prox_b.apply(this.prox_a.apply(x));
  }
}
