import GameObject from "./GameObject.js";
import { makeSphere, makeRect } from "./spriteHelper.js";
import { ActorTraceByObjectType } from "./Physics.js";

export default class Actor extends GameObject {
  constructor(world, canvas) {
    super(world);

    this.mass = 0;
    this.velocity = 0;
    this.force = 0;

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

    this.position = {
      x: canvas.width / 2,
      y: canvas.height - 30,
    };

    world.registerObject(this, "render");
    world.registerObject(this, "physics");
  }

  addVelocity() {
    this.velocity = inVelocity;
  }

  addForce() {
    this.force = inForce;
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

  translateX(direction) {
    this.position.x += direction;
  }

  translateY(direction) {
    this.position.y += direction;
  }

  draw() {
    if (this.shape == 0) {
      makeSphere(this.ctx, {
        x: this.position.x,
        y: this.position.y,
        radius: this.radius,
        color: this.color,
      });
    } else if (this.shape == 1) {
      makeRect(this.ctx, {
        x: this.position.x,
        y: this.position.y,
        width: this.width,
        height: this.height,
        color: this.color,
      });
    }
  }

  tickRender() {
    this.draw();
  }

  tickPhysics() {
    if (this.bHasRequestedMove) {
      const direction = {
        x: this.requestMoveXValue,
        y: this.requestMoveYValue,
      };

      const hitResult = ActorTraceByObjectType(
        this.world,
        this,
        this.position,
        direction,
        1,
        [this]
      );

      if (!hitResult.hit) {
        this.translateX(this.requestMoveXValue);
        this.translateY(this.requestMoveYValue);
      }

      this.requestMoveXValue = 0;
      this.requestMoveYValue = 0;
      this.bHasRequestedMove = false;
    }
  }
}
