import { normalizeVector, getCollisionRect, vectorAdd } from "./Math.js";

const profile_worldDynamic = {
  profile_worldDynamic: {
    block: true,
    overlap: false,
    ignore: false,
  },
};

function isPointInsideActor(point, Actor) {
  const collisionBox = getCollisionRect(Actor, Actor.position);

  const isPointRightOfLeftEdge = point[0] > collisionBox.x1;
  const isPointLeftOfRightEdge = point[0] < collisionBox.x2;
  const isPointBelowTopEdge = point[1] > collisionBox.y1;
  const isPointAboveBottomEdge = point[1] < collisionBox.y2;

  return (
    isPointRightOfLeftEdge &&
    isPointLeftOfRightEdge &&
    isPointBelowTopEdge &&
    isPointAboveBottomEdge
  );
}

const ActorTraceByObjectType = (
  world,
  Actor,
  location,
  direction,
  length,
  ignoredActors = [],
  objectTypes = []
) => {
  let step = 0.05;
  let hit = false;
  let hitActor = null;

  direction = normalizeVector(direction);

  while (!hit && step <= length) {
    const traceVector = [direction[0] * step, direction[1] * step];
    const traceLocation = [
      location[0] + traceVector[0],
      location[1] + traceVector[1],
    ];

    const actorBounds = getCollisionRect(Actor, traceLocation);

    world.physicsObjects.forEach((physicsObject) => {
      if (hit) {
        return;
      }

      if (ignoredActors.includes(physicsObject)) {
        return;
      }

      if (!objectTypes.length && objectTypes.includes(physicsObject)) {
        // naive will want to change this to look at collision profiles
        return;
      }

      const points = [
        [actorBounds.x1, actorBounds.y1],
        [actorBounds.x1, actorBounds.y2],
        [actorBounds.x2, actorBounds.y1],
        [actorBounds.x2, actorBounds.y2],
      ];

      for (let point of points) {
        if (isPointInsideActor(point, physicsObject)) {
          hit = true;
          hitActor = physicsObject;
        }
      }
    });

    step++;
  }

  return {
    hit,
    hitActor,
  };
};

const LineTraceByObjectType = (
  world,
  location,
  direction,
  length,
  ignoredActors = [],
  objectTypes = []
) => {
  let step = 1;
  let hit = false;
  let hitActor = null;

  direction = normalizeVector(direction);

  while (!hit && step <= length) {
    const traceVector = [direction[0] * step, direction[1] * step];
    const traceLocation = vectorAdd(location, traceVector);

    world.physicsObjects.forEach((physicsObject) => {
      if (hit) {
        return;
      }

      if (ignoredActors.includes(physicsObject)) {
        return;
      }

      if (!objectTypes.length && objectTypes.includes(physicsObject)) {
        // naive will want to change this to look at collision profiles
        return;
      }

      if (isPointInsideActor(traceLocation, physicsObject)) {
        hit = true;
        hitActor = physicsObject;
      }
    });

    step++;
  }

  return {
    hit,
    hitActor,
  };
};

export { LineTraceByObjectType, ActorTraceByObjectType };
