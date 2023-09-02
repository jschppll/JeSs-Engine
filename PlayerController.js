import GameObject from "./GameObject.js";

export default class PlayerController extends GameObject {
  constructor(world) {
    super(world);

    this.possessed = null;

    this.inputX = 0;
    this.inputY = 0;

    world.registerObject(this, "input");

    const keyDownHandler = (e) => {
      switch (e.key) {
        case "Right":
        case "ArrowRight":
          this.inputX = 1;
          break;

        case "Left":
        case "ArrowLeft":
          this.inputX = -1;
          break;

        case "Up":
        case "ArrowUp":
          this.inputY = -1;
          break;

        case "Down":
        case "ArrowDown":
          this.inputY = 1;
      }
    };

    const keyUpHandler = (e) => {
      switch (e.key) {
        case "Right":
        case "ArrowRight":
        case "Left":
        case "ArrowLeft":
          this.inputX = 0;
          break;

        case "Up":
        case "ArrowUp":
        case "Down":
        case "ArrowDown":
          this.inputY = 0;
      }
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }

  processInput() {
    if (this.possessed) {
      this.possessed.requestMoveX(this.inputX);
      this.possessed.requestMoveY(this.inputY);
    }
  }

  possess(gameObject) {
    this.possessed = gameObject;
    this.possessed.setTeam(1);
  }

  tickInput() {
    this.processInput();
  }
}
