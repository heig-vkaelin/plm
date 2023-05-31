import Konva from "../vendor/konva";
import { Socket } from "phoenix";

// UUID
function uuidv4() {
  const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

  return Date.now() + "-" + uuid;
}

// COLORS
const colorButton = document.querySelector("#choose-color");
const colorStroke = document.querySelector("#color-stroke");
const colorsContainer = document.querySelector("#colors");
const colors = document.querySelectorAll(".color");

colorButton.addEventListener("click", () => {
  colorsContainer.classList.toggle("hidden");
});

colors.forEach((color) => {
  color.addEventListener("click", () => {
    currentColor = color.dataset.color;
    colorStroke.style.stroke = currentColor;
    colorsContainer.classList.add("hidden");
  });
});

// SOCKET
const socket = new Socket("/socket", {
  params: {
    token: window.userToken,
  },
});

socket.connect();

const channel = socket.channel("canvas:points", {});
channel
  .join()
  .receive("ok", (state) => {
    console.log(`Joined successfully with ${Object.keys(state).length} lines`);

    for (const [id, points] of Object.entries(state)) {
      if (id.endsWith("-color")) continue;
      const color = state[`${id}-color`];
      lines.set(id, newLine(points, color));
      layer.add(lines.get(id));
    }
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

channel.on("new_point", (payload) => {
  console.log("new point", payload);
  const { x, y, id } = payload;
  addPoint(x, y, id);
});

channel.on("first_point", (payload) => {
  console.log("first point", payload);
  const { x, y, id, color } = payload;
  const point = { x, y };
  lines.set(id, newLine(point, color));
  layer.add(lines.get(id));
});

// KONVA
const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

const lines = new Map();
let isPaint = false;
let mode = "brush";
let currentId;
let currentColor = "#FFFFFF";

stage.on("mousedown touchstart", (e) => {
  isPaint = true;
  const pos = stage.getPointerPosition();
  const point = { x: pos.x, y: pos.y };
  const id = uuidv4();
  currentId = id;
  lines.set(id, newLine(point, currentColor));
  const payload = { x: pos.x, y: pos.y, id, color: currentColor };
  channel.push("first_point", payload);
  layer.add(lines.get(id));
});

stage.on("mouseup touchend", () => {
  isPaint = false;
});

function newLine(points, color) {
  const positions =
    points.length && points.length > 1
      ? points
      : [points.x, points.y, points.x, points.y];
  return new Konva.Line({
    stroke: color,
    strokeWidth: 5,
    globalCompositeOperation:
      mode === "brush" ? "source-over" : "destination-out",
    // round cap for smoother lines
    lineCap: "round",
    lineJoin: "round",
    points: positions,
  });
}

function addPoint(x, y, id) {
  const lastLine = lines.get(id);
  const newPoints = lastLine.points().concat([x, y]);
  lastLine.points(newPoints);
}

stage.on("mousemove touchmove", (e) => {
  if (!isPaint) {
    return;
  }

  // prevent scrolling on touch devices
  e.evt.preventDefault();

  const { x, y } = stage.getPointerPosition();
  addPoint(x, y, currentId);
  channel.push("new_point", { x, y, id: currentId });
});
