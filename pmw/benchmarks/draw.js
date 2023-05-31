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

async function pickColor(page) {
  await page.locator("#choose-color").click();
  const randomColor = random(16) + 1;
  await page.locator(`button.color:nth-child(${randomColor})`).click();
}

async function line(page) {
  const startX = randomX();
  const startY = randomY();

  const endX = randomX();
  const endY = randomY();

  await page.mouse.move(startX, startY);
  await page.mouse.down();

  // const POINTS_PER_LINE = 10;
  // for (let i = 0; i < POINTS_PER_LINE; i++) {
  //   await page.mouse.move(startX + random(10), startY + random(10));
  // }

  await page.mouse.move(endX, endY);
  await page.mouse.up();
}

async function draw(page) {
  await page.goto("https://pmw.fly.dev/");

  const dimensions = page.viewportSize();
  width = dimensions.width;
  height = dimensions.height;

  for (let i = 0; i < NB_LINES; i++) {
    await pickColor(page);
    await line(page);
  }

  // await page.locator("canvas").click({
  //   position: {
  //     x: 590 + random(),
  //     y: 214 + random(),
  //   },
  // });
  // await page.locator("canvas").click({
  //   position: {
  //     x: 680 + random(),
  //     y: 241 + random(),
  //   },
  // });
  // await page.locator("canvas").dblclick({
  //   position: {
  //     x: 681 + random(),
  //     y: 241 + random(),
  //   },
  // });
  // await page.locator("canvas").dblclick({
  //   position: {
  //     x: 683 + random(),
  //     y: 274 + random(),
  //   },
  // });
  // await page.locator("canvas").click({
  //   position: {
  //     x: 713 + random(),
  //     y: 273 + random(),
  //   },
  // });
  // await page.locator("canvas").click({
  //   position: {
  //     x: 713 + random(),
  //     y: 246 + random(),
  //   },
  // });
  // await page.locator("canvas").click({
  //   position: {
  //     x: 697 + random(),
  //     y: 248 + random(),
  //   },
  // });
}
