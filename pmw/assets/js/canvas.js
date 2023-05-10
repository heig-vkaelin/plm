//socket init
import { Socket } from "phoenix";

let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  currentLine = [];

let socket = new Socket("/socket", {
  params: {
    token: window.userToken,
  },
});

socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("canvas:lines", {});
channel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

channel.on("recv_lines", recvLines);

function sendLines(lines) {
  channel.push("new_lines", lines);
  console.log("sending", lines);
}
function renderLine(line) {
  if (line.length < 0) return;
  let first = line[0];
  ctx.moveTo(first.x, first.y);
  line.forEach((point) => {
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  });
}
function recvLines(payload) {
  let lines = payload.lines;
  console.log("receiving lines", lines);
  lines.forEach(renderLine);
}
//end of socket init

// setup
canvas.width = 1000;
canvas.height = 1000;
ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "rgba(0, 116, 217, 0.7)";
//ctx.strokeStyle = '#0074D9';

// start drawing line
function startLine(e) {
  console.log("start line");

  canvas.addEventListener("mousemove", drawLine, false);

  var point = pointForEvent(e);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  currentLine = [];
}

function endLine(e) {
  canvas.removeEventListener("mousemove", drawLine, false);
  sendLines([currentLine]);
}

// draws line to this x, y coordinate
function drawLine(e) {
  var point = pointForEvent(e);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  currentLine.push(point);
}

function pointForEvent(e) {
  return {
    x: e.pageX - canvas.offsetLeft,
    y: e.pageY - canvas.offsetTop,
  };
}

canvas.addEventListener("mousedown", startLine, false);
canvas.addEventListener("mouseup", endLine, false);
