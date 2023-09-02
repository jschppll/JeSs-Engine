import GameObject from "./GameObject.js";
import { makeSphere, makeRect } from "./spriteHelper.js";
import {
  vectorAdd,
  vectorDivideFloat,
  vectorMultiplyFloat,
  getVectorLength,
  normalizeVector,
} from "./Math.js";
import { ActorTraceByObjectType } from "./Physics.js";
import WorldConfig from "./WorldConfig.js";

export default class Actor extends GameObject {
  constructor(world, canvas) {
    super(world);

    this.mass = 2;
    this.velocity = [0, 0];
    this.force = [0, 0];

    this.speed = 2;

    // default to circle
    this.shape = 0;
    this.color = "gray";

    this.ctx = canvas.getContext("2d");

    this.radius = 10;
    this.width = 10;
    this.height = 10;

    this.bHasRequestedMove = false;
    this.requestMoveXValue = 0;
    this.requestMoveYValue = 0;

    this.position = [canvas.width / 2, canvas.height - 30];

    world.registerObject(this, "render");
    world.registerObject(this, "physics");
  }

  requestMoveX(direction) {
    if (direction != 0) {
      this.requestMoveXValue = direction;
      this.bHasRequestedMove = true;
    }
  }

  requestMoveY(direction) {
    if (direction != 0) {
      this.requestMoveYValue = direction;
      this.bHasRequestedMove = true;
    }
  }

  draw() {
    if (this.shape == 0) {
      makeSphere(this.ctx, {
        x: this.position[0],
        y: this.position[1],
        radius: this.radius,
        color: this.color,
      });
    } else if (this.shape == 1) {
      makeRect(this.ctx, {
        x: this.position[0],
        y: this.position[1],
        width: this.width,
        height: this.height,
        color: this.color,
      });
    }
  }

  isGrounded() {
    const hitResult = ActorTraceByObjectType(
      this.world,
      this,
      this.position,
      [0, 1],
      1,
      [this]
    );

    return hitResult.hit;
  }

  tickRender(deltaTime) {
    this.draw();
  }

  tickPhysics(deltaTime) {
    const gravityVector = [0, WorldConfig.gravity];

    if (this.bHasRequestedMove) {
      // add movement force if requested
      this.force = [
        this.requestMoveXValue * this.speed,
        this.requestMoveYValue * this.speed,
      ];
    }

    if (!this.bHasRequestedMove && this.isGrounded()) {
      return;
    }

    // apply gravity
    this.force = vectorAdd(this.force, gravityVector);

    // calculate final velocity
    this.velocity = vectorMultiplyFloat(
      vectorDivideFloat(this.force, this.mass),
      deltaTime
    );

    let step = 0;
    let length = 1;
    let currentPos = this.position;
    const direction = normalizeVector(this.velocity);
    const bHit = false;

    while (!bHit && step < getVectorLength(this.velocity)) {
      const hitResult = ActorTraceByObjectType(
        this.world,
        this,
        currentPos,
        this.velocity,
        length,
        [this]
      );

      if (hitResult.hit) {
        bHit == true;
      } else {
        currentPos = vectorAdd(
          currentPos,
          vectorMultiplyFloat(direction, length)
        );

        this.position = currentPos;
      }

      step += length;
    }

    this.requestMoveXValue = 0;
    this.requestMoveYValue = 0;
    this.force = [0, 0];
    this.bHasRequestedMove = false;
  }
}
