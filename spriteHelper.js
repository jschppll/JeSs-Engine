const makeRect = (ctx, { x, y, width, height, color }) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

const makeSphere = (ctx, { x, y, radius, color }) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

export { makeRect, makeSphere };
