module.exports = { draw };

function random(max = 100) {
  return Math.floor(Math.random() * max);
}

async function line(page) {
  await page.mouse.move(400 + random(), 400 + random());
  await page.mouse.down();
  await page.mouse.move(500 + random(), 500 + random());
  await page.mouse.up();
}

async function draw(page) {
  await page.goto("https://pmw.fly.dev/");

  // await page.locator("canvas").click({
  //   position: {
  //     x: 468 + random(),
  //     y: 272 + random(),
  //   },
  // });

  await line(page);

  await page.locator("#choose-color").click();
  const randomColor = random(16) + 1;
  await page.locator(`button.color:nth-child(${randomColor})`).click();

  await page.locator("canvas").click({
    position: {
      x: 590 + random(),
      y: 214 + random(),
    },
  });
  await page.locator("canvas").click({
    position: {
      x: 680 + random(),
      y: 241 + random(),
    },
  });
  await page.locator("canvas").dblclick({
    position: {
      x: 681 + random(),
      y: 241 + random(),
    },
  });
  await page.locator("canvas").dblclick({
    position: {
      x: 683 + random(),
      y: 274 + random(),
    },
  });
  await page.locator("canvas").click({
    position: {
      x: 713 + random(),
      y: 273 + random(),
    },
  });
  await page.locator("canvas").click({
    position: {
      x: 713 + random(),
      y: 246 + random(),
    },
  });
  await page.locator("canvas").click({
    position: {
      x: 697 + random(),
      y: 248 + random(),
    },
  });
}
