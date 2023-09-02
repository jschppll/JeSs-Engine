export default class GameObject {
  constructor(world) {
    this.world = world;
    this.shouldTick = false;
    this.hasBegunPlay = false;

    world.registerObject(this, "default");
  }

  tick(deltaTime) {}

  beginPlay() {
    if (!this.hasBegunPlay) {
      this.hasBegunPlay = true;
    }
  }
}
