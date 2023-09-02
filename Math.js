function getCollisionRect(Actor, location) {
  let x1;
  let x2;
  let y1;
  let y2;

  if (Actor.shape == 1) {
    x1 = location.x;
    x2 = location.x + Actor.width;
    y1 = location.y;
    y2 = location.y + Actor.height;
  }

  if (Actor.shape == 0) {
    x1 = location.x - Actor.radius;
    y1 = location.y - Actor.radius;
    x2 = location.x + Actor.radius;
    y2 = location.y + Actor.radius;
  }

  return {
    x1,
    x2,
    y1,
    y2,
  };
}

const isNearlyOne = (value) => value > 0.9999;

function getVectorLength(v) {
  const len = Math.sqrt(v.x * v.x + v.y * v.y);

  return isNearlyOne(len) ? 1 : len;
}

function normalizeVector(v) {
  const length = getVectorLength(v);

  return {
    x: v.x / length,
    y: v.y / length,
  };
}

export { normalizeVector, getCollisionRect };
