import Konva from "konva";
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
  addPoint(point.x, point.y);
  // layer.batchDraw();
  console.log(lastLine);
});

channel.on("first_point", (payload) => {
  console.log("first point", payload);
  const { point, id } = payload;
  newLine(point);
  layer.add(lastLine);
  // layer.batchDraw();
  console.log(lastLine);
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

let isPaint = false;
let mode = "brush";
let lastLine;

stage.on("mousedown touchstart", (e) => {
  isPaint = true;
  const pos = stage.getPointerPosition();
  newLine(pos);
  channel.push("first_point", { x: pos.x, y: pos.y });
  layer.add(lastLine);
});

stage.on("mouseup touchend", () => {
  isPaint = false;
});

function newLine(initialPos) {
  lastLine = new Konva.Line({
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

function addPoint(x, y) {
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
  addPoint(pos.x, pos.y, true);
  channel.push("new_point", { point: { x: pos.x, y: pos.y }, id: "42" });
});
