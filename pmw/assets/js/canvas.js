import Konva from "konva";
import { v4 as uuidv4 } from "uuid";
import { Socket } from "phoenix";

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
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

channel.on("new_point", (payload) => {
  console.log("new point", payload);
  const { point, id } = payload;
  addPoint(point.x, point.y, id);
});

channel.on("first_point", (payload) => {
  console.log("first point", payload);
  const { point, id, color } = payload;
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
  const payload = { point, id, color: currentColor };
  channel.push("first_point", payload);
  layer.add(lines.get(id));
});

stage.on("mouseup touchend", () => {
  isPaint = false;
});

function newLine(initialPos, color) {
  return new Konva.Line({
    stroke: color,
    strokeWidth: 5,
    globalCompositeOperation:
      mode === "brush" ? "source-over" : "destination-out",
    // round cap for smoother lines
    lineCap: "round",
    lineJoin: "round",
    // add point twice, so we have some drawings even on a simple click
    points: [initialPos.x, initialPos.y, initialPos.x, initialPos.y],
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

  const pos = stage.getPointerPosition();
  addPoint(pos.x, pos.y, currentId);
  channel.push("new_point", { point: { x: pos.x, y: pos.y }, id: currentId });
});
