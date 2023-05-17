import Konva from "konva";
import { v4 as uuidv4 } from 'uuid';
import { Socket } from "phoenix";

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
  const { point, id } = payload;
  lines.set(id, newLine(point));
  layer.add(lines.get(id));
});
// END SOCKET

const width = window.innerWidth;
const height = window.innerHeight - 25;

// first we need Konva core things: stage and layer
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

stage.on("mousedown touchstart", (e) => {
  isPaint = true;
  const pos = stage.getPointerPosition();
  const point = { x: pos.x, y: pos.y };
  const id = uuidv4();
  currentId = id;
  lines.set(id, newLine(point));
  const payload = { point, id };
  channel.push("first_point", payload);
  layer.add(lines.get(id));
});

stage.on("mouseup touchend", () => {
  isPaint = false;
});

function newLine(initialPos) {
  return new Konva.Line({
    stroke: "#df4b26",
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

// and core function - drawing
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
