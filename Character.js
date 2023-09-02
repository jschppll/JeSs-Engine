import Actor from "./Actor.js";

export default class Character extends Actor {
  constructor(world, canvas) {
    super(world, canvas);

    // default to friendly team
    this.team = 0;
    this.shouldTick = true;
  }

  setTeam(inTeam) {
    this.team = inTeam;
    this.color = this.getTeamColor();
  }

  getTeamColor() {
    if (this.team == 0) {
      return "gray";
    } else if (this.team == 1) {
      return "green";
    } else if (this.team == 2) {
      return "red";
    }
  }

  draw() {
    super.draw();
  }

  tickPhysics(deltaTime) {
    super.tickPhysics(deltaTime);
  }
}
