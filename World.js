import WorldConfig from "./WorldConfig.js";

export default class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.inputObjects = [];
    this.renderObjects = [];
    this.physicsObjects = [];
    this.defaultObjects = [];
  }

  registerObject(gameObject, tickGroup) {
    if (tickGroup == "input") {
      this.inputObjects.push(gameObject);
    }

    if (tickGroup == "physics") {
      this.physicsObjects.push(gameObject);
    }

    if (tickGroup == "render") {
      this.renderObjects.push(gameObject);
    }

    if (tickGroup == "default") {
      this.defaultObjects.push(gameObject);
    }
  }

  beginPlay() {
    this.canvas.width = WorldConfig.width;
    this.canvas.height = WorldConfig.height;

    this.defaultObjects.forEach((gameObject) => {
      gameObject.beginPlay();
    });

    this.beginTick();
  }

  beginTick() {
    setInterval(
      () => this.worldTick(WorldConfig.tickRate),
      WorldConfig.tickRate
    );
  }

  worldTick(deltaTime) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.inputObjects.forEach((inputObject) => {
      inputObject.tickInput(deltaTime);
    });

    this.physicsObjects.forEach((physicsObject) => {
      if (physicsObject.shouldTick) {
        physicsObject.tickPhysics(deltaTime);
      }
    });

    this.renderObjects.forEach((gameObject) => {
      gameObject.tickRender(deltaTime);
    });
  }
}
