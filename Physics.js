import { normalizeVector, getCollisionRect } from "./Math.js";

const profile_worldDynamic = {
  profile_worldDynamic: {
    block: true,
    overlap: false,
    ignore: false,
  },
};

function isPointInsideActor(point, Actor) {
  const collisionBox = getCollisionRect(Actor, Actor.position);

  const isPointRightOfLeftEdge = point.x > collisionBox.x1;
  const isPointLeftOfRightEdge = point.x < collisionBox.x2;
  const isPointBelowTopEdge = point.y > collisionBox.y1;
  const isPointAboveBottomEdge = point.y < collisionBox.y2;

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
  let step = 1;
  let hit = false;
  let hitActor = null;

  direction = normalizeVector(direction);

  while (!hit && step <= length) {
    const traceVector = {
      x: direction.x * step,
      y: direction.y * step,
    };

    const traceLocation = {
      x: location.x + traceVector.x,
      y: location.y + traceVector.y,
    };

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
        { x: actorBounds.x1, y: actorBounds.y1 },
        { x: actorBounds.x1, y: actorBounds.y2 },
        { x: actorBounds.x2, y: actorBounds.y1 },
        { x: actorBounds.x2, y: actorBounds.y2 },
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
    const traceVector = {
      x: direction.x * step,
      y: direction.y * step,
    };

    const traceLocation = {
      x: location.x + traceVector.x,
      y: location.y + traceVector.y,
    };

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
