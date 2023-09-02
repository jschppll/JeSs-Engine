function getCollisionRect(Actor, location) {
  let x1;
  let x2;
  let y1;
  let y2;

  if (Actor.shape == 1) {
    x1 = location[0];
    x2 = location[0] + Actor.width;
    y1 = location[1];
    y2 = location[1] + Actor.height;
  }

  if (Actor.shape == 0) {
    x1 = location[0] - Actor.radius;
    y1 = location[1] - Actor.radius;
    x2 = location[0] + Actor.radius;
    y2 = location[1] + Actor.radius;
  }

  return {
    x1,
    x2,
    y1,
    y2,
  };
}

const isNearlyOne = (value) => value < 1.0001 && value > 0.9999;

function getVectorLength(v) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);

  return isNearlyOne(len) ? 1 : len;
}

function normalizeVector(v) {
  const length = getVectorLength(v);

  return [v[0] / length, v[1] / length];
}

const vectorAdd = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]];

const vectorDot = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1];

const vectorMultiplyFloat = (v, f) => [v[0] * f, v[1] * f];

const vectorDivideFloat = (v, f) => [v[0] / f, v[1] / f];

export {
  getVectorLength,
  normalizeVector,
  getCollisionRect,
  vectorAdd,
  vectorDot,
  vectorMultiplyFloat,
  vectorDivideFloat,
};
