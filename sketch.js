var capture;
var canvas;

function setup() {
  setupEmojis();
  w = 800;
  h = 600;
  canvas = createCanvas(w, h);
  canvas.parent('canvasCont');
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  document.getElementById('camera').onclick = function() { save(); };
}

function draw() {
  background(255);

  pixelSize = parseInt(document.getElementById("pixelSize").value);
  w = Math.floor(capture.width/pixelSize) * pixelSize;
  h = Math.floor(capture.height/pixelSize) * pixelSize;
  canvas.size(w, h);
  document.getElementById('wrapper').style.width = w + "px";

  drawEmojis(capture, pixelSize, 0, 0);
}

