import Actor from "./Actor.js";

export default class Platform extends Actor {
  constructor(world, canvas) {
    super(world, canvas);

    // squares by default
    this.shape = 1;
  }
}
