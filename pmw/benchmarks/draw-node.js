module.exports = { draw };

const NB_LINES = 20;
let width, height;

function random(max = 100) {
  return Math.floor(Math.random() * max);
}

function randomX() {
  return random(width);
}

function randomY() {
  return random(height);
}

async function line(page) {
  const startX = randomX();
  const startY = randomY();

  const endX = randomX();
  const endY = randomY();

  await page.mouse.move(startX, startY);
  await page.mouse.down();

  await page.mouse.move(endX, endY);
  await page.mouse.up();
}

async function draw(page) {
  await page.goto("https://pmw-node-front.fly.dev");

  const dimensions = page.viewportSize();
  width = dimensions.width;
  height = dimensions.height;

  for (let i = 0; i < NB_LINES; i++) {
    await line(page);
  }
}
